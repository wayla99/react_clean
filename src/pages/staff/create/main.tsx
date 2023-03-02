import {
  Box,
  Button,
  Center,
  Checkbox,
  CircularProgress,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Form, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import React, { useState } from "react";
import { createStaff } from "@/service/staff-rest";
import { Staff } from "@/entities/staff/staff";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { CheckIcon, WarningIcon } from "@chakra-ui/icons";

export default function StaffCreate() {
  // const [firstName,setFirstName] = useState('');
  // const [lastName,setLastName] = useState('');
  // const [email,setEmail] = useState('');
  const [message, setMessage] = useState("");
  // const [staffs, setStaffs] = React.useState<Staff>();

  // const {data,isLoading,isError,error,mutate}=useMutation(createStaff,{retry:3,onSuccess:(data)=>{setMessage(data);}},)
  const mutation = useMutation(createStaff);
  const navigate = useNavigate();

  const toast = useToast();
  // const showToastSuccess = () => {
  //   toast({
  //     title: "Main",
  //     description: "Successfully Main staff",
  //     duration: 5000,
  //     isClosable: true,
  //     status: "success",
  //     position: "top",
  //     icon: <CheckIcon />,
  //   });
  // };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("This field is required.")
      .min(2, "Too Short!"),
    lastName: Yup.string()
      .required("This field is required.")
      .min(2, "Too Short!"),
    email: Yup.string()
      .email("Invalid email")
      .required("This field is required."),
  });

  return (
    <Box maxW="480px">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
        }}
        onSubmit={(values) => {
          mutation.mutate(
            {
              id: "1",
              first_name: values.firstName,
              last_name: values.lastName,
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
          // mutation.mutate({
          //   id: "1",
          //   first_name: values.firstName,
          //   last_name: values.lastName,
          //   email: values.email,
          // });
          // showToast();
          // setTimeout(() => {
          //   navigate(`/staff`);
          // }, 500);
          // alert(JSON.stringify(error.message, null, 2));
        }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="flex-start">
              <FormControl isInvalid={!!errors.firstName && touched.firstName}>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Field as={Input} id="firstName" name="firstName" type="text" />
                <FormErrorMessage>{errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.lastName && touched.lastName}>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Field as={Input} id="lastName" name="lastName" type="text" />
                <FormErrorMessage>{errors.lastName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.email && touched.email}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Field as={Input} id="email" name="email" type="email" />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="green" w="full">
                Create
              </Button>
            </VStack>
          </form>
        )}
      </Formik>

      {/*<Form>*/}
      {/*    <FormControl isRequired>*/}
      {/*        <FormLabel>FirstName:</FormLabel>*/}
      {/*        <Input type="text" name="firstName" value={firstName} onChange={e=>setFirstName(e.target.value)} />*/}
      {/*        <FormHelperText>Enter a descriptive firstname.</FormHelperText>*/}
      {/*    </FormControl>*/}
      {/*    <FormControl isRequired>*/}
      {/*        <FormLabel>LastName:</FormLabel>*/}
      {/*        <Input type="text" name="lastName" value={lastName} onChange={e=>setLastName(e.target.value)}/>*/}
      {/*        <FormHelperText>Enter a descriptive lastname.</FormHelperText>*/}
      {/*    </FormControl>*/}
      {/*    <FormControl isRequired>*/}
      {/*        <FormLabel>Email:</FormLabel>*/}
      {/*        <Input type="text" name="email" value={email} onChange={e=>setEmail(e.target.value)}/>*/}
      {/*        <FormHelperText>Enter a descriptive email.</FormHelperText>*/}
      {/*    </FormControl>*/}
      {/*    <Button onClick={()=>{*/}
      {/*        setStaffs({id:"1", first_name:firstName, last_name:lastName, email:email})*/}
      {/*        console.log({message})*/}
      {/*        mutate({id:"1", first_name:firstName, last_name:lastName, email:email})*/}
      {/*    }}>Main</Button>*/}
      {/*    <Text>Main a new Staff ID:{message}</Text>*/}
      {/*    <Box color="gray" bg="red.400">*/}
      {/*        <Text>{isLoading? "Saving...":""}</Text>*/}
      {/*        <Text>{isError?"Error":""}</Text>*/}
      {/*    </Box>*/}
      {/*</Form>*/}
    </Box>
  );
}
