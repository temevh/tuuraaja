import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import EmailIcon from "@mui/icons-material/Email";
import IconButton from "@mui/material/IconButton";

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
  {
    field: "sendEmail",
    headerName: "",
    width: 100,
    editable: false,
    renderCell: (params) => (
      <IconButton
        onClick={() => {
          sendEmail(params.row.email);
        }}
      >
        <EmailIcon sx={{ color: "black" }} />
      </IconButton>
    ),
  },
];

const sendEmail = (person) => {
  console.log("email to", person);
};

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
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{
          "& .MuiDataGrid-cell": {
            color: "white",
          },
          "& .MuiDataGrid-checkboxInput .Mui-checked": {
            color: "green",
          },
          "& .MuiDataGrid-checkboxInput .MuiSvgIcon-root": {
            color: "black",
          },
        }}
      />
    </Box>
  );
};

export default SubList;
