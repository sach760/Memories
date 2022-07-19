import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

import Post from "./Post/Post.js";
import useStyles from "./styles";

const Posts = ({ currentId, setCurrentId }) => {
  console.log("posts");

  const posts = useSelector((state) => state.posts);
  console.log({ posts });
  const classes = useStyles();
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => {
        return (
          <Grid key={post.id} item sx={12} sm={6}>
            <Post
              post={post}
              currentId={currentId}
              setCurrentId={setCurrentId}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
export default Posts;
