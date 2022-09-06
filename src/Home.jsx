import { useEffect, useState } from "react";
import Input from "./Components/Input";
import { Container } from "./Components/Container";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Text,
  Box,
  Button,
  Spinner,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import UserCards from "./Components/UserCard";
import { useGetLazyReposQuery } from "./http/repos";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [repository, setRepository] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    topic: searchParams.get("search") ? searchParams.get("search") : "",
    location: searchParams.get("location") ? searchParams.get("location") : "",
    page: searchParams.get("page") ? searchParams.get("page") : page,
    sort: searchParams.get("sort") ? searchParams.get("sort") : "",
  });

  const [
    getRepos,
    { data: repos, isLoading: loading, isFetching, error, isSuccess: success },
  ] = useGetLazyReposQuery();

  const handleChange = (e) => {
    setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value });
  };

  const hasMoreItems = repos?.total_count > repository.length;

  const persistInUrl = () => {
    setSearchParams(
      `search=${searchQuery.topic}&location=${searchQuery.location}${
        page > 1 ? `&page=${page}` : ""
      }${searchQuery.sort ? `&sort=${searchQuery.sort}` : ""}`
    );
  };

  const handleSearch = () => {
    if (searchQuery.topic === "" && searchQuery.location === "") return;
    setRepository([]);
    setPage(1);
    getRepos(searchQuery);
    persistInUrl();
  };

  const loadMore = () => {
    setPage((old) => old + 1);
    persistInUrl();
  };

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

  useEffect(() => {
    if (searchQuery.topic) {
      getRepos(searchQuery);
    }
  }, []);

  const handleApplyFilter = (e) => {
    setSearchQuery({ ...searchQuery, sort: e.target.value });
    setRepository([]);
    setPage(1);
    getRepos({ ...searchQuery, sort: e.target.value });
    persistInUrl();
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
            value={searchQuery.topic}
          />
          <Input
            onChange={handleChange}
            name="location"
            placeholder="Enter Location"
            value={searchQuery.location}
          />
          <Button onClick={handleSearch}>
            <SearchIcon />
          </Button>
        </Box>
        <Box textAlign={"center"}>
          {error ? <Text color={"red.500"}>{error?.data?.message}</Text> : null}
          {success && repos.total_count === 0 ? (
            <Text fontSize={"2xl"} mt={3} fontWeight={"bold"} color={"red.500"}>
              No Results Found
            </Text>
          ) : null}

          {loading || (isFetching && page === 1) ? (
            <Spinner size={"xl"} mt={5} />
          ) : success && repos?.items.length > 0 ? (
            <>
              <Box my={3}>
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Filter Data
                  </MenuButton>
                  <MenuList fontSize={"md"}>
                    <MenuItem
                      name="sort"
                      onClick={handleApplyFilter}
                      value={"joined"}
                    >
                      Recent Joined
                    </MenuItem>
                    <MenuItem
                      name="sort"
                      onClick={handleApplyFilter}
                      value={"followers"}
                    >
                      Most Followers
                    </MenuItem>
                    <MenuItem
                      onClick={handleApplyFilter}
                      value={"repositories"}
                      name="sort"
                    >
                      Most Repos
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
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
            </>
          ) : null}
        </Box>
      </Container>
    </div>
  );
};

export default Home;
