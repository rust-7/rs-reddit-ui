import React from 'react'
import { Box, Button, Flex, Link } from '@chakra-ui/core';
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{ fetching: logoutFetching } ,logout] = useLogoutMutation();
    const [{ data, fetching }] = useMeQuery({
        pause: isServer(),
    })
    let body = null

    // Loading State
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
                <Button onClick={() => { logout(); }} isLoading={logoutFetching} variant="link" color="red.400">logout &rarr;</Button>
            </Flex>
        )
    }
    
    return (
        <Flex zIndex={1} bg="black" position="sticky" top={0} p={5} ml={'auto'}>
            <Box ml={"auto"}>
                {body}
            </Box>
        </Flex>
    );
}