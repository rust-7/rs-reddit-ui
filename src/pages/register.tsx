import React from 'react'
import { Formik, Form,  } from 'formik'
import { Box, Button } from '@chakra-ui/core';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
    return (
        <Wrapper variant='small'>
            <Formik initialValues={{ username: '', password: '' }} onSubmit={values => { console.log(values) ;}}>
                {({ isSubmitting }) => (
                    <Form>
                        <InputField name='username' placeholder='Enter username' label='Username'></InputField>
                        
                        <Box mt={4}>
                            <InputField name='password' placeholder="Enter password" label='Password' type="password"></InputField>
                        </Box>

                        <Button type="submit" isLoading={isSubmitting} mt={4} size="md" variantColor="green" variant="solid">Register</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default Register;