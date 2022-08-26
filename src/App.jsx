import { useState } from "react";
import Input from "./Components/Input";
import { Container } from "./Components/Container";
import { Text, Box, Button } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Spinner } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchRepos } from "./reducers/repos-reducer";
import UserCards from "./Components/UserCard";
import { useGetReposQuery } from "./http/repos";
function App() {
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState({
    topic: "",
    location: "",
    page,
  });

  const { repos, loading, error, success } = useGetReposQuery(searchQuery, {
    skip,
  });
  console.log(repos);
  const handleChange = (e) =>
    setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value });

  const handleSearch = () => {
    setSkip(false);
  };

  return (
    <div className="App">
      <Container>
        <Text
          my={12}
          fontWeight={"extrabold"}
          align={"center"}
          fontSize={[20, 30, 40]}
        >
          Github Search
        </Text>
        <Box
          className="mainBox"
          borderColor={"gray.400"}
          border={"2px"}
          borderRadius="5"
          p={4}
        >
          <Input
            onChange={handleChange}
            name="topic"
            placeholder="Enter Topic"
          />
          <Input
            onChange={handleChange}
            name="location"
            placeholder="Enter Location"
          />
          <Button onClick={handleSearch}>
            <SearchIcon />
          </Button>
        </Box>
        <Box textAlign={"center"}>
          {loading ? <Spinner size={"xl"} mt={5} /> : null}

          {error ? <Text color={"red.500"}>{error}</Text> : null}

          {repos?.items?.map((items) => {
            return <UserCards {...items} />;
          })}
        </Box>
      </Container>
    </div>
  );
}

export default App;
