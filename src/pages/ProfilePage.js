import { Container } from "@chakra-ui/react";
import ProfileUserEditFormComponent from "../components/ProfileUserEditFormComponent";
import ProfileUserListsComponent from "../components/ProfileUserListsComponent";

export default function ProfilePage() {
  return (
    <Container maxW="675px">
      <ProfileUserEditFormComponent />

      <ProfileUserListsComponent />
    </Container>
  );
}
