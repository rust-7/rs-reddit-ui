import React, { useState } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Wrapper } from "../components/Wrapper";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button } from "@chakra-ui/core";
import { useForgotPasswordMutation } from "../generated/graphql";

const ForgotPassword: React.FC<{}> = ({ }) => {

	const [complete, setComplete] = useState(false);
	const [, forgotPassword] = useForgotPasswordMutation();

	return (
		<Wrapper variant="small">
			<Formik
				initialValues={{ email: "" }}
				onSubmit={async (values) => {
					await forgotPassword(values);
					setComplete(true);
				}}>

				{({ isSubmitting }) =>
					complete ? (
						<Box>
							<Alert status="success" variant="subtle" flexDirection="column" justifyContent="center" textAlign="center" height="200px">
								<AlertIcon size="40px" mr={0} />

								<AlertTitle mt={4} mb={1} fontSize="lg">
									Thank you !
					</AlertTitle>

								<AlertDescription maxWidth="sm">
									If we find your account with that email exists, we'll send you an email.
					</AlertDescription>
							</Alert>
						</Box>
					) : (
							<Form>
								<InputField name="email" placeholder="Enter Your Email" label="Email" type="email" />
								<Button mt={4} type="submit" isLoading={isSubmitting} variantColor="purple">
									Send Link &rarr;
              </Button>
							</Form>
						)
				}
			</Formik>
		</Wrapper>
	);
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);