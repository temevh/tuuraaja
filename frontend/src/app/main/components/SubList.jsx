import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "firstName", headerName: "Etunimi", width: 100, editable: false },
  { field: "lastName", headerName: "Sukunimi", width: 120, editable: false },
  {
    field: "phoneNumber",
    headerName: "Puhelinnumero",
    width: 150,
    editable: false,
  },
  {
    field: "email",
    headerName: "Sähköposti",
    width: 200,
    editable: false,
  },
];

const SubList = ({ substitutes }) => {
  const rows = substitutes.map((substitute, index) => ({
    id: substitute._id,
    firstName: substitute.firstName,
    lastName: substitute.lastName,
    phoneNumber: substitute.phoneNumber,
    email: substitute.email,
    subjects: substitute.subjects,
  }));

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default SubList;