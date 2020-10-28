import React from 'react'
import { Formik, Form,  } from 'formik'
import { Box, Button } from '@chakra-ui/core';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from "next/router";

const Login: React.FC<{}> = ({}) => {
    const router = useRouter();
    const [,login] = useLoginMutation();
    
    return (
        <Wrapper variant='small'>
            <Formik initialValues={{ username: "", password: "" }} 
                
                onSubmit={async (values, { setErrors }) => { 
                    const response = await login({ options: values });
                    if (response.data?.login.errors) {
                        setErrors(toErrorMap(response.data.login.errors))
                    } else if (response.data?.login.user) {
                        // All OK!
                        router.push("/");
                    }
                }}>

                {({ isSubmitting }) => (
                    <Form>
                        <InputField name='username' placeholder='Enter username' label='Username'></InputField>
                        <Box mt={4}>
                            <InputField name='password' placeholder="Enter password" label='Password' type="password"></InputField>
                        </Box>
                        <Button type="submit" isLoading={isSubmitting} mt={6} size="md" variantColor="blue" variant="solid">Login</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default Login;