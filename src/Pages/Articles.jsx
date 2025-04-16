import {
  Box,
  Text,
  VStack,
  Image,
  useColorMode,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

// Articles with Medium links and custom images
const articles = [
  {
    title: "10 JavaScript Tricks Only Advanced Developers Know About",
    excerpt:
      "JavaScript, a dynamic and versatile language, offers a treasure trove of features often overlooked by beginners and intermediate developers. Advanced developers, however, know how to harness these hidden gems to write elegant, efficient, and powerful code. In this article, we’ll uncover 10 JavaScript tricks that can elevate your coding game.",
    mediumLink:
      "https://medium.com/@vitaliykorzenkoua/the-most-difficult-javascript-interview-question-405cdbdd75eb",
    image: "public/blog-images/blog-img.png",
  },
  {
    title: "Five things vibe coders should know (from a software engineer)",
    excerpt:
      "And it underlines a bit of a problem with vibe coding; people are unaware that the code they’re generating and the apps they’re deploying might be leaving them open to vulnerabilities.",
    mediumLink:
      "https://medium.com/user-experience-design-1/five-things-vibe-coders-should-know-from-a-software-engineer-b2adb410a2c6",
    image: "public/blog-images/blog-img-third.png",
  },
  {
    title: "Building an AI-Powered Football Commentator",
    excerpt: "Generate commentary audio using OpenAI, ElevenLabs and open-source football data",
    mediumLink:
      "https://medium.com/better-programming/building-an-ai-powered-football-commentator-6dbff5af9a88",
    image:  "public/blog-images/blog-img-second.png",
  },
];

const Articles = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      minHeight="100vh"
      bg={
        colorMode === "light"
          ? "whitesmoke"
          : "linear-gradient(to right, black, #222)"
      }
      color={colorMode === "light" ? "gray.800" : "white"}
      p={{ base: 4, md: 8 }}
      transition="background 0.3s ease-in-out"
    >
      {/* Header */}
      <Text
        fontSize={{ base: "2xl", md: "4xl" }}
        fontWeight="bold"
        mb={8}
        textAlign="center"
        bgGradient="linear(to-r, blue.400, purple.500)"
        bgClip="text"
      >
        Explore Articles
      </Text>

      {/* Articles */}
      <VStack spacing={6} align="stretch">
        {articles.map((article, idx) => (
          <ChakraLink
            key={idx}
            href={article.mediumLink}
            isExternal
            _hover={{ textDecoration: "none" }}
          >
            <Box
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              bg={
                colorMode === "light"
                  ? "rgba(255, 255, 255, 0.9)"
                  : "rgba(34, 34, 34, 0.9)"
              }
              backdropFilter="blur(12px) saturate(150%)"
              border="1px solid"
              borderColor={
                colorMode === "light"
                  ? "rgba(0, 0, 0, 0.1)"
                  : "rgba(255, 255, 255, 0.1)"
              }
              borderRadius="10px"
              boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)"
              p={4}
              width="100%"
              display="flex"
              flexDirection={{ base: "column", md: "row" }}
              alignItems="center"
              gap={4}
              _hover={{
                transform: "translateY(-5px)",
                boxShadow: "0 6px 25px rgba(0, 0, 0, 0.15)",
              }}
            >
              {/* Image */}
              <Image
                src={article.image}
                alt={article.title}
                width={{ base: "100%", md: "200px" }}
                height="150px"
                objectFit="cover"
                borderRadius="8px"
              />

              {/* Content */}
              <Box flex="1" textAlign={{ base: "center", md: "left" }}>
                <Text
                  fontSize={{ base: "lg", md: "xl" }}
                  fontWeight="bold"
                  mb={2}
                >
                  {article.title}
                </Text>
                <Text
                  fontSize="md"
                  color={colorMode === "light" ? "gray.600" : "gray.300"}
                >
                  {article.excerpt}
                </Text>
              </Box>
            </Box>
          </ChakraLink>
        ))}
      </VStack>
    </Box>
  );
};

export default Articles;
