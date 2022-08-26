import { Box, Image, Text, Button } from "@chakra-ui/react";

const UserCards = (props) => {
  return (
    <Box display={"flex"} my={2} border="2px" p={3}>
      <Image src={props.avatar_url} alt="avatar" w={40} h={40} />
      <Box
        display={"flex"}
        flexDirection="column"
        justifyContent={"space-between"}
        textAlign={"left"}
        ml={2}
      >
        <Text fontSize={"2xl"} fontWeight="bold">
          {props.login}
        </Text>
        <Text fontSize={"xl"}>{props.id}</Text>
        <Button onClick={() => props.handleMoveToProfile(props.html_url)}>
          Visit Profile
        </Button>
      </Box>
    </Box>
  );
};

export default UserCards;
