import React from 'react'
import { Formik, Form,  } from 'formik'
import { Box, Button } from '@chakra-ui/core';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from "next/router";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
    const router = useRouter();
    const [,register] = useRegisterMutation();
    
    return (
        <Wrapper variant='small'>
            <Formik initialValues={{ username: "", password: "" }} 
                
                onSubmit={async (values, { setErrors }) => { 
                    const response = await register(values);
                    
                    if (response.data?.register.errors) {
                        setErrors(toErrorMap(response.data.register.errors))
                    } else if (response.data?.register.user) {
                        // All Ok
                        router.push("/");
                    }
                }}>

                {({ isSubmitting }) => (
                    <Form>
                        <InputField name='username' placeholder='Enter username' label='Username'></InputField>
                        <Box mt={4}>
                            <InputField name='password' placeholder="Enter password" label='Password' type="password"></InputField>
                        </Box>
                        <Button type="submit" isLoading={isSubmitting} mt={6} size="md" variantColor="green" variant="solid">Register</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default Register;