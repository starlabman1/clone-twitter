import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// Composants MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, Tab, Tabs } from "@mui/material";

// Icones et images
import { icons } from "../../constants";

// Styles
import useStyles from "./styles";

// Contexts
import { useAuth } from "../../context/authContext";
import { useLists } from "../../context/listsContext";
import { useUsers } from "../../context/usersContext";

import ListMembers from "../ListMembersModal/ListMembers";

// Liens pour la Nav Tab
function LinkTab(props) {
  return <Tab component={Link} {...props} />;
}

const ListMembersModal = () => {
  const { id } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();

  //Utilisation des contextes
  const { userData } = useAuth();
  const { lists } = useLists();
  const { users } = useUsers();

  // State pour la nav tab
  const [value, setValue] = useState(0);
  // Fonction de la nav tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // States pour la modale
  const [, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const matchedList = lists?.filter((list) => {
    return list.id === id;
  });

  // Fonction pour ajouter un membre
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const usersMembers = users?.filter((user) => {
    return matchedList?.[0]?.members?.includes(user.id);
  });

  return (
    <>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ padding: 0 }}
      >
        <form onSubmit={handleSubmit}>
          <Box className={classes.modal}>
            <Box className={classes.container}>
              {/* Header */}
              <Box display="flex" alignItems="center" height="53px" p="0 1rem">
                <Box justifyContent="flex-start">
                  <IconButton
                    onClick={() => navigate(`/${userData?.[0]?.username}`)}
                    sx={{ padding: "0.5rem", marginRight: "1rem" }}
                  >
                    <icons.CloseIcon />
                  </IconButton>
                </Box>
                <Box flexGrow={1}>
                  <Typography fontSize="font.large" fontWeight="mainBold">
                    Add to your List
                  </Typography>
                </Box>
                <Box>
                  <Button
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    sx={{
                      fontSize: "font.small",
                      fontWeight: "mainBold",
                      backgroundColor: "black.main",
                      borderRadius: "50px",
                    }}
                    onClick={() =>
                      navigate(`/${userData?.[0]?.username}/lists`)
                    }
                  >
                    Done
                  </Button>
                </Box>
              </Box>
              {/* NavTab */}
              <Box
                display="flex"
                justifyContent="center"
                width="100%"
                fontSize="font.main"
                textTransform="none"
                borderBottom="1px solid #eff3f4"
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="nav tabs"
                >
                  <LinkTab
                    className={classes.notifications__link_nav}
                    to={`/lists/${id}/members`}
                    label="Members"
                  />
                  <LinkTab
                    className={classes.notifications__link_nav}
                    to={`/lists/${id}/members/suggested`}
                    label="Suggested"
                  />
                </Tabs>
              </Box>
              <Box>
                {matchedList?.[0]?.members.length === 0 ? (
                  <Box maxWidth="400px" m="2rem auto" p="0 2rem">
                    <Typography fontSize="32px" fontWeight="mainBold">
                      There isn’t anyone in this List
                    </Typography>
                    <Typography fontSize="font.main" color="grey.main">
                      When people get added, they’ll show up here.
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    {usersMembers?.map((user) => {
                      return (
                        <ListMembers
                          key={user?.id}
                          member={user}
                          matchedList={matchedList}
                        />
                      );
                    })}
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </form>
      </Modal>
    </>
  );
};

export default ListMembersModal;
