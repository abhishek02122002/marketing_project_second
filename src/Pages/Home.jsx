import {
  Box,
  Grid,
  Image,
  Text,
  Tag,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  AspectRatio,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import Slider from "react-slick"; // Import react-slick
import "slick-carousel/slick/slick.css"; // Slick carousel styles
import "slick-carousel/slick/slick-theme.css"; // Slick theme styles

const rotatingTexts = ["React", "JavaScript", "TypeScript", "Next.js", "Node.js"];

// Updated projects array with multiple images
const projects = [
  {
    title: "Counter Game",
    images: [
      "src/pexels-yurii-hlei-1365795.jpg",
      "src/pexels-photo-123456.jpg",
      "src/pexels-photo-789012.jpg",
    ],
    tags: ["#day1", "useState", "useEffect"],
    youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    github: "https://github.com/example/counter-game",
    description: "A simple counter game built with React to practice state management.",
    thoughtness: "easy",
  },
  {
    title: "Project 2",
    images: [
      "src/pexels-yurii-hlei-1365795.jpg",
      "src/pexels-photo-234567.jpg",
      "src/pexels-photo-890123.jpg",
    ],
    tags: ["#day2", "React", "Hooks"],
    youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    github: "https://github.com/example/project-2",
    description: "A React project exploring custom hooks and component composition.",
    thoughtness: "medium",
  },
  {
    title: "Project 3",
    images: [
      "src/pexels-yurii-hlei-1365795.jpg",
      "src/pexels-photo-345678.jpg",
      "src/pexels-photo-901234.jpg",
    ],
    tags: ["#day3", "JavaScript", "Events"],
    youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    github: "https://github.com/example/project-3",
    description: "A project focusing on JavaScript event handling and DOM manipulation.",
    thoughtness: "easy",
  },
  {
    title: "Project 4",
    images: [
      "src/pexels-yurii-hlei-1365795.jpg",
      "src/pexels-photo-456789.jpg",
      "src/pexels-photo-012345.jpg",
    ],
    tags: ["#day4", "Next.js", "API"],
    youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    github: "https://github.com/example/project-4",
    description: "A Next.js app integrating external APIs for dynamic content.",
    thoughtness: "hard",
  },
  {
    title: "Project 5",
    images: [
      "src/pexels-yurii-hlei-1365795.jpg",
      "src/pexels-photo-567890.jpg",
      "src/pexels-photo-123450.jpg",
    ],
    tags: ["#day5", "CSS", "Animations"],
    youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    github: "https://github.com/example/project-5",
    description: "A project showcasing CSS animations and transitions.",
    thoughtness: "medium",
  },
  {
    title: "Project 6",
    images: [
      "src/pexels-yurii-hlei-1365795.jpg",
      "src/pexels-photo-678901.jpg",
      "src/pexels-photo-234501.jpg",
    ],
    tags: ["#day6", "Flexbox", "Grid"],
    youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    github: "https://github.com/example/project-6",
    description: "A layout-focused project using Flexbox and CSS Grid.",
    thoughtness: "easy",
  },
  {
    title: "Project 7",
    images: [
      "src/pexels-yurii-hlei-1365795.jpg",
      "src/pexels-photo-789012.jpg",
      "src/pexels-photo-345012.jpg",
    ],
    tags: ["#day7", "Framer Motion", "GSAP"],
    youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    github: "https://github.com/example/project-7",
    description: "An animated project using Framer Motion and GSAP.",
    thoughtness: "hard",
  },
  {
    title: "Project 8",
    images: [
      "src/pexels-yurii-hlei-1365795.jpg",
      "src/pexels-photo-890123.jpg",
      "src/pexels-photo-456123.jpg",
    ],
    tags: ["#day8", "TypeScript", "Props"],
    youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    github: "https://github.com/example/project-8",
    description: "A TypeScript project focusing on prop types and interfaces.",
    thoughtness: "medium",
  },
  {
    title: "Project 9",
    images: [
      "src/pexels-yurii-hlei-1365795.jpg",
      "src/pexels-photo-901234.jpg",
      "src/pexels-photo-567123.jpg",
    ],
    tags: ["#day9", "Firebase", "Auth"],
    youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    github: "https://github.com/example/project-9",
    description: "A Firebase-powered app with authentication features.",
    thoughtness: "hard",
  },
  {
    title: "Project 10",
    images: [
      "src/pexels-yurii-hlei-1365795.jpg",
      "src/pexels-photo-012345.jpg",
      "src/pexels-photo-678123.jpg",
    ],
    tags: ["#day10", "Redux", "State Management"],
    youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    github: "https://github.com/example/project-10",
    description: "A Redux-based project for advanced state management.",
    thoughtness: "hard",
  },
];

const HomePage = () => {
  const { colorMode } = useColorMode();
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedProject(null);
  };

  // Slider settings for react-slick
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box
      p={{ base: 5, md: 50 }}
      minHeight="100vh"
      bg="black"
      color="white"
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
    >
      {/* 🚀 Hero Section */}
      <Text fontSize={{ base: "3xl", md: "6xl" }} fontWeight="bold">
        Welcome to CodeOps! 🚀
      </Text>

      <Text fontSize={{ base: "lg", md: "2xl" }} mt={4} pt={3}>
        Your one step solution for{" "}
        <Text
          as={motion.span}
          key={index}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          color="blue.400"
        >
          {rotatingTexts[index]}
        </Text>{" "}
        projects.
      </Text>

      <Text fontSize={{ base: "sm", md: "md" }} pt={4} maxWidth="700px">
        Improve your React/Next abilities in just 10 days by working on
        beginner-friendly example projects, with complete source code.
        <br />
        A moderate understanding of HTML & CSS is necessary for this challenge.
        It is recommended to have a solid understanding of JavaScript before starting the day 1 project. Happy learning! 🎬
      </Text>

      {/* 🎯 Projects Section */}
      <Box mt={20} width="100%" maxWidth="800px">
        <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" mb={5}>
          💻 Featured Projects
        </Text>

        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={6}
          justifyContent="center"
        >
          {projects.map((project, index) => (
            <Box
              key={index}
              bg="gray.900"
              p={5}
              borderRadius="10px"
              boxShadow="lg"
              textAlign="center"
              border="1px solid rgba(255, 255, 255, 0.1)"
              position="relative"
              maxWidth="350px"
              mx="auto"
              cursor="pointer"
              _hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
              transition="all 0.2s ease-in-out"
              onClick={() => handleCardClick(project)}
            >
              {/* Mac-style window buttons */}
              <Box display="flex" gap={2} position="absolute" top={3} left={3}>
                <Box w="10px" h="10px" bg="red.500" borderRadius="full"></Box>
                <Box w="10px" h="10px" bg="yellow.500" borderRadius="full"></Box>
                <Box w="10px" h="10px" bg="green.500" borderRadius="full"></Box>
              </Box>

              <Text fontSize="xl" fontWeight="bold" mt={4}>
                {project.title}
              </Text>
              <Image src={project.images[0]} alt={project.title} borderRadius="8px" mt={3} />
              <Box mt={3} display="flex" flexWrap="wrap" justifyContent="center">
                {project.tags.map((tag, idx) => (
                  <Tag key={idx} colorScheme="blue" m={1} fontSize="sm">
                    {tag}
                  </Tag>
                ))}
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>

      {/* Share Modal */}
      {selectedProject && (
        <Modal isOpen={isOpen} onClose={handleClose} size="xl">
          <ModalOverlay />
          <ModalContent
            bg={colorMode === "light" ? "white" : "gray.800"}
            color={colorMode === "light" ? "gray.800" : "white"}
          >
            <ModalHeader>{selectedProject.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <VStack spacing={4} align="start">
                {/* Project Details */}
                <Text fontSize="md">{selectedProject.description}</Text>
                <Text fontWeight="bold">
                  Difficulty:{" "}
                  <Tag
                    colorScheme={
                      selectedProject.thoughtness === "easy"
                        ? "green"
                        : selectedProject.thoughtness === "medium"
                        ? "yellow"
                        : "red"
                    }
                  >
                    {selectedProject.thoughtness}
                  </Tag>
                </Text>
                <ChakraLink href={selectedProject.github} isExternal color="blue.400">
                  GitHub Repository <ExternalLinkIcon mx="2px" />
                </ChakraLink>

                {/* YouTube Video */}
                <AspectRatio ratio={16 / 9} width="100%">
                  <iframe
                    src={selectedProject.youtube}
                    title={`${selectedProject.title} Demo`}
                    allowFullScreen
                  />
                </AspectRatio>

                {/* Image Slider */}
                <Box width="100%">
                  <Slider {...sliderSettings}>
                    {selectedProject.images.map((img, idx) => (
                      <Box key={idx}>
                        <Image
                          src={img}
                          alt={`${selectedProject.title} - Image ${idx + 1}`}
                          borderRadius="8px"
                          maxH="200px"
                          objectFit="cover"
                          mx="auto"
                        />
                      </Box>
                    ))}
                  </Slider>
                </Box>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default HomePage;