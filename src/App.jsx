import { Box, useColorMode } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import JavaScript from "./pages/JavaScript";
import ReactPage from "./pages/ReactPage";
import Tools from "./pages/Tools";
import Creator from "./pages/Creator";
import Footer from "./components/Footer";
import FloatingCode from './components/FloatingCode'


const App = () => {
  const { colorMode } = useColorMode(); // Chakra UI ka hook for dark/light mode

  return (
    <Router>
      <Navbar />
      <Box
        pt="80px"
        minHeight="100vh"
        bg={colorMode === "light" ? "whitesmoke" : "linear-gradient(135deg, #0a0a0a, #1a1a1a)"}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/javascript" element={<JavaScript />} />
          <Route path="/react" element={<ReactPage />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/creator" element={<Creator />} />
        </Routes>
      <Footer/>
      </Box>
    </Router>
     
      
  );
};

export default App;
