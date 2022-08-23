import { useState } from "react";
import Input from "./Components/Input";
import { Container } from "./Components/Container";
import { Text } from "@chakra-ui/react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Container>
        <Text my={12} fontWeight={"extrabold"} align={"center"} fontSize={[20, 30, 40]}>
          Github Search
        </Text>
        <Input placeholder="Enter Data" />
      </Container>
    </div>
  );
}

export default App;
