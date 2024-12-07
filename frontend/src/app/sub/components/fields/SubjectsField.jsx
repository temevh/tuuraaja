import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SubjectsField = ({
  subjectList,
  selectedSubjects,
  updateSelectedSubjects,
}) => {
  return (
    <FormControl sx={{ width: 300 }}>
      <InputLabel>Aineet</InputLabel>
      <Select
        multiple
        value={selectedSubjects}
        onChange={updateSelectedSubjects}
        renderValue={(selected) => (
          <Box>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {subjectList.map((subject) => (
          <MenuItem key={subject} value={subject}>
            {subject}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SubjectsField;
