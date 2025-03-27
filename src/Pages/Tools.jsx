import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  IconButton,
  SimpleGrid,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaAngular,
  FaGitAlt,
  FaGithub,
  FaJava,
  FaNodeJs,
  FaDatabase,
  FaSwift,
  FaApple,
 
} from "react-icons/fa";
import { SiTypescript, SiGitlab, SiMongodb } from "react-icons/si";

// Technology data
const techData = {
  "Full Stack Development": [
    { name: "HTML", icon: FaHtml5, color: "orange.500" },
    { name: "CSS", icon: FaCss3Alt, color: "blue.500" },
    { name: "JavaScript", icon: FaJs, color: "yellow.500" },
    { name: "React", icon: FaReact, color: "cyan.500" },
    { name: "Node.js", icon: FaNodeJs, color: "green.500" },
    { name: "MongoDB", icon: SiMongodb, color: "green.600" },
    { name: "Git", icon: FaGitAlt, color: "orange.600" },
    { name: "GitHub", icon: FaGithub, color: "gray.800" },
    { name: "TypeScript", icon: SiTypescript, color: "blue.700" },
  ],
  "Java Development": [
    { name: "Java", icon: FaJava, color: "red.500" },
    { name: "Spring", icon: FaJava, color: "green.500" },
    { name: "Hibernate", icon: FaDatabase, color: "blue.600" },
    { name: "Git", icon: FaGitAlt, color: "orange.600" },
    { name: "GitHub", icon: FaGithub, color: "gray.800" },
  ],
  "Frontend Development": [
    { name: "HTML", icon: FaHtml5, color: "orange.500" },
    { name: "CSS", icon: FaCss3Alt, color: "blue.500" },
    { name: "JavaScript", icon: FaJs, color: "yellow.500" },
    { name: "React", icon: FaReact, color: "cyan.500" },
    { name: "Angular", icon: FaAngular, color: "red.500" },
    { name: "TypeScript", icon: SiTypescript, color: "blue.700" },
    { name: "Git", icon: FaGitAlt, color: "orange.600" },
    { name: "GitHub", icon: FaGithub, color: "gray.800" },
    { name: "GitLab", icon: SiGitlab, color: "orange.700" },
  ],
  "iOS Development": [
    { name: "Swift", icon: FaSwift, color: "orange.500" },
    { name: "Xcode", icon: FaApple, color: "gray.700" },
    { name: "iOS", icon: FaApple, color: "gray.600" },
    { name: "Git", icon: FaGitAlt, color: "orange.600" },
    { name: "GitHub", icon: FaGithub, color: "gray.800" },
  ],
};

const Tools = () => {
  const { colorMode } = useColorMode();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Box
      minHeight="100vh"
      bg={colorMode === "light" ? "gray.50" : "gray.900"} // Minimal light/dark bg
      color={colorMode === "light" ? "gray.800" : "white"}
      p={{ base: 2, md: 4 }} // Reduced padding
    >
      <Flex>
        {/* Sidebar */}
        <Box
          as={motion.div}
          initial={{ width: "200px" }} // Slightly narrower sidebar
          animate={{ width: isSidebarOpen ? "200px" : "0" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          bg={colorMode === "light" ? "white" : "gray.800"}
          p={3} // Reduced padding
          height="100vh"
          overflow="hidden"
        >
          <Text fontSize="lg" fontWeight="semibold" mb={3}>
            Categories
          </Text>
          <VStack align="start" spacing={2}> {/* Reduced spacing */}
            {Object.keys(techData).map((category) => (
              <Text
                key={category}
                fontSize="sm" // Smaller font
                cursor="pointer"
                _hover={{ color: "blue.400" }}
                transition="color 0.2s ease-in-out"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Text>
            ))}
          </VStack>
        </Box>

        {/* Main Content */}
        <Box flex="1" p={{ base: 3, md: 4 }}> {/* Reduced padding */}
          {/* Sidebar Toggle Button */}
          <IconButton
            icon={isSidebarOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            variant="ghost" // Minimal button style
            size="sm" // Smaller button
            aria-label="Toggle Sidebar"
            mb={3}
            display={{ base: "block", md: "none" }}
          />

          {/* Header */}
          <Text
            fontSize={{ base: "xl", md: "2xl" }} // Smaller header
            fontWeight="semibold"
            textAlign="center"
            mb={4} // Reduced margin
          >
            Tools & Tech
          </Text>

          {/* Technology List */}
          <Box
            bg={colorMode === "light" ? "white" : "gray.800"}
            borderRadius="8px" // Slightly smaller radius
            p={{ base: 3, md: 4 }} // Reduced padding
          >
            {selectedCategory ? (
              <VStack spacing={4} align="start"> {/* Reduced spacing */}
                <Text fontSize="lg" fontWeight="semibold">
                  {selectedCategory}
                </Text>
                <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}> {/* Reduced spacing */}
                  {techData[selectedCategory].map((tech, idx) => (
                    <Tooltip key={idx} label={tech.name} placement="top" hasArrow>
                      <Box
                        as={motion.div}
                        p={2} // Reduced padding
                        borderRadius="6px" // Smaller radius
                        bg={colorMode === "light" ? "gray.100" : "gray.700"}
                        textAlign="center"
                        _hover={{
                          bg: "blue.500",
                          color: "white",
                          transform: "scale(1.05)", // Slightly smaller scale
                        }}
                        transition="all 0.2s ease-in-out"
                      >
                        {tech.icon ? (
                          <tech.icon size="30px" color={tech.color} /> // Smaller icon
                        ) : (
                          <Text fontSize="sm" color={tech.color}>
                            {tech.name}
                          </Text>
                        )}
                      </Box>
                    </Tooltip>
                  ))}
                </SimpleGrid>
              </VStack>
            ) : (
              <Text fontSize="md" textAlign="center" color={colorMode === "light" ? "gray.600" : "gray.400"}>
                Select a category
              </Text>
            )}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Tools;