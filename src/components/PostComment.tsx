import React, { ReactElement } from "react";
import { Comment } from "../API";
import { Grid, Paper, Typography } from "@mui/material";
import formatDatePosted from "../lib/formatDatePosted";

interface Props {
  comment: Comment;
}

const PostComment = ({ comment }: Props): ReactElement => {
  console.log("comment", comment);
  return (
    <Paper
      style={{ width: "100%", minHeight: 128, marginTop: 16, padding: 16 }}
      elevation={1}
    >
      <Grid container spacing={1} direction="column">
        <Grid item>
          <Typography variant="body1">
            <b>{comment.owner}</b> - {formatDatePosted(comment.createdAt)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">{comment.content}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PostComment;

// TODO: Continue from 3:34:48
