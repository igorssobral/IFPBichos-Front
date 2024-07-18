import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type SelectProps = {
  handleFilter: (value: string) => void;
  selectedValue: string;
};

export default function SelectSmall({
  handleFilter,
  selectedValue,
}: SelectProps) {
  const [filter, setFilter] = useState<string>('TODOS');

  useEffect(() => {
    setFilter(selectedValue);
  }, [selectedValue]);

  const handleChange = (event: SelectChangeEvent) => {
    const selected = event.target.value as string;
    setFilter(selected);
    handleFilter(selected);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
      <Select value={filter} onChange={handleChange} sx={{ height: 35 }}>
        <MenuItem value={'TODOS'}>Todos</MenuItem>
        <MenuItem value={'GATO'}>Gato</MenuItem>
        <MenuItem value={'CACHORRO'}>Cachorro</MenuItem>
      </Select>
    </FormControl>
  );
}
