const LevelCheckboxes = () => {
  return (
    <div className="flex flex-row gap-4 items-center justify-center">
      <div className="flex flex-row gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" />
          <p className="text-lg text-black">Lukio</p>
        </label>
      </div>
      <div className="flex flex-row gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="ylakoulu" />
          <p className="text-lg text-black pr-2">Yläkoulu</p>
        </label>
      </div>
    </div>
  );
};

export default LevelCheckboxes;
