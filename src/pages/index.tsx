import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { Box, Heading, Link, Stack, Text, Flex, Button } from "@chakra-ui/core";
import NextLink from "next/link";
import { useState } from "react";

const Index = () => {
	const [variables, setVariables] = useState({
		limit: 33,
		cursor: null as null | string,
	});

	const [{ data, fetching }] = usePostsQuery({
		variables,
	});

	// Not loading & Got no data in return
	if (!fetching && !data) {
		return <div>Query Failed !</div>
	}

	return (
		<Layout variant="regular">
			<Flex align="center">
				<Heading color={"red"}>rs-reddit</Heading>
				<NextLink href="/create-post">
					<Link ml="auto">
						<Button size="lg" variantColor="green" mt="24px">
							Create
						</Button>
					</Link>
				</NextLink>
			</Flex>

			<br />
			<br />
			
			{!data && fetching ? (<div>Loading... Please wait...</div>) : (
			
			<Stack spacing={8}>
				{ data!.posts.posts.map((p) => (
				<Box key={p.id} p={5} shadow="md" borderWidth="1px">
					<Heading fontSize="xl">{p.title}</Heading>
					<Text mt={4}>{p.textSnippet}</Text>
				</Box>
			))}
			</Stack>
			)}
			
			{ data && data.posts.hasMore ? (
			<Flex>
				<Button onClick={() => {
					setVariables({
						limit: variables.limit,
						cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
					})
				}} isLoading={fetching} m="auto" mt="10" mb="10" variantColor={"purple"}>
					Load more
				</Button>
			</Flex> 
			) : null }
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);