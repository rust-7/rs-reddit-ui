import { Box, Button } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { toErrorMap } from '../../utils/toErrorMap';

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
    const router = useRouter();
    const [,changePassword] = useChangePasswordMutation();
    const [tokenError, setTokenError] = useState('');
    
    return (
        <Wrapper variant='small'>
            <Formik initialValues={{ newPassword: '' }} 
                
                onSubmit={async (values, { setErrors }) => { 
                    const response = await changePassword({ newPassword: values.newPassword, token });
                    
                    if (response.data?.changePassword.errors) {
                        const errorMap = toErrorMap(response.data.changePassword.errors)

                        if ('token' in errorMap) {
                            setTokenError(errorMap.token);
                        } 
                        setErrors(errorMap);

                    } else if (response.data?.changePassword.user) {
                        // All OK! => Redirection 
                        router.push("/");
                    }
                }}>

                {({ isSubmitting }) => (
                    <Form>
                        <InputField name='newPassword' placeholder='Enter Your New Password' label='New Password' type='password'></InputField>
                        
                        {tokenError ? <Box color='red'>{tokenError}</Box> : null }
                        
                        <Button type="submit" isLoading={isSubmitting} mt={6} size="md" variantColor="green" variant="solid">Reset Password</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>

    );
}

ChangePassword.getInitialProps = ({ query }) => {
    return {
        token: query.token as string,
    };
};

export default withUrqlClient(createUrqlClient)(ChangePassword);