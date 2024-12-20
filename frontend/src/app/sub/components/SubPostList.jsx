const SubPostList = ({ subPosts }) => {
  return (
    <div>
      {subPosts ? (
        subPosts.map((post) => {
          return <p key={post.id}>{post.date}</p>;
        })
      ) : (
        <p>No sub posts</p>
      )}
    </div>
  );
};

export default SubPostList;
