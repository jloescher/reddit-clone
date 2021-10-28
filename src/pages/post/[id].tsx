import React, { ReactElement } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { Grid } from "@mui/material";
import { API, withSSRContext } from "aws-amplify";
import { ListPostsQuery, GetPostQuery, Post } from "../../API";
import { listPosts, getPost } from "../../graphql/queries";

interface Props {
  post: Post;
}

const IndividualPost = ({ post }: Props): ReactElement => {
  console.log("Got post:", post);
  return <Grid container></Grid>;
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
