import { database } from "../config/db.js";

export const handlePost = async (req, res) => {
  try {
    const { user, postCode, primary } = req.body;
    console.log("User:", user);
    const collection = database.collection("posts");

    let updateQuery;

    if (primary === true) {
      updateQuery = { $set: { primarySub: user, isFilled: true } };
    } else {
      updateQuery = {
        $push: { secondarySubs: user },
        $set: { isFilled: true },
      };
    }

    const result = await collection.updateOne({ code: postCode }, updateQuery);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Ilmoittautuminen epäonnistui" });
    }

    res.status(200).json({ message: "Ilmoittautuminen vahvistettu" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPosts = async (req, res) => {
  console.log("Getting posts...");
  try {
    const { code } = req.query;

    const collection = database.collection("posts");
    let query = {};

    if (code) {
      query = { code: code };
      console.log(query);
    }

    const result = await collection.find(query).toArray();

    if (result.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error retrieving posts:", error);
    res.status(500).json({ error: "An error occurred while retrieving posts" });
  }
};

export const checkPrimary = async (req, res) => {
  const { postCode, email } = req.query;
  const collection = database.collection("posts");

  const result = await collection.findOne({ code: postCode });

  if (result && result.primarySub.email === email) {
    return res.status(200).json({ isPrimary: true });
  }

  res.status(200).json({ isPrimary: false });
};

export const editPost = async (req, res) => {
  try {
    const postsCollection = database.collection("posts");
    const subsCollection = database.collection("substitutes");
    const { action, email, code } = req.body;

    if (action === "cancelPrimary") {
      const post = await postsCollection.findOne({ code: code });

      if (post && post.primarySub && post.primarySub.email === email) {
        await postsCollection.updateOne(
          { code: code },
          { $set: { primarySub: "", isFilled: false } },
        );

        await subsCollection.updateOne(
          { email: email },
          { $pull: { posts: code } },
        );

        res.status(200).json({ message: "Ilmoitus peruttu onnistuneesti" });
      } else {
        res.status(404).json({ message: "Virhe ilmoittautumisen perumisessa" });
      }
    } else if (action === "cancelSecondary") {
      const post = await postsCollection.findOne({ code: code });

      if (
        post &&
        post.secondarySubs &&
        post.secondarySubs.some((sub) => sub.email === email)
      ) {
        await postsCollection.updateOne(
          { code: code },
          { $pull: { secondarySubs: { email: email } } },
        );

        await subsCollection.updateOne(
          { email: email },
          { $pull: { posts: code } },
        );

        res.status(200).json({ message: "Varasija peruttu onnistuneesti" });
      } else {
        res.status(404).json({ message: "Virhe varasijan perumisessa" });
      }
    } else {
      res.status(400).json({ message: "Virheellinen toiminto" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

export const addPost = async (req, res) => {
  try {
    const { date, subject, postCode } = req.body;
    const collection = database.collection("posts");

    const newPost = {
      date: date,
      subject,
      isFilled: false,
      primarySub: "",
      secondarySubs: [],
      code: postCode,
    };

    const result = await collection.insertOne(newPost);
    if (!result.acknowledged) {
      return res
        .status(404)
        .json({ message: "Virhe ilmoituksen lisäämisessä" });
    }
    res.status(200).json({ message: "Ilmoitus luotu onnistuneesti" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Virhe ilmoituksen lisäämisessä" });
  }
};
