import {
  Box,
  Text,
  VStack,
  Image,
  useColorMode,
  Link as ChakraLink,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { FaYoutube, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";
import { useEffect, useState } from "react";

// Creator data
const creatorData = {
  name: "Abhishek Singh", // Replace with actual creator name
  images: [
    "public/images/img.jpeg",
    "public/images/img2.jpeg",
    "public/images/img3.jpeg",
    "public/images/img6.jpeg",
    "public/images/img4.jpeg",
    "public/images/img5.jpeg",
  ], // Replace with actual image URLs
  youtube: "https://www.youtube.com/@AbhishekSingh0212",
  linkedin: "https://www.linkedin.com/in/abhishekkumarsingh17/",
  instagram: "https://www.instagram.com/abhisheksingh170212/?igsh=MTU3dHBuM2ZtYWZwMA%3D%3D#",
  twitter: "https://x.com/Abhishek021217?t=Tbg-v3gWP21fpTrN1HAlRA&s=08",
  words:
    "Hey there! I'm passionate about coding, teaching, and building cool projects. Through CodeOps, I aim to inspire and empower beginners to dive into the world of web development with confidence. Let's create, learn, and grow together!",
};

const Creator = () => {
  const { colorMode } = useColorMode();

  // Stack animation state
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % creatorData.images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      minHeight="100vh"
      bg={colorMode === "light" ? "whitesmoke" : "linear-gradient(to right, black, #222)"}
      color={colorMode === "light" ? "gray.800" : "white"}
      position="relative"
      overflow="hidden"
      p={{ base: 5, md: 10 }}
      transition="background 0.3s ease-in-out"
    >
      {/* Grid Background */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        bgImage="radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)"
        bgSize="20px 20px"
        opacity={colorMode === "light" ? 0.5 : 0.3}
        zIndex="0"
      />

      {/* Main Content */}
      <VStack
        spacing={{ base: 8, md: 12 }}
        align="center"
        justify="center"
        minHeight="100vh"
        position="relative"
        zIndex="1"
      >
        {/* Creator Name */}
        <Text
          fontSize={{ base: "3xl", md: "5xl" }}
          fontWeight="bold"
          textAlign="center"
          bgGradient="linear(to-r, blue.400, purple.500)"
          bgClip="text"
        >
          Meet {creatorData.name}
        </Text>

        {/* Image Stack */}
        <Box position="relative" width={{ base: "250px", md: "350px" }} height={{ base: "300px", md: "400px" }}>
          {creatorData.images.map((img, idx) => (
            <Image
              key={idx}
              src={img}
              alt={`${creatorData.name} - Image ${idx + 1}`}
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              objectFit="cover"
              borderRadius="15px"
              boxShadow="0 8px 20px rgba(0, 0, 0, 0.2)"
              transform={
                idx === currentImage
                  ? "translateY(0) scale(1)"
                  : idx < currentImage
                  ? "translateY(-20px) scale(0.9)"
                  : "translateY(20px) scale(0.9)"
              }
              opacity={idx === currentImage ? 1 : 0.7}
              transition="transform 0.5s ease-in-out, opacity 0.5s ease-in-out"
              zIndex={idx === currentImage ? 3 : 2 - Math.abs(currentImage - idx)}
            />
          ))}
        </Box>

        {/* Social Media Links */}
        <Flex gap={6} justify="center" wrap="wrap">
          <ChakraLink href={creatorData.youtube} isExternal _hover={{ color: "red.500" }}>
            <Icon as={FaYoutube} boxSize={8} />
          </ChakraLink>
          <ChakraLink href={creatorData.linkedin} isExternal _hover={{ color: "blue.500" }}>
            <Icon as={FaLinkedin} boxSize={8} />
          </ChakraLink>
          <ChakraLink href={creatorData.instagram} isExternal _hover={{ color: "pink.500" }}>
            <Icon as={FaInstagram} boxSize={8} />
          </ChakraLink>
          <ChakraLink href={creatorData.twitter} isExternal _hover={{ color: "blue.400" }}>
            <Icon as={FaTwitter} boxSize={8} />
          </ChakraLink>
        </Flex>

        {/* Words from Creator */}
        <Box
          bg={colorMode === "light" ? "rgba(255, 255, 255, 0.8)" : "rgba(34, 34, 34, 0.8)"}
          backdropFilter="blur(12px) saturate(150%)"
          border="1px solid"
          borderColor={colorMode === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)"}
          boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
          p={{ base: 4, md: 6 }}
          borderRadius="15px"
          maxWidth="700px"
          textAlign="center"
          transition="all 0.3s ease-in-out"
        >
          <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" mb={4}>
            Words from {creatorData.name}
          </Text>
          <Text fontSize={{ base: "md", md: "lg" }}>
            {creatorData.words}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default Creator;