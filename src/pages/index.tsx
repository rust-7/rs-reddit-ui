import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { Button, Icon, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import React from "react";

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <Layout>

      <NextLink href="/create-post">
        <Link color="blue.500">
        <Button variantColor="green">
          Create <Icon name="external-link" mx="2px" />
        </Button>
        </Link>
      </NextLink>

      <h1>RUST_REDDIT</h1>
      
      <br />

      { !data ? 
        (<div>Loading...</div>) : 
        ( data.posts.map((p) => <div key={p.id}>{p.title}</div>) )
      }
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);