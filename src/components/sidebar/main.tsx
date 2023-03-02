import { Link, List, ListIcon, ListItem } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { AtSignIcon, CalendarIcon, EditIcon, InfoIcon } from "@chakra-ui/icons";

export default function Sidebar() {
  return (
    <List color="white" fontSize="1.2em" spacing={4}>
      <ListItem>
        <ListIcon as={CalendarIcon} color="white"></ListIcon>
        <Link as={NavLink} to="/">
          Dashboard
        </Link>
      </ListItem>
      {/*<ListItem>*/}
      {/*    <ListIcon as={EditIcon} color="white"></ListIcon>*/}
      {/*    <Link as={NavLink} to="/create">Main</Link>*/}
      {/*</ListItem>*/}
      <ListItem>
        <ListIcon as={AtSignIcon} color="white"></ListIcon>
        <Link as={NavLink} to="/staff">
          Staff
        </Link>
      </ListItem>
      <ListItem>
        <ListIcon as={EditIcon} color="white"></ListIcon>
        <Link as={NavLink} to="/createStaff">
          StaffCreate
        </Link>
      </ListItem>
      <ListItem>
        <ListIcon as={InfoIcon} color="white"></ListIcon>
        <Link as={NavLink} to="/profile">
          Profile
        </Link>
      </ListItem>
    </List>
  );
}
