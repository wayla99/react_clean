import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import { UnlockIcon } from "@chakra-ui/icons";

export default function Navbar() {
  const toast = useToast();

  const showToast = () => {
    toast({
      title: "Logged out",
      description: "Successfully logged out",
      duration: 5000,
      isClosable: true,
      status: "success",
      position: "top",
      icon: <UnlockIcon />,
    });
  };

  return (
    <Flex as="nav" p="10px" mb="40px" alignItems="center">
      <Heading as="h1">Staff Tasks</Heading>
      <Spacer />

      <HStack spacing="20px">
        {/*<Box bg="gray.200" p="10px">M</Box>*/}
        <Avatar src="/img/admin.jpg">
          <AvatarBadge width="1.3em" bg="teal.500">
            <Text fontSize="xs" color="white">
              3
            </Text>
          </AvatarBadge>
        </Avatar>
        <Text>admin@wayla.dev</Text>
        <Button colorScheme="brand" onClick={showToast}>
          Logout
        </Button>
      </HStack>
    </Flex>
    // <Flex bg="gray.200" justify="space-between" flexWrap="wrap" gap="2">
    //     <Box w="150px" h="50px" bg="red">1</Box>
    //     <Box w="150px" h="50px" bg="blue">1</Box>
    //     <Box w="150px" h="50px" flexGrow="1" bg="green">1</Box>
    //     <Box w="150px" h="50px" flexGrow="2" bg="yellow">1</Box>
    // </Flex>
  );
}
