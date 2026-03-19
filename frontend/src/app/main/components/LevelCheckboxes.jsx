const LevelCheckboxes = ({ setLukioCheck, setYlakouluCheck }) => {
  return (
    <div className="flex flex-row gap-4 ml-10 justify-center">
      <div className="flex flex-row gap-4">
        <label className="flex items-center gap-2" onChange={setLukioCheck}>
          <input type="checkbox" className="accent-zinc-900" />
          <p className="text-md font-medium text-zinc-900">Lukio</p>
        </label>
      </div>
      <div className="flex flex-row gap-4">
        <label className="flex items-center gap-2" onChange={setYlakouluCheck}>
          <input type="checkbox" name="ylakoulu" className="accent-zinc-900" />
          <p className="text-md font-medium text-zinc-900 pr-2">Yläkoulu</p>
        </label>
      </div>
    </div>
  );
};

export default LevelCheckboxes;
