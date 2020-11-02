import { Box, Button, Icon } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreatePostMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

const CreatePost: React.FC<{}> = ({}) => {
    const router = useRouter();
    useIsAuth();
    const [,createPost] = useCreatePostMutation();
    
    return (
        <Layout variant="small">
            <Formik initialValues={{ title: "", text: "" }}

                onSubmit={async (values) => {
                    const { error } = await createPost({ input: values })

                    if (!error) {
                        router.push("/");    
                    }
                }}>

                {({ isSubmitting }) => (
                    <Form>
                        <InputField name="title" placeholder="Enter Title" label="Title" />
                        <Box mt={6}><InputField textarea name="text" placeholder="Enter Your Post..." label="Text" /> 
                        </Box>
                        <Button type="submit" variantColor="green" isLoading={isSubmitting} mt={6} size="md" variant="solid">
                            Create <Icon name="small-add" />
                        </Button>
                    </Form>
                )}
            </Formik>
        </Layout>
    );
}

export default withUrqlClient(createUrqlClient)(CreatePost);