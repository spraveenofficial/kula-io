import { useEffect, useState } from "react";
import Input from "./Components/Input";
import { Container } from "./Components/Container";
import { Text, Box, Button } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Spinner } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRepos } from "./reducers/repos-reducer";
function App() {
  const dispatch = useDispatch();
  const datas = useSelector((state) => state.repos);
  console.log(datas);
  const [data, setData] = useState({
    topic: "",
    location: "",
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSearch = () => dispatch(fetchRepos(data.topic, data.location));

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
          {datas.loading ? <Spinner size={"xl"} mt={5} /> : null}
        </Box>
      </Container>
    </div>
  );
}

export default App;
