import React from "react";
import { Link, useParams } from "react-router-dom";

import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import Header from "../../components/Header";
import News from "../../components/News";
import UserList from "../../components/UserList";
import DiscoverList from "../../components/DiscoverList";

import { useAuth } from "../../context/authContext";
import { useLists } from "../../context/listsContext";
import { useUsers } from "../../context/usersContext";

import { icons } from "../../constants";

import useStyles from "./styles";

const Lists = () => {
  const classes = useStyles();
  const { username } = useParams();

  const { userData } = useAuth();
  const { lists } = useLists();
  const { users } = useUsers();

  const iconsArray = [
    {
      name: icons.PlaylistAddOutlinedIcon,
      path: `/${username}/lists/create`,
    },
    { name: icons.MoreHorizIcon },
  ];

  // Recherche des listes non suivies
  // eslint-disable-next-line array-callback-return
  const unfollowedLists = lists?.filter((list) => {
    if (!userData?.[0]?.lists?.includes(list.id)) return list;
  });

  // Recherche des listes de l'utilisateur qui matchent avec les listes
  // eslint-disable-next-line array-callback-return
  const matchedLists = lists?.filter((list) => {
    if (userData?.[0]?.lists?.includes(list.id)) return list;
  });

  return (
    <Box display="flex">
      <Box
        borderLeft="1px solid #eff3f4"
        borderRight="1px solid #eff3f4"
        maxWidth="590px"
      >
        <Header
          title="Lists"
          subtitle={`@${userData?.[0]?.username}`}
          iconsRight={iconsArray}
          iconsLeft={icons.ArrowBackIcon}
        />
        <Box borderBottom="1px solid #eff3f4">
          <Typography
            fontSize="font.large"
            fontWeight="titleBold"
            p="12px 1rem"
          >
            Pinned Lists
          </Typography>
          <Box display="flex" flexWrap="wrap">
            {userData?.[0]?.pinned_lists?.length !== 0 ? (
              userData?.[0]?.pinned_lists?.map((pinned_list) => {
                const matchedList = lists?.filter((list) => {
                  return list?.id === pinned_list;
                });
                return (
                  <Box
                    key={pinned_list}
                    p="1rem"
                    component={Link}
                    to={`/lists/${pinned_list}`}
                    sx={{
                      textDecoration: "none!important",
                      color: "black.main",
                    }}
                  >
                    <Box>
                      <img
                        src={matchedList?.[0]?.cover_url}
                        alt=""
                        className={classes.pinned_list__avatar}
                        width="100px"
                        height="100px"
                      />
                      <Typography
                        fontSize="font.small"
                        className={classes.pinned_list__name}
                      >
                        {matchedList?.[0]?.name}
                      </Typography>
                    </Box>
                  </Box>
                );
              })
            ) : (
              <Typography fontSize="font.main" color="grey.main" p="2rem">
                Nothing to see here yet — pin your favorite Lists to access them
                quickly.
              </Typography>
            )}
          </Box>
        </Box>
        <Box borderBottom="1px solid #eff3f4">
          <Typography
            fontSize="font.large"
            fontWeight="titleBold"
            p="12px 1rem"
          >
            Discover new Lists
          </Typography>
          {unfollowedLists?.slice(0, 3)?.map((list) => {
            const author = users?.filter(
              (user) => user?.id === list?.author_id
            );
            return <DiscoverList key={list?.id} list={list} author={author} />;
          })}
        </Box>
        <Box>
          <Typography
            fontSize="font.large"
            fontWeight="titleBold"
            p="12px 1rem"
          >
            Your Lists
          </Typography>
          {matchedLists?.map((list) => {
            const author = users?.filter(
              (user) => user?.id === list?.author_id
            );
            return <UserList key={list?.id} list={list} author={author} />;
          })}
        </Box>
      </Box>
      <Box>
        <News />
      </Box>
    </Box>
  );
};

export default Lists;
