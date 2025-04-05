import { Box, Button } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes/routes";
import Login from "./pages/login/Login";


function App() {
  return(
    <Box w="full" h="100vh" bg="#121A21">
      <Routes>
        <Route index path={ROUTES.LOGIN} element={<Login/>}/>
      </Routes>
    </Box>
  );
}

export default App
