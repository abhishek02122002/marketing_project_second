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
    title: "How to Build Scalable React Apps",
    excerpt: "Learn the best practices for creating React applications that grow with your needs.",
    mediumLink: "https://medium.com/@vitaliykorzenkoua/the-most-difficult-javascript-interview-question-405cdbdd75eb",
    image: "src/pexels-yurii-hlei-1365795.jpg",
  },
  {
    title: "JavaScript Secrets You Didn’t Know",
    excerpt: "Unveiling hidden gems in JavaScript that can supercharge your coding skills.",
    mediumLink: "https://medium.com/@username/javascript-secrets-you-didnt-know-67890",
    image: "src/pexels-yurii-hlei-1365795.jpg", 
  },
  {
    title: "Designing with CSS Grid in 2025",
    excerpt: "A guide to mastering CSS Grid for modern, responsive layouts.",
    mediumLink: "https://medium.com/@username/designing-with-css-grid-in-2025-abcde",
    image: "src/pexels-yurii-hlei-1365795.jpg",
  },
];

const ArticleSection = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      minHeight="100vh"
      bg={colorMode === "light" ? "whitesmoke" : "linear-gradient(to right, black, #222)"}
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
              bg={colorMode === "light" ? "rgba(255, 255, 255, 0.9)" : "rgba(34, 34, 34, 0.9)"}
              backdropFilter="blur(12px) saturate(150%)"
              border="1px solid"
              borderColor={colorMode === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)"}
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
                <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" mb={2}>
                  {article.title}
                </Text>
                <Text fontSize="md" color={colorMode === "light" ? "gray.600" : "gray.300"}>
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

export default ArticleSection;