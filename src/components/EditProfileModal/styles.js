import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  modal: {
    backgroundColor: "background.paper",
  },
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "400px",
    transform: "translate(-50%, -50%)",
    backgroundColor: theme.palette.white.main,
    minWidth: "600px",
    maxWidth: "80vw",
    minHeight: "400px",
    maxHeight: "90vh",
    borderRadius: "16px",
    overflowY: "scroll",
  },
  button: {
    textTransform: "none!important",
  },
  cover: {
    objectFit: "cover",
  },
  avatar__container: {
    position: "relative",
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
    objectPosition: "center",
    transform: "scale(1.6)",
    backgroundColor: theme.palette.white.main,
    border: `2px solid ${theme.palette.white.main}`,
    opacity: 0.75,
  },
  image: {
    position: "absolute",
    backgroundColor: theme.palette.black.main,
    color: theme.palette.white.main,
    borderRadius: "50%",
    cursor: "pointer",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) scale(0.8)",
    padding: "0.5rem",
  },
  field: {
    padding: "12px 1rem!important",
  },
  link_pro: {
    "&:hover": {
      backgroundColor: theme.palette.grey.background__trend,
    },
  },
}));
