import type { NextPage } from "next";
import { Container, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useUser } from "../context/AuthContext";
import { listPosts } from "../graphql/queries";
import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { ListPostsQuery, Post } from "../API";
import PostPreview from "../components/PostPreview";
import Header from "../components/Header";

const Home: NextPage = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPostsFromApi = async (): Promise<Post[]> => {
      const allPosts = (await API.graphql({ query: listPosts })) as {
        data: ListPostsQuery;
        errors: any[];
      };
      if (allPosts.data) {
        setPosts(allPosts.data.listPosts?.items as Post[]);
        return allPosts.data.listPosts?.items as Post[];
      } else {
        throw new Error("Could not get posts");
      }
    };
    fetchPostsFromApi();
  }, []);

  console.log("User:", user);
  console.log("Posts:", posts);

  return (
    <Container maxWidth="md">
      <Header />
      {posts.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </Container>
  );
};

export default Home;

// TODO: Continue video at 1:53:29
