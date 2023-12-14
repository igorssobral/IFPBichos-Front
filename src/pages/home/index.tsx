import React from "react";
import "./styles.css";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SearchIcon from "@mui/icons-material/Search";
import SelectSmall from "../../components/ui/selectFilter";
import { Box, Container, Grid, ListItem } from "@mui/material";
import { Card } from "../../components/ui/card";
import ButtonAppBar from "../../components/layout/appBar";
import CustomTextField from "../../components/ui/customTextField";
export const Home = () => {
  return (
    <>
      <ButtonAppBar title="Campanhas" visible visibleMenu={false} />

      <Grid className="filters">
        <Grid xs>
          <ListItem>
            {" "}
            Filtros:
            <SelectSmall />
          </ListItem>
        </Grid>
        <Grid xs>
          <ListItem>
            <FormControlLabel
              value="end"
              control={<Radio />}
              label="Próximo da meta"
            />
          </ListItem>
        </Grid>

        <Grid xs>
          <ListItem>
            <FormControlLabel
              value="start"
              control={<DeleteForeverIcon color="disabled" />}
              label="Limpar Filtros"
            />
          </ListItem>
        </Grid>
        <Grid xs>
          <ListItem>
            <CustomTextField
              label=" "
              title=""
              value={""}
              onChange={() => {}}
              inputLabelProps={false}
              id="title"
              type={"text"}
              width="200px"
              height="35px"

              // value={""}
            />
            <SearchIcon fontSize="large" color="disabled" />
          </ListItem>
        </Grid>
      </Grid>

      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          style={{
            display: "grid",
            gap: "50px",
            gridTemplateColumns: "repeat(3,1fr)",
          }}
        >
          <Card> </Card>
          <Card> </Card>
          <Card> </Card>
          <Card> </Card>
          <Card> </Card>
          <Card> </Card>
        </Box>
      </Container>
    </>
  );
};
