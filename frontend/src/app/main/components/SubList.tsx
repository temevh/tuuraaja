import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "firstName", headerName: "Etunimi", width: 150, editable: false },
  { field: "lastName", headerName: "Sukunimi", width: 150, editable: false },
  {
    field: "phoneNumber",
    headerName: "Puhelinnumero",
    width: 150,
    editable: false,
  },
  {
    field: "email",
    headerName: "Sähköposti",
    width: 300,
    editable: false,
  },
];

const SubList = ({
  substitutes,
  selectedSubstitutes,
  setSelectedSubstitutes,
}) => {
  const rows = substitutes.map((sub) => ({
    id: sub.email,
    ...sub,
  }));

  return (
    <div className="h-[400px] w-full">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setSelectedSubstitutes(newRowSelectionModel);
        }}
        rowSelectionModel={selectedSubstitutes as any}
        keepNonExistentRowsSelected
      />
    </div>
  );
};

export default SubList;
