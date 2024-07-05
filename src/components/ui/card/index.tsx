import "./styles.css";

import { Box, Grid } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import { CampaignRaw } from "../../../services/@types/campaign";
import { Card } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Navigate } from "react-router-dom";
import React from "react";
import { Typography } from "@mui/material";
import { getLocalStorage } from "../../../utils/local-storage";
import { styled } from "@mui/material/styles";

type CardProps = {
  campaign: CampaignRaw;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
};

export const CardModal: React.FC<CardProps> = ({
  campaign,
  onEdit,
  onDelete,
  onView,
}) => {
  const handleEditClick = () => {
    onEdit(campaign.id);
  };
  const handleDeleteClick = () => {
    onDelete(campaign.id);
  };
  const handleViewCampaign = () => {
    onView(campaign.id);
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
      {getLocalStorage()?.userRole == "ADMIN" ? (
        <Box className="icons" paddingX={1}>
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

      <Box className="image" onClick={handleViewCampaign}>
      {campaign?.animal === 'GATO' ? (
             <img
             src={campaign.image || "src/assets/gato.jpg"}
             alt={campaign.title}
           />
            ) : (
              <img
              src={campaign.image || "src/assets/dog.jpg"}
              alt={campaign.title}
            />
            )} 
      </Box>

      <Box className="infor_content" display={"flex"} justifyContent={"center"}>
        <Typography
          variant="h4"
          width={"95%"}
          maxHeight={65}
          whiteSpace={"nowrap"}
          overflow={"clip"}
          textAlign={"center"}
          textOverflow={"ellipsis"}
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
            <Grid width={"70%"}>
              <Box>
                <BorderLinearProgress
                  variant="determinate"
                  value={campaign.collectionPercentage}
                />
              </Box>
            </Grid>
            <Grid>
              <Typography
                marginLeft={1}
                variant="h3"
                fontSize={"1.1rem"}
                fontWeight={"bold"}
                fontFamily={"Lato, sans-serif"}
              >
                {`${campaign.collectionPercentage}%`}
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
