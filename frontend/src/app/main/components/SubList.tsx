import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { Mail, MessageSquare } from "lucide-react";
import { sendEmail } from "../../utils/functions";

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

        }}
      >
        <Mail color="black" />
      </IconButton>
    ),
  },
  {
    field: "sendSms",
    headerName: "",
    width: 100,
    editable: false,
    renderCell: (params) => (
      <IconButton
        onClick={() => {

        }}
      >
        <MessageSquare color="black" />
      </IconButton>
    ),
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
