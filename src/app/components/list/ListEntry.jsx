const ListEntry = ({ firstName, lastName, subjects, phoneNumber }) => {
  return (
    <div className=" bg-red-400">
      <p>
        {firstName}, {lastName}, {phoneNumber}
      </p>
    </div>
  );
};

export default ListEntry;
