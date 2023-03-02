import { redirect, useNavigate, useParams } from "react-router-dom";
import { Field, Formik, useFormik } from "formik";
import {
  Box,
  Button,
  Center,
  CircularProgress,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useMutation, useQuery } from "react-query";
import {
  createStaff,
  deleteStaff,
  getStaffById,
  listStaff,
  updateStaff,
} from "@/service/staff-rest";
import { CheckIcon, WarningIcon } from "@chakra-ui/icons";
import * as Yup from "yup";
import { Staff } from "@/entities/staff/staff";

export default function EditStaff() {
  const { id } = useParams();
  const staffUpdate = useMutation((values: Staff) => {
    return updateStaff(values);
  });
  // const [staffs, setStaffs] = React.useState<Staff>();
  const navigate = useNavigate();
  const initialValues: Staff = { first_name: "", last_name: "", email: "" };

  const validationSchema = Yup.object({
    first_name: Yup.string()
      .required("This field is required.")
      .min(2, "Too Short!"),
    last_name: Yup.string()
      .required("This field is required.")
      .min(2, "Too Short!"),
    email: Yup.string()
      .email("Invalid email")
      .required("This field is required."),
  });

  const toast = useToast();
  // const showToast = () => {
  //   toast({
  //     title: "Update",
  //     description: "Successfully Update staff",
  //     duration: 5000,
  //     isClosable: true,
  //     status: "success",
  //     position: "top",
  //     icon: <CheckIcon />,
  //   });
  // };

  const { data, isLoading, isError } = useQuery(["staff", id], () =>
    getStaffById(id)
  );

  if (isLoading) {
    return (
      <Center h="100px">
        <CircularProgress isIndeterminate color="green.300" />
      </Center>
    );
  }

  if (isError) {
    return (
      <Center h="100px">
        <Text>400 Page Not Found</Text>
      </Center>
    );
  }

  return (
    <Box maxW="480px">
      <Formik
        initialValues={data ? data : initialValues}
        onSubmit={(values) => {
          staffUpdate.mutate(
            {
              id: id,
              first_name: values.first_name,
              last_name: values.last_name,
              email: values.email,
            },
            {
              onSuccess: () => {
                toast({
                  title: "Main",
                  description: "Successfully Main staff",
                  duration: 5000,
                  isClosable: true,
                  status: "success",
                  position: "top",
                  icon: <CheckIcon />,
                });
                setTimeout(() => {
                  navigate(`/staff`);
                }, 500);
              },
              onError: (response) => {
                console.log(response);
                toast({
                  title: "Error",
                  description: "An error occurred",
                  duration: 5000,
                  isClosable: true,
                  status: "error",
                  position: "top",
                  icon: <WarningIcon />,
                });
              },
            }
          );

          // alert(JSON.stringify(values,null,2));
          // showToast();
          // setTimeout(() => {
          //   navigate(`/staff`);
          // }, 500);
        }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="flex-start">
              <FormControl
                isInvalid={!!errors.first_name && touched.first_name}
              >
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Field
                  as={Input}
                  id="first_name"
                  name="first_name"
                  type="text"
                />
                <FormErrorMessage>{errors.first_name}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.last_name && touched.last_name}>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Field as={Input} id="last_name" name="last_name" type="text" />
                <FormErrorMessage>{errors.last_name}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.email && touched.email}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Field as={Input} id="email" name="email" type="email" />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="yellow" w="full">
                Update
              </Button>
            </VStack>
          </form>
        )}
      </Formik>
    </Box>
  );
}
