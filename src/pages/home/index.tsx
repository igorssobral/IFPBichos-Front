import React from "react";
import "./styles.css";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SearchIcon from "@mui/icons-material/Search";
import { Navbar } from "../../components/layout/navbar";
import SelectSmall from "../../components/ui/selectFilter";
import { TextField } from "@mui/material";
import { Card } from "../../components/ui/card";
import { format } from "path";

export const Home = () => {
  return (
    <>
    <Navbar title="" visible={true} visibleMenu={false}/>
    <div className="filters">
          <div>
            Filtros:<SelectSmall />
            <FormControlLabel
              value="end"
              control={<Radio />}
              label="Próximo da meta"
            />
          </div>
          

          <div className="bin_content">
            <p>Limpar Filtros</p>
            <DeleteForeverIcon color="disabled" />
          </div>
        

        <div className="search_bar">
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
                width: "200px",
                height: "35px",
                borderRadius: "15px",
              },
            }}
          />
          <SearchIcon fontSize="large" color="disabled" />
        </div>
        </div>

      <div className="container-home">
        <section className="content_campaign">

         <Card> 
        </Card>
         <Card> 
        </Card>
         <Card> 
        </Card>
         <Card> 
        </Card>
         <Card> 
        </Card>
         <Card> 
        </Card>
        
        
      </section>
      </div>

      
    </>
  );
};
