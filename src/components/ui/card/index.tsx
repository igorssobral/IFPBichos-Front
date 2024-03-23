import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Box, Grid } from "@mui/material";
import "./styles.css";
import { styled } from "@mui/material/styles";
import { CampaignRaw } from "../../../services/@types/campaign";
import { Card } from "@mui/material";
import { Typography } from "@mui/material";
import { getLocalStorage } from "../../../utils/local-storage";

type CardProps = {
  campaign: CampaignRaw;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export const CardModal: React.FC<CardProps> = ({
  campaign,
  onEdit,
  onDelete,
}) => {
  const user = getLocalStorage();

  const handleEditClick = () => {
    onEdit(campaign.id);
  };
  const handleDeleteClick = () => {
    onDelete(campaign.id);
  };

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 15,
    borderRadius: 15,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 300 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 15,
      backgroundColor: theme.palette.mode === "light" ? "#24CA68" : "#308fe8",
    },
  }));

  return (
    <Card
    
      style={{
        width: "300px",
        height: "420px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "15px",
        backgroundColor: "rgb(255, 255, 255)",
      }}
      
    >
      {user !== null && user.roles == "ADMIN" ? (
        <Box className="icons"  paddingX={1}>
          <EditIcon
            style={{ cursor: "pointer" }}
            color="success"
            onClick={handleEditClick}
          />
          <DeleteForeverIcon
            style={{ cursor: "pointer" }}
            color="error"
            onClick={handleDeleteClick}
          />{" "}
        </Box>
      ) : (
        " "
      )}

      <Box className="image">
        <img
          src={campaign.image || "src/assets/dog.jpg"}
          alt={campaign.title}
        />
      </Box>

      <Box className="infor_content" display={"flex"} justifyContent={"center"}>
        <Typography
          variant="h4"
          width={"90%"}
          textAlign={"center"}
          fontSize={"1.6rem"}
          fontFamily={"Lato, sans-serif"}
        >
          {campaign.title}
        </Typography>

        <Box marginTop={3} width={"89%"}>
          <Typography
            variant="h6"
            fontSize={"1.1rem"}
            fontWeight={"300"}
            fontFamily={"Lato, sans-serif"}
          >
            Meta: R${campaign.collectionGoal.toFixed(2)}
          </Typography>
          <Grid container display={"flex"} alignItems={"center"}>
            <Grid xs={10}>
              <Box>
                <BorderLinearProgress variant="determinate" value={(campaign.balance / campaign.collectionGoal) * 100} />
              </Box>
            </Grid>
            <Grid xs>
              <Typography
                marginLeft={"5px"}
                variant="h3"
                fontSize={"1.1rem"}
               
                fontFamily={"Lato, sans-serif"}
              >
                {`${(campaign.balance / campaign.collectionGoal) * 100}%`}
              </Typography>
            </Grid>
          </Grid>

          <Typography
            variant="h6"
            fontSize={".9rem"}
            fontWeight={"300"}
            fontFamily={"Lato, sans-serif"}
          >
            Arrecadado R${campaign.balance.toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
