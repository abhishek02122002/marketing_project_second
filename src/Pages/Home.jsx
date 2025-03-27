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
    "title": "To-Do List App",
    "images": [
      "public/projects-image/todo-Project/to-do-project-second.png",
      "public/projects-image/todo-Project/to-do-project.png",
      "public/projects-image/todo-Project/to-do-project-second.png"
    ],
    "tags": ["#day1", "useState", "eventHandling"],
    "youtube": "https://www.youtube.com/results?search_query=to+do+list+app+using+react+js+",
    "github": "https://github.com/example/todo-app",
    "description": "A simple to-do list app built with React to practice state management and hooks.",
    "thoughtness": "easy"
  },
  {
    "title": "Weather App",
    "images": [
      "public/projects-image/weather-app/weather-one.png",
      "public/projects-image/weather-app/weather-three.png",
      "public/projects-image/weather-app/weather-two.png"
    ],
    "tags": ["#day2", "useEffect", "API"],
    "youtube": "https://www.youtube.com/embed/weather-app",
    "github": "https://github.com/example/weather-app",
    "description": "A weather app that fetches live weather data using an API and displays real-time updates.",
    "thoughtness": "easy"
  },
  {
    "title": "Expense Tracker",
    "images": [
      "public/projects-image/expense-tracker/expense-one.png",
      "public/projects-image/expense-tracker/expense-three.jpg",
      "public/projects-image/expense-tracker/expense-two.png"
    ],
    "tags": ["#day3", "useState", "useContext"],
    "youtube": "https://www.youtube.com/embed/expense-tracker",
    "github": "https://github.com/example/expense-tracker",
    "description": "An app to track daily expenses and manage a budget using React Context API.",
    "thoughtness": "easy"
  },
  {
    "title": "Blog App",
    "images": [
      "public/projects-image/blog-project/blog-one.jpg",
      "public/projects-image/blog-project/blog-second.jpg",
      "public/projects-image/blog-project/blog-three.png"
    ],
    "tags": ["#day4", "React Router", "CRUD"],
    "youtube": "https://www.youtube.com/embed/blog-app",
    "github": "https://github.com/example/blog-app",
    "description": "A simple blog app where users can create, read, update, and delete blog posts.",
    "thoughtness": "medium"
  },
  {
    "title": "E-commerce Product Listing",
    "images": [
      "public/projects-image/ecommerce/ecommerce-one.png",
      "public/projects-image/ecommerce/ecommerce-third.png",
      "public/projects-image/ecommerce/ecommerce-two.png"
    ],
    "tags": ["#day5", "Redux Toolkit", "Filters"],
    "youtube": "https://www.youtube.com/embed/ecommerce",
    "github": "https://github.com/example/ecommerce",
    "description": "A product listing page with filtering, sorting, and state management using Redux Toolkit.",
    "thoughtness": "medium"
  },
  {
    "title": "Movie Search App",
    "images": [
      "public/projects-image/movie-app/movie-one.jpg",
      "public/projects-image/movie-app/movie-third.avif",
      "public/projects-image/movie-app/movie-second.webp"
    ],
    "tags": ["#day6", "API Integration", "Pagination"],
    "youtube": "https://www.youtube.com/embed/movie-search",
    "github": "https://github.com/example/movie-search",
    "description": "A movie search app that fetches data from TMDB API and displays search results with pagination.",
    "thoughtness": "medium"
  },
  {
    "title": "Real-Time Chat App",
    "images": [
      "public/projects-image/chat-project/chat-one.jpg",
    "public/projects-image/chat-project/chat-two.jpg",
     "public/projects-image/chat-project/chat-three.png",
    ],
    "tags": ["#day7", "Firebase", "Authentication"],
    "youtube": "https://www.youtube.com/embed/chat-app",
    "github": "https://github.com/example/chat-app",
    "description": "A real-time chat application using Firebase for authentication and Firestore for real-time messaging.",
    "thoughtness": "advanced"
  },
  {
    "title": "Next.js Blog with MDX",
    "images": [
      "public/projects-image/next-project/next-one.png",
      "public/projects-image/next-project/next-three.jpg",
      "public/projects-image/next-project/next-two.jpg"
    ],
    "tags": ["#day8", "Next.js", "Markdown"],
    "youtube": "https://www.youtube.com/embed/nextjs-blog",
    "github": "https://github.com/example/nextjs-blog",
    "description": "A blog app built with Next.js that supports MDX for writing blog posts with markdown.",
    "thoughtness": "advanced"
  },
  {
    "title": "Full-Stack Job Portal",
    "images": [
      "public/projects-image/job-project/job-one.jpg",
      "public/projects-image/job-project/job-three.jpg",
      "public/projects-image/job-project/job-two.avif"
    ],
    "tags": ["#day9", "Next.js", "MongoDB", "JWT"],
    "youtube": "https://www.youtube.com/embed/job-portal",
    "github": "https://github.com/example/job-portal",
    "description": "A full-stack job portal where users can post and apply for jobs, with authentication using JWT.",
    "thoughtness": "advanced"
  },
  {
    "title": "SaaS Dashboard",
    "images": [
      "public/projects-image/dashbaord-app/dashbaord-one.png",
      "public/projects-image/dashbaord-app/dashbaord-three.jpg",
      "public/projects-image/dashbaord-app/dashbaord-two.png"
    ],
    "tags": ["#day10", "Next.js", "Redux", "Chart.js"],
    "youtube": "https://www.youtube.com/embed/saas-dashboard",
    "github": "https://github.com/example/saas-dashboard",
    "description": "A SaaS analytics dashboard with charts, authentication, and API data integration.",
    "thoughtness": "advanced"
  }
]

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