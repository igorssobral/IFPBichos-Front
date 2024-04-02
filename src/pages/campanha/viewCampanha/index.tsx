import {
  Box,
  Grid,
  IconButton,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import React, { useEffect, useRef, useState } from "react";
import { formatInputDate, formatUTC } from "../../../utils/format-date";
import {
  handleShare,
  handleShareSocial,
} from "../../../components/ui/button/share-button";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../../../components/ui/button";
import ButtonAppBar from "../../../components/layout/appBar";
import ButtonUi from "@mui/material/Button";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Title } from "../../../components/ui/tittle";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { formatValue } from "../../../utils/format-money";
import img from "../../../assets/dog.jpg";

interface Campaign {
  title: string;
  collectionGoal: number;
  balance: number;
  description: string;
  start: string;
  end: string;
  image: File | null;
}

const ViewCampanha = () => {
  const { obj } = useParams<{ obj?: string }>();
  const [campaign, setCampaign] = useState<Campaign | null>();
  const [sharedLink, setSharedLink] = useState<string>("");

  const handleClick = async () => {
    handleShare((sharedUrl: string) => {
      setSharedLink(sharedUrl);
    });
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopy = async () => {
    try {
      if (inputRef.current) {
        await navigator.clipboard.writeText(sharedLink);
        console.log("Link copiado para a área de transferência");
      }
    } catch (error) {
      console.error("Erro ao copiar o link:", error);
    }
  };

  const navigate = useNavigate();
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

  function handleBack() {
    navigate("/campanhas");
  }

  useEffect(() => {
    handleClick();
    if (obj && !campaign) {
      const decodedObj = decodeURIComponent(obj);

      try {
        const parsedObj: Campaign = JSON.parse(decodedObj);

        setCampaign({
          title: parsedObj.title,
          description: parsedObj.description,
          collectionGoal: parsedObj.collectionGoal,
          balance: parsedObj.balance,
          start: formatUTC(new Date(formatInputDate(parsedObj.start))),
          end: formatUTC(new Date(formatInputDate(parsedObj.end))),
          image: parsedObj.image,
        });
      } catch (error) {}
    }
  }, [obj, campaign]);

  return (
    <>
      <ButtonAppBar title="Campanha" visible />
      <Grid display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Title label={campaign?.title || ""} />

        <Grid
          width={2 / 3}
          display={"flex"}
          marginTop={5}
          gap={8}
          justifyContent={"center"}
        >
          <Box width={"500px"} borderRadius={"20px"} overflow={"hidden"}>
            <img src={img} alt="" />
          </Box>

          <Box
            width={"300px"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Grid container display={"flex"} justifyContent={"center"} gap={2}>
              <Box width={"100%"}>
                <Typography
                  marginLeft={1}
                  variant="h3"
                  fontSize={"1.1rem"}
                  fontWeight={"600"}
                  fontFamily={"Lato, sans-serif"}
                  textAlign={"center"}
                >
                  {campaign
                    ? `${
                        (campaign?.balance / campaign?.collectionGoal) * 100
                      }%  /  ${formatValue(Number(campaign?.balance))}`
                    : 0}
                </Typography>

                <BorderLinearProgress
                  variant="determinate"
                  value={
                    campaign
                      ? (campaign.balance / campaign.collectionGoal) * 100
                      : 0
                  }
                />
              </Box>

              <Box display={"flex"} flexDirection={"column"}>
                <Typography
                  variant="h6"
                  fontSize={"1.1rem"}
                  fontWeight={"300"}
                  fontFamily={"Lato, sans-serif"}
                  textAlign={"center"}
                >
                  META
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight={"1000"}
                  textAlign={"center"}
                  color={"#24CA68"}
                >
                  {formatValue(Number(campaign?.collectionGoal))}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="h6"
                  fontWeight={"300"}
                  fontFamily={"Lato, sans-serif"}
                  textAlign={"center"}
                >
                  TERMINA
                  <Typography variant="h5" fontWeight={"bold"}>
                    {campaign?.end}
                  </Typography>
                </Typography>
              </Box>
              <Box width={"100%"} display={"flex"} flexDirection={"column"}>
                <Button label="Realizar Doação" headlight />
                <Button label="voltar" onClick={handleBack} />
              </Box>
            </Grid>
          </Box>
        </Grid>

        <Grid width={"45%"} marginTop={5}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"start"}
          >
            <Typography fontWeight={"400"}>
              Compartilhe essa campanha
            </Typography>
            <Box display={"flex"} alignItems={"center"}>
              <TextField
                ref={inputRef}
                onChange={(e) => setSharedLink(e.target.value)}
                disabled
                fullWidth
                sx={{ width: "500px" }}
                value={sharedLink}
              />
              <ButtonUi
                onClick={handleCopy}
                sx={{
                  height: "55px",
                  backgroundColor: "gray",
                  color: "white",
                  borderRadius: "0px 7px 7px 0px",
                }}
              >
                Copiar
              </ButtonUi>
              <Box marginLeft={10}>
                <IconButton onClick={handleShareSocial}>
                  <FacebookIcon fontSize="large" color="action" />
                </IconButton>
                <IconButton onClick={handleShareSocial}>
                  <InstagramIcon fontSize="large" color="action" />
                </IconButton>

                <IconButton onClick={handleShareSocial}>
                  <WhatsAppIcon fontSize="large" color="action" />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ViewCampanha;
