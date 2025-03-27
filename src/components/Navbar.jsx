import { useState } from "react";
import {
  Box,
  Flex,
  Spacer,
  Button,
  IconButton,
  useColorMode,
  useBreakpointValue,
  VStack,
  Collapse,
  Tooltip,
  Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });

  // ✅ Close menu on click
  const handleMenuClick = () => setIsOpen(false);

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      bg={colorMode === "light"
        ? "rgba(245, 245, 245, 0.7)"  // Light Mode: Semi-transparent smoke white
        : "rgba(34, 34, 34, 0.7)"}     // Dark Mode: Semi-transparent dark gray
      backdropFilter="blur(12px) saturate(150%)"  // Enhanced glass effect
      borderBottom="1px solid"
      borderColor={colorMode === "light" ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)"}
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"  // Subtle shadow for depth
      zIndex="1000"
      display="flex"
      justifyContent="space-evenly"
      p={4}
      transition="all 0.3s ease-in-out"
    >
      <Flex align="center">
        {/* ✅ Left Box - Logo & Mobile Menu Button */}
        <Box display="flex" alignItems="center">
          <Tooltip 
            label="Your Coding Library 📖" 
            bg="gray.700" 
            color="white" 
            placement="bottom"
            hasArrow
          >
            <Button
              variant="ghost"
              _hover={{ color: "blue.600" }}
              color="blue.400"
              as={Link}
              to="/"
              fontWeight="bold"
              fontSize="lg"
            >
              codeOps
            </Button>
          </Tooltip>

          {isMobile && (
            <IconButton
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              onClick={() => setIsOpen(!isOpen)}
              variant="outline"
              aria-label="Toggle Menu"
              ml={2}
            />
          )}
        </Box>

        <Spacer />

        {/* ✅ Right Box - Navigation & Dark Mode Toggle */}
        <Box>
          {!isMobile && (
            <Flex gap={4}>
              <Button variant="ghost" as={Link} to="/articles">
                Articles
              </Button>
              <Button variant="ghost" as={Link} to="/javascript">
                JavaScript
              </Button>
              <Button variant="ghost" as={Link} to="/react">
                React
              </Button>
              <Button variant="ghost" as={Link} to="/tools">
                Tools
              </Button>
              <Button variant="ghost" as={Link} to="/creator">
                Creator
              </Button>
              <IconButton
                onClick={toggleColorMode}
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                isRound
                variant="outline"
              />
            </Flex>
          )}
        </Box>
      </Flex>

      {/* ✅ Mobile Menu Collapse */}
      <Collapse in={isOpen} animateOpacity>
        <VStack
          bg={colorMode === "light"
            ? "rgba(245, 245, 245, 0.8)"  // Light Mode: Glassy smoke white
            : "rgba(34, 34, 34, 0.8)"}     // Dark Mode: Glassy dark gray
          backdropFilter="blur(12px) saturate(150%)"  // Glass effect for mobile menu
          border="1px solid"
          borderColor={colorMode === "light" ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)"}
          boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"  // Subtle shadow
          p={4}
          rounded="md"
          mt={2}
          spacing={4}
        >
          <Button variant="ghost" as={Link} to="/articles" onClick={handleMenuClick}>
            Articles
          </Button>
          <Button variant="ghost" as={Link} to="/javascript" onClick={handleMenuClick}>
            JavaScript
          </Button>
          <Button variant="ghost" as={Link} to="/react" onClick={handleMenuClick}>
            React
          </Button>
          <Button variant="ghost" as={Link} to="/tools" onClick={handleMenuClick}>
            Tools
          </Button>
          <Button variant="ghost" as={Link} to="/creator" onClick={handleMenuClick}>
            Creator
          </Button>
          <IconButton
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            isRound
            variant="outline"
          />
        </VStack>
      </Collapse>
    </Box>
  );
};

export default Navbar;