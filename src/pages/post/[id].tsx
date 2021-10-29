import React, { ReactElement } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { Container, Grid } from "@mui/material";
import { API, withSSRContext } from "aws-amplify";
import { ListPostsQuery, GetPostQuery, Post } from "../../API";
import { listPosts, getPost } from "../../graphql/queries";
import PostPage from "../../components/PostPage";
import PostComment from "../../components/PostComment";

interface Props {
  post: PostPage;
}

const IndividualPost = ({ post }: Props): ReactElement => {
  console.log("Got post:", post);
  return (
    <Container maxWidth="md">
      <PostPage post={post} />
      {post.comments.items.map((comment) => (
        <PostComment key={comment.id} comment={comment} />
      ))}
    </Container>
  );
};

const getStaticProps: GetStaticProps = async ({ params }) => {
  const SSR = withSSRContext();
  const postsQuery = (await SSR.API.graphql({
    query: getPost,
    variables: {
      id: params.id,
    },
  })) as { data: GetPostQuery };

  return { props: { post: postsQuery.data.getPost } };
};

const getStaticPaths: GetStaticPaths = async (): Promise<{
  paths: { params: { id: string | undefined } }[] | undefined;
  fallback: string;
}> => {
  const SSR = withSSRContext();
  const response = (await SSR.API.graphql({ query: listPosts })) as {
    data: ListPostsQuery;
    errors: any[];
  };
  const paths = response.data.listPosts?.items?.map((post) => ({
    params: { id: post?.id },
  }));

  return { paths, fallback: "blocking" };
};

export default IndividualPost;
export { getStaticPaths, getStaticProps };

// TODO: Continue 3:18:57
