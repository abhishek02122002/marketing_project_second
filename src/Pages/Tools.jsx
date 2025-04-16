import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  IconButton,
  SimpleGrid,
  Tooltip,
  useColorMode,
  Badge,
  Progress,
  Avatar,
  useToast,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
  Spinner
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, StarIcon } from "@chakra-ui/icons";
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
  FaRobot,
} from "react-icons/fa";
import { SiTypescript, SiGitlab, SiMongodb, SiNextdotjs } from "react-icons/si";

const techData = {
  "Full Stack Development": [
    { name: "HTML", icon: FaHtml5, color: "orange.500", proficiency: 90 },
    { name: "CSS", icon: FaCss3Alt, color: "blue.500", proficiency: 85 },
    { name: "JavaScript", icon: FaJs, color: "yellow.500", proficiency: 95 },
    { name: "React", icon: FaReact, color: "cyan.500", proficiency: 90 },
    { name: "Next.js", icon: SiNextdotjs, color: "gray.800", proficiency: 80 },
    { name: "Node.js", icon: FaNodeJs, color: "green.500", proficiency: 85 },
    { name: "MongoDB", icon: SiMongodb, color: "green.600", proficiency: 75 },
    { name: "Git", icon: FaGitAlt, color: "orange.600", proficiency: 90 },
    { name: "GitHub", icon: FaGithub, color: "gray.800", proficiency: 85 },
    { name: "TypeScript", icon: SiTypescript, color: "blue.700", proficiency: 80 },
  ],
  "Java Development": [
    { name: "Java", icon: FaJava, color: "red.500", proficiency: 85 },
    { name: "Spring", icon: FaJava, color: "green.500", proficiency: 75 },
    { name: "Hibernate", icon: FaDatabase, color: "blue.600", proficiency: 70 },
    { name: "Git", icon: FaGitAlt, color: "orange.600", proficiency: 90 },
    { name: "GitHub", icon: FaGithub, color: "gray.800", proficiency: 85 },
  ],
  "Frontend Development": [
    { name: "HTML", icon: FaHtml5, color: "orange.500", proficiency: 90 },
    { name: "CSS", icon: FaCss3Alt, color: "blue.500", proficiency: 85 },
    { name: "JavaScript", icon: FaJs, color: "yellow.500", proficiency: 95 },
    { name: "React", icon: FaReact, color: "cyan.500", proficiency: 90 },
    { name: "Angular", icon: FaAngular, color: "red.500", proficiency: 65 },
    { name: "TypeScript", icon: SiTypescript, color: "blue.700", proficiency: 80 },
    { name: "Git", icon: FaGitAlt, color: "orange.600", proficiency: 90 },
    { name: "GitHub", icon: FaGithub, color: "gray.800", proficiency: 85 },
    { name: "GitLab", icon: SiGitlab, color: "orange.700", proficiency: 80 },
  ],
  "iOS Development": [
    { name: "Swift", icon: FaSwift, color: "orange.500", proficiency: 70 },
    { name: "Xcode", icon: FaApple, color: "gray.700", proficiency: 75 },
    { name: "iOS", icon: FaApple, color: "gray.600", proficiency: 70 },
    { name: "Git", icon: FaGitAlt, color: "orange.600", proficiency: 90 },
    { name: "GitHub", icon: FaGithub, color: "gray.800", proficiency: 85 },
  ],
};

const aiRecommendations = {
  "Full Stack Development": [
    "Learn GraphQL for efficient API queries",
    "Explore Docker for containerization",
    "Master AWS deployment for scalable applications"
  ],
  "Java Development": [
    "Deep dive into Spring Boot microservices",
    "Learn Kubernetes for orchestration",
    "Explore Kafka for event-driven architectures"
  ],
  "Frontend Development": [
    "Try Svelte for compile-time optimizations",
    "Master Webpack for advanced bundling",
    "Explore Three.js for 3D web experiences"
  ],
  "iOS Development": [
    "Learn SwiftUI for declarative interfaces",
    "Explore Combine for reactive programming",
    "Try Flutter for cross-platform development"
  ],
};

const Tools = () => {
  const { colorMode } = useColorMode();
  const [selectedCategory, setSelectedCategory] = useState("Full Stack Development");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const generateAIResponse = (query) => {
    const queryLower = query.toLowerCase();
    const techNames = techData[selectedCategory].map(t => t.name).join(", ");
    const topTech = techData[selectedCategory].slice(0, 3).map(t => t.name);
    
    if (queryLower.includes("next") || queryLower.includes("learn")) {
      return `Based on your skills in ${techNames}, I recommend:
      
1. ${aiRecommendations[selectedCategory][0]}
2. ${aiRecommendations[selectedCategory][1]}
3. ${aiRecommendations[selectedCategory][2]}

Focus on these to advance your ${selectedCategory} expertise.`;
    }
    else if (queryLower.includes("improve") || queryLower.includes("better")) {
      return `To enhance your ${selectedCategory} skills:

• Build projects using ${topTech[0]} and ${topTech[1]}
• Contribute to open-source ${topTech[2]} projects
• Study advanced patterns in ${techNames.split(',')[0]}

Practice consistently for best results.`;
    }
    else if (queryLower.includes("career") || queryLower.includes("job")) {
      return `For ${selectedCategory} career growth:

- Master ${topTech.join(' and ')}
- Build a strong portfolio
- Network in ${selectedCategory} communities
- Consider certifications in ${topTech[0]}

The job market values deep specialization.`;
    }
    else {
      return `Regarding "${query}" in ${selectedCategory}:

${aiRecommendations[selectedCategory].join('\n• ')}

Additional advice:
• Join ${selectedCategory} forums
• Follow industry trends
• Experiment with new tools

Your current stack: ${techNames}`;
    }
  };

  const handleAIQuery = () => {
    if (!aiQuery.trim()) {
      toast({
        title: "Error",
        description: "Please enter your question",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    setAiResponse("");

    setTimeout(() => {
      try {
        const response = generateAIResponse(aiQuery);
        setAiResponse(response);
        toast({
          title: "AI Response Ready",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to generate response",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <Box
      minHeight="100vh"
      bg={colorMode === "light" ? "gray.50" : "gray.900"}
      color={colorMode === "light" ? "gray.800" : "white"}
      p={{ base: 2, md: 4 }}
    >
      <Flex>
        {/* Sidebar */}
        <Box
          as={motion.div}
          initial={{ width: "220px" }}
          animate={{ width: isSidebarOpen ? "220px" : "0" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          bg={colorMode === "light" ? "white" : "gray.800"}
          p={3}
          height="100vh"
          overflow="hidden"
          boxShadow="md"
          zIndex={1}
        >
          <Text fontSize="lg" fontWeight="semibold" mb={3}>
            Categories
          </Text>
          <VStack align="start" spacing={2}>
            {Object.keys(techData).map((category) => (
              <Box
                key={category}
                w="100%"
                p={2}
                borderRadius="md"
                bg={selectedCategory === category ? (colorMode === "light" ? "blue.50" : "blue.900") : "transparent"}
                cursor="pointer"
                _hover={{
                  bg: colorMode === "light" ? "gray.100" : "gray.700",
                }}
                transition="all 0.2s ease-in-out"
                onClick={() => setSelectedCategory(category)}
              >
                <Text fontSize="sm" fontWeight={selectedCategory === category ? "bold" : "normal"}>
                  {category}
                </Text>
              </Box>
            ))}
          </VStack>
        </Box>

        {/* Main Content */}
        <Box flex="1" p={{ base: 3, md: 4 }}>
          {/* Header and Controls */}
          <Flex justify="space-between" align="center" mb={4}>
            <HStack>
              <IconButton
                icon={isSidebarOpen ? <CloseIcon /> : <HamburgerIcon />}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                variant="ghost"
                size="sm"
                aria-label="Toggle Sidebar"
                display={{ base: "block", md: "none" }}
              />
              <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="semibold">
                Developer Toolkit
              </Text>
            </HStack>
            <Button
              leftIcon={<FaRobot />}
              colorScheme="purple"
              size="sm"
              onClick={() => setIsAIModalOpen(true)}
            >
              AI Assistant
            </Button>
          </Flex>

          {/* Technology Grid */}
          <Box
            bg={colorMode === "light" ? "white" : "gray.800"}
            borderRadius="lg"
            p={{ base: 3, md: 4 }}
            boxShadow="sm"
            mb={6}
          >
            <Flex justify="space-between" align="center" mb={4}>
              <Text fontSize="lg" fontWeight="semibold">
                {selectedCategory}
              </Text>
              <Badge colorScheme="green" fontSize="0.8em">
                {techData[selectedCategory].length} Technologies
              </Badge>
            </Flex>

            <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
              {techData[selectedCategory].map((tech, idx) => (
                <Tooltip
                  key={idx}
                  label={
                    <Box>
                      <Text fontWeight="bold">{tech.name}</Text>
                      <Progress
                        value={tech.proficiency}
                        size="xs"
                        colorScheme="green"
                        mt={2}
                      />
                      <Text fontSize="sm" mt={1}>
                        Proficiency: {tech.proficiency}%
                      </Text>
                    </Box>
                  }
                  placement="top"
                  hasArrow
                >
                  <Box
                    as={motion.div}
                    p={3}
                    borderRadius="lg"
                    bg={colorMode === "light" ? "gray.50" : "gray.700"}
                    textAlign="center"
                    borderLeft="4px solid"
                    borderColor={tech.color}
                    _hover={{
                      transform: "translateY(-3px)",
                      boxShadow: "md",
                    }}
                    whileHover={{ scale: 1.03 }}
                    transition="all 0.2s ease-in-out"
                  >
                    <Flex direction="column" align="center" justify="center" h="100%">
                      {tech.icon ? (
                        <tech.icon size="32px" color={tech.color} />
                      ) : (
                        <Text fontSize="sm" color={tech.color}>
                          {tech.name}
                        </Text>
                      )}
                      <Text mt={2} fontSize="sm" fontWeight="medium">
                        {tech.name}
                      </Text>
                      <HStack mt={1} spacing={0.5}>
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            color={i < Math.floor(tech.proficiency / 20) ? "yellow.400" : "gray.300"}
                            boxSize={3}
                          />
                        ))}
                      </HStack>
                    </Flex>
                  </Box>
                </Tooltip>
              ))}
            </SimpleGrid>
          </Box>

          {/* AI Recommendations Section */}
          <Box
            bg={colorMode === "light" ? "white" : "gray.800"}
            borderRadius="lg"
            p={{ base: 3, md: 4 }}
            boxShadow="sm"
          >
            <Flex align="center" mb={3}>
              <FaRobot color={colorMode === "light" ? "#805AD5" : "#9F7AEA"} />
              <Text ml={2} fontSize="lg" fontWeight="semibold">
                AI Recommendations
              </Text>
            </Flex>
            <VStack align="start" spacing={3}>
              {aiRecommendations[selectedCategory].map((rec, idx) => (
                <Flex
                  key={idx}
                  p={3}
                  bg={colorMode === "light" ? "purple.50" : "purple.900"}
                  borderRadius="md"
                  w="100%"
                >
                  <Avatar size="sm" icon={<FaRobot />} bg="purple.500" mr={3} />
                  <Text fontSize="sm">{rec}</Text>
                </Flex>
              ))}
            </VStack>
          </Box>
        </Box>
      </Flex>

      {/* AI Assistant Modal */}
      <Modal isOpen={isAIModalOpen} onClose={() => {
        setIsAIModalOpen(false);
        setAiQuery("");
        setAiResponse("");
      }} size="lg">
        <ModalOverlay />
        <ModalContent bg={colorMode === "light" ? "white" : "gray.800"}>
          <ModalHeader color={colorMode === "light" ? "gray.800" : "white"}>
            <Flex align="center">
              <FaRobot color={colorMode === "light" ? "#805AD5" : "#9F7AEA"} />
              <Text ml={2}>Developer AI Assistant</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton color={colorMode === "light" ? "gray.800" : "white"} />
          <ModalBody>
            <Text mb={2} fontSize="sm" color={colorMode === "light" ? "gray.500" : "gray.300"}>
              Ask me anything about {selectedCategory} or career development
            </Text>
            <Textarea
              placeholder={`e.g. "What should I learn next in ${selectedCategory}?"`}
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              mb={4}
              bg={colorMode === "light" ? "white" : "gray.700"}
              color={colorMode === "light" ? "gray.800" : "white"}
              _placeholder={{ color: colorMode === "light" ? "gray.400" : "gray.400" }}
            />
            
            {isLoading ? (
              <Flex justify="center" py={4}>
                <Spinner size="lg" color="purple.500" />
              </Flex>
            ) : aiResponse ? (
              <Box
                p={3}
                bg={colorMode === "light" ? "purple.50" : "purple.900"}
                color={colorMode === "light" ? "gray.800" : "white"}
                borderRadius="md"
                borderLeft="4px solid"
                borderColor="purple.500"
                mb={4}
                whiteSpace="pre-wrap"
              >
                {aiResponse}
              </Box>
            ) : null}
          </ModalBody>
          <ModalFooter>
            <Button 
              variant="ghost" 
              mr={3} 
              onClick={() => {
                setIsAIModalOpen(false);
                setAiQuery("");
                setAiResponse("");
              }}
              color={colorMode === "light" ? "gray.800" : "white"}
            >
              Close
            </Button>
            <Button 
              colorScheme="purple" 
              onClick={handleAIQuery}
              isLoading={isLoading}
              loadingText="Generating..."
            >
              Ask AI
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Tools;