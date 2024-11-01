const ListEntry = ({ firstName, lastName, subjects, phoneNumber }) => {
  return (
    <div className=" bg-red-400 w-1/2 h-12 rounded-lg mt-2 flex items-center justify-center">
      <p className="text-black text-xl text-center">
        {firstName}, {lastName}, {phoneNumber}
      </p>
    </div>
  );
};

export default ListEntry;
