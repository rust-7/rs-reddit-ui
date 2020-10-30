import React from 'react'
import { Formik, Form, } from 'formik'
import { Box, Button, Flex, Link } from '@chakra-ui/core';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from "next/router";
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from "next/link";

const Login: React.FC<{}> = ({ }) => {
    const router = useRouter();
    const [, login] = useLoginMutation();

    return (
        <Wrapper variant='small'>
            <Formik initialValues={{ usernameOrEmail: "", password: "" }}

                onSubmit={async (values, { setErrors }) => {
                    const response = await login(values);
                    if (response.data?.login.errors) {
                        setErrors(toErrorMap(response.data.login.errors))
                    } else if (response.data?.login.user) {
                        // All OK!
                        router.push("/");
                    }
                }}>

                {({ isSubmitting }) => (
                    <Form>
                        <InputField name='usernameOrEmail' placeholder='Enter Username or Email' label='Username or Email'></InputField>
                        <Box mt={6}>
                            <InputField name='password' placeholder="Enter Password" label='Password' type="password"></InputField>
                        </Box>

                        <Flex>
                            <NextLink href="/forgot-password">
                                <Link ml="auto" mt="2" color="blue.400" >Forgot Password ?</Link>
                            </NextLink>
                        </Flex>

                        <Button type="submit" rightIcon="arrow-forward" variantColor="purple" isLoading={isSubmitting} mt={6} size="md" variant="solid">Login</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default withUrqlClient(createUrqlClient)(Login);