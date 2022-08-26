import { useState } from "react";
import Input from "./Components/Input";
import { Container } from "./Components/Container";
import { Text, Box, Button } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Spinner } from "@chakra-ui/react";
import UserCards from "./Components/UserCard";
import { useGetLazyReposQuery } from "./http/repos";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState({
    topic: "",
    location: "",
    page,
  });

  const [
    getRepos,
    { data: repos, isLoading: loading, isError: error, isSuccess: success },
  ] = useGetLazyReposQuery();

  const handleChange = (e) => {
    setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value });
  };

  const myPosts = repos?.items.length;
  const scroll = repos?.total_count;

  const handleSearch = () => {
    getRepos(searchQuery);
  };

  const loadMore = async () => {
    setPage((old) => old + 1);
    getRepos({ ...searchQuery, page: page + 1 });
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
          {success && repos.total_count === 0 ? (
            <Text fontSize={"2xl"} mt={3} fontWeight={"bold"} color={"red.500"}>
              No Results Found
            </Text>
          ) : null}
          {success &&
            repos?.items?.map((items) => {
              return <UserCards {...items} />;
            })}
          <InfiniteScroll
            dataLength={10}
            next={loadMore}
            hasMore={myPosts < scroll ? true : false}
            loader={
              <div className="text-black flex-col w-full mt-5 flex align-center texts-center">
                <div
                  className="w-10 mb-10 h-10 rounded-full animate-spin
                  border-2 border-dashed border-black-600 border-t-black mr-1"
                ></div>
                <p>Loading More Content..</p>
              </div>
            }
          ></InfiniteScroll>
        </Box>
      </Container>
    </div>
  );
}

export default App;
