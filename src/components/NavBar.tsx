import React from 'react'
import { Box, Button, Flex, Link } from '@chakra-ui/core';
import NextLink from "next/link";
import { useMeQuery } from '../generated/graphql';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({ }) => {
    
    const [{ data, fetching }] = useMeQuery()
    let body = null

    // Loading...
    if (fetching) {
        // Not logged in
    } else if (!data?.me) {
        // Logged in

        body = (
            <>
                <NextLink href="/login">
                    <Link mr={4} color='white' fontSize="xl">Login</Link>
                </NextLink>

                <NextLink href="/register">
                    <Link mr={4} color='white' fontSize="xl">Register</Link>
                </NextLink>
            </>
        )
    } else {
        body = (
            <Flex>
                <Box color='white' mr="3" fontSize="xl">{data.me.username}</Box>
                <Button variant="link" color="blue.400">Logout</Button>
            </Flex>
        )
    }
    
    return (
        <Flex bg="cyan.900" p={5} ml={'auto'}>
            <Box ml={"auto"}>
                {body}
            </Box>
        </Flex>
    );
}