import { Box, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useCreatePostMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";

const CreatePost: React.FC<{}> = ({}) => {
    const router = useRouter();
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
                        <Button type="submit" variantColor="green" isLoading={isSubmitting} mt={6} size="md" variant="solid">Create</Button>
                    </Form>
                )}
            </Formik>
        </Layout>
    );
}

export default withUrqlClient(createUrqlClient)(CreatePost);