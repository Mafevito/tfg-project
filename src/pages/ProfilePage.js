import { Container } from "@chakra-ui/react";
import ProfileUserDataComponent from "../components/ProfileUserDataComponent";
import ProfileUserListsComponent from "../components/ProfileUserListsComponent";

export default function ProfilePage() {
  return (
    <Container maxW="675px">
      <ProfileUserDataComponent />

      <ProfileUserListsComponent />
    </Container>
  );
}
