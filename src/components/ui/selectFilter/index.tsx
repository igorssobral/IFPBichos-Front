import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type SelectProps = {
  handleFilter: (value: string) => void;
};
export default function SelectSmall({ handleFilter }: SelectProps) {
  const [filter, setFilter] = useState<string>("TODOS");

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
    handleFilter(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <Select value={filter} onChange={handleChange}>
        <MenuItem value={"TODOS"}>Todos</MenuItem>
        <MenuItem value={"GATO"}>Gato</MenuItem>
        <MenuItem value={"CACHORRO"}>Cachorro</MenuItem>
      </Select>
    </FormControl>
  );
}
