import React, {useState} from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";



export default function SelectSmall() {
  const [filter, setFilter] = useState("Todos");

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Filtro</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={filter}
        label="Todos"
        onChange={handleChange}
      >
        <MenuItem value="Todos">Todos</MenuItem>
        <MenuItem value={10}>Felino</MenuItem>
        <MenuItem value={20}>Cachorro</MenuItem>
        <MenuItem value={30}>Ave</MenuItem>
      </Select>
    </FormControl>
  );
}
