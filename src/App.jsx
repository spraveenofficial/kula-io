import { useEffect, useState } from "react";
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
  const [repository, setRepository] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    topic: "",
    location: "",
    page: page,
  });

  const [
    getRepos,
    {
      data: repos,
      isLoading: loading,
      isFetching,
      isError: error,
      isSuccess: success,
    },
  ] = useGetLazyReposQuery();

  const handleChange = (e) => {
    setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value });
  };

  const hasMoreItems = repos?.total_count > repository.length;

  const handleSearch = () => {
    setRepository([]);
    setPage(1);
    getRepos(searchQuery);
  };

  const loadMore = () => setPage((old) => old + 1);

  useEffect(() => {
    if (page !== 1) {
      getRepos({ ...searchQuery, page: page + 1 });
    }
  }, [page]);

  const handleMoveToProfile = (url) => window.open(url, "_blank");

  useEffect(() => {
    if (repository?.length > 0) {
      setRepository([...repository, ...repos.items]);
    } else {
      setRepository(repos?.items ? repos.items : []);
    }
  }, [repos]);

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
          {error ? <Text color={"red.500"}>{error}</Text> : null}
          {success && repos.total_count === 0 ? (
            <Text fontSize={"2xl"} mt={3} fontWeight={"bold"} color={"red.500"}>
              No Results Found
            </Text>
          ) : null}

          {loading || (isFetching && page === 1) ? (
            <Spinner size={"xl"} mt={5} />
          ) : success && repos?.items.length > 0 ? (
            <InfiniteScroll
              dataLength={repository.length}
              next={loadMore}
              hasMore={hasMoreItems}
              loader={<p>Loading More Repos..</p>}
            >
              {repository?.map((items) => {
                return (
                  <UserCards
                    {...items}
                    handleMoveToProfile={handleMoveToProfile}
                  />
                );
              })}
              {repos?.total_count === repository.length && (
                <p>Caught up all the Repositories.</p>
              )}
            </InfiniteScroll>
          ) : null}
        </Box>
      </Container>
    </div>
  );
}

export default App;
