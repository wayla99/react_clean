import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  CircularProgress,
  Heading,
  HStack,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import { Staff } from "@/entities/staff/staff";
import { createStaff, deleteStaff, listStaff } from "@/service/staff-rest";
import { useNavigate } from "react-router-dom";
import { createColumn, Table } from "react-chakra-pagination";

export default function StaffPage() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const staffUpdate = (id: string | undefined) => {
    console.log("id : ", id);
    navigate(`../editStaff/${id}`);
  };

  const staffDelete = useMutation((id: string | undefined) => {
    return deleteStaff(id);
  });

  // const {data,error,isError,isLoading}= useQuery ('staff',listStaff,{onSuccess:()=>{setStaffs(data?.data)}})
  const { data, error, isError, isLoading, refetch } = useQuery(
    "staff",
    listStaff
  );
  const reload = (id: string | undefined) => {
    staffDelete.mutate(id);
    refetch();
  };

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

  const initialValues: Staff[] = [{ first_name: "", last_name: "", email: "" }];
  const sf = data?.data ? data.data : initialValues;

  const tableData = sf.map((item: Staff) => ({
    // id: item.id,
    first_name: item.first_name,
    last_name: item.last_name,
    email: item.email,
    action: (
      <HStack spacing={5}>
        <Button colorScheme="yellow" onClick={() => staffUpdate(item.id)}>
          Edit
        </Button>
        <Button colorScheme="red" onClick={() => reload(item.id)}>
          Delete
        </Button>
      </HStack>
    ),
  }));

  const columnHelper = createColumn<(typeof tableData)[0]>();

  const columns = [
    columnHelper.accessor("first_name", {
      cell: (info) => info.getValue(),
      header: "FirstName",
    }),
    columnHelper.accessor("last_name", {
      cell: (info) => info.getValue(),
      header: "LastName",
    }),
    columnHelper.accessor("email", {
      cell: (info) => info.getValue(),
      header: "Email",
    }),
    columnHelper.accessor("action", {
      cell: (info) => info.getValue(),
      header: "Action",
    }),
  ];
  // const staff:any = data?.data
  return (
    <Box p="12">
      <Heading size="sm" as="h3">
        List of Users
      </Heading>

      <Box mt="6">
        <Table
          colorScheme="blue"
          // Fallback component when list is empty
          emptyData={{
            text: "Nobody is registered here.",
          }}
          totalRegisters={data && data.data?.length}
          page={page}
          // Listen change page event and control the current page using state
          onPageChange={(page) => setPage(page)}
          columns={columns}
          data={tableData}
        />
      </Box>
    </Box>

    // <TableContainer borderTop="8px" borderColor="blue.400" bg="white">
    //   <Table variant="simple">
    //     <Thead>
    //       <Tr>
    //         <Th>ID</Th>
    //         <Th>FirstName</Th>
    //         <Th>LastName</Th>
    //         <Th>Email</Th>
    //         <Th>Action</Th>
    //       </Tr>
    //     </Thead>
    //     <Tbody>
    //       {data &&
    //         data.data?.map((item: Staff) => (
    //           <Tr key={item.id}>
    //             <Td>{item.id}</Td>
    //             <Td>{item.first_name}</Td>
    //             <Td>{item.last_name}</Td>
    //             <Td>{item.email}</Td>
    //             <Td>
    //               <HStack spacing={5}>
    //                 <Button
    //                   colorScheme="yellow"
    //                   onClick={() => staffUpdate(item.id)}
    //                 >
    //                   Edit
    //                 </Button>
    //                 <Button colorScheme="red" onClick={() => reload(item.id)}>
    //                   Delete
    //                 </Button>
    //               </HStack>
    //             </Td>
    //           </Tr>
    //         ))}
    //     </Tbody>
    //   </Table>
    // </TableContainer>
  );
}
