import React, { ReactElement } from "react";
import { Post } from "../API";
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
} from "@mui/icons-material";

interface Props {
  post: Post;
}

const PostPreview = ({ post }: Props): ReactElement => {
  const dateToTimePassed = (date: string): string => {
    // TODO: Improve function to return time passed in hours, minutes, and seconds
    const now = new Date(Date.now());
    const postDate = new Date(date);

    const diff = now.getTime() - postDate.getTime();

    return (diff / 1000 / 60 / 60).toFixed(0);
  };
  return (
    <Paper elevation={3}>
      <Grid
        container
        direction="row"
        justifyItems="flex-start"
        alignItems="flex-start"
        style={{ width: "100vw", padding: 12, marginTop: 16 }}
      >
        <Grid
          container
          item
          direction="column"
          spacing={1}
          alignItems="center"
          alignContent="center"
          style={{ maxWidth: 64 }}
        >
          <Grid item>
            <IconButton color="primary">
              <ArrowUpwardOutlined />
            </IconButton>
          </Grid>
          <Grid item>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="body2">
                {(post.upvotes + post.downvotes).toString()}
              </Typography>
              <Typography variant="body1">votes</Typography>
            </Box>
          </Grid>
          <Grid item>
            <IconButton color="primary">
              <ArrowDownwardOutlined />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item>
          <Grid item>
            <Typography variant="body1">
              Posted by: <b>{post.owner}</b> {dateToTimePassed(post.createdAt)}{" "}
              hours ago.
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h2">{post.title}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">{post.contents}</Typography>{" "}
            {/* TODO: Identify a way to truncate the contents */}
            {/* TODO: Video timestamp 2:53:44 */}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PostPreview;
