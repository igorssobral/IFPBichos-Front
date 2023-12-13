import React from "react";
import "./styles.css";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SearchIcon from "@mui/icons-material/Search";

import SelectSmall from "../../components/ui/selectFilter";
import { TextField } from "@mui/material";

export const Home = () => {
  return (
    <>
    <div className="container">

      <div className="filters">
        <p>Filtros:<SelectSmall />
        <FormControlLabel
          value="end"
          control={<Radio />}
          label="Próximo da meta"
        /></p>
        

        <div style={{ display: "flex" }}>
          <p>Limpar Filtros</p>
          <DeleteForeverIcon color="disabled" />
        </div>

      </div>

      <div className="search-bar">
        <TextField
          id="title"
          label=" "
          variant="outlined"
          InputLabelProps={{ shrink: false }}
          size="small"
          type={"email"}
          // value={""}
          InputProps={{
            style: {
              width: "250px",
              height: "35px",
              borderRadius: "15px",
            },
          }}
        />
        <SearchIcon fontSize="large" />
      </div>
    </div>

    <section className="content-campaign">


    </section>

    </>
  );
};
