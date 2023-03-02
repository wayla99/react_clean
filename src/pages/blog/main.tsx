import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { EditIcon, ViewIcon } from "@chakra-ui/icons";

type Props = {};

export default function BlogPage({}: Props) {
  // const boxStyles ={
  //     p:"10px",
  //     bg:"purple.400",
  //     color:"white",
  //     m:"10px",
  //     textAlign:"center",
  //     filter: 'blur(2px)',
  //     ':hover':{
  //         color:'black',
  //         bg:'blue.200'
  //     }
  // }

  const data: any = useLoaderData();
  return (
    <SimpleGrid spacing={10} minChildWidth="300px">
      {data?.map(
        (item: {
          id?: number;
          title?: string;
          description?: string;
          author?: string;
          img?: string;
        }) => (
          <Card key={item.id} borderTop="8px" borderColor="blue.400" bg="white">
            <CardHeader>
              <Flex gap={5}>
                <Avatar src={item.img} />
                <Box>
                  <Heading as="h3" size="sm">
                    {item.title}
                  </Heading>
                  <Text>by {item.author}</Text>
                </Box>
              </Flex>
            </CardHeader>

            <CardBody color="gray.500">
              <Text>{item.description}</Text>
            </CardBody>

            <Divider borderColor="gray.200" />

            <CardFooter>
              <HStack>
                <Button variant="ghost" leftIcon={<ViewIcon />}>
                  Watch
                </Button>
                <Button variant="ghost" leftIcon={<EditIcon />}>
                  Comment
                </Button>
              </HStack>
            </CardFooter>
          </Card>
        )
      )}
    </SimpleGrid>
    // <Container as="section" maxW="4xl" py="20px">
    //     <Heading my="30px" p="10px">Staff Page</Heading>
    //     <Text ml="30px">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, laudantium?</Text>
    //     <Text ml="30px" color="blue.300" fontWeight="bold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, laudantium?</Text>
    //
    //     <Box my="30px" p="20px" bg="orange">
    //         <Text color="white">This is a box</Text>
    //     </Box>
    //
    //     <Box sx={boxStyles}>
    //         Hello, Wayla!
    //     </Box>
    // </Container>
  );
}

export const tasksLoader = async () => {
  const res = await fetch("http://localhost:3000/tasks");
  return res.json();
};
