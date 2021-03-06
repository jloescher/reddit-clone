import React, { ReactElement } from "react";
import { Post } from "../API";
import {
  Box,
  ButtonBase,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
} from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/router";
import { router } from "next/client";
import dateToTimePassed from "../lib/formatDatePosted";
import truncateWords from "../lib/truncatedWords";

interface Props {
  post: Post;
}

const PostPreview = ({ post }: Props): ReactElement => {
  const router = useRouter();
  return (
    <Paper elevation={3}>
      <Grid
        container
        direction="row"
        justifyItems="flex-start"
        alignItems="flex-start"
        wrap="nowrap"
        style={{ padding: 12, marginTop: 16 }}
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
        <ButtonBase
          onClick={() => router.push(`/post/${post.id}`)}
          style={{
            justifyContent: "flex-start",
            justifyItems: "flex-start",
            alignContent: "flex-start",
            alignItems: "flex-start",
            textAlign: "left",
          }}
        >
          <Grid item>
            <Grid item>
              <Typography variant="body1">
                Posted by: <b>{post.owner}</b>{" "}
                {dateToTimePassed(post.createdAt)}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h2">{post.title}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                {truncateWords(post.contents, 15)}
              </Typography>{" "}
              {/* TODO: Identify a way to truncate the contents */}
              {/* TODO: Video timestamp 2:53:44 */}
            </Grid>
            {/* {post.image && (*/}
            <Grid item>
              <Image
                src={`https://source.unsplash.com/random`}
                width={512}
                height={512}
                layout="intrinsic"
              />
            </Grid>
            {/* )}*/}
          </Grid>
        </ButtonBase>
      </Grid>
    </Paper>
  );
};

export default PostPreview;
