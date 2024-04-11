import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function SelectSmall() {
  const [filter, setFilter] = useState<string>("Todos");

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <Select
        value={filter}
        
        onChange={handleChange}
      >
        <MenuItem value={"Todos"}>Todos</MenuItem>
        <MenuItem value={1}>Gato</MenuItem>
        <MenuItem value={2}>Cachorro</MenuItem>
      </Select>
    </FormControl>
  );
}
