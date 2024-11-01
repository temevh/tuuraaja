const ListEntry = ({ firstName, lastName, subjects }) => {
  return (
    <div className=" bg-red-400">
      <p>
        {firstName}, {lastName} - {subjects}
      </p>
    </div>
  );
};

export default ListEntry;
