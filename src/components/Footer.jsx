import { motion } from "framer-motion";
import {
  Box,
  Text,
  Flex,
  VStack,
  HStack,
  Link as ChakraLink,
  useColorMode,
  IconButton,
  useDisclosure,
  Button,
  Avatar,
  Divider,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  useBreakpointValue
} from "@chakra-ui/react";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaRegLightbulb,
  FaLightbulb,
} from "react-icons/fa";
import { SiDevdotto, SiHashnode } from "react-icons/si";
import { useState, useEffect } from "react";

const Footer = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const punchlines = [
    "Turning coffee into code since 2020",
    "Debugging the universe one line at a time",
    "Where ideas meet implementation",
    "Building digital dreams",
    "Code. Create. Repeat.",
  ];

  const [punchlineIndex, setPunchlineIndex] = useState(0);
  const [isHoveringContact, setIsHoveringContact] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPunchlineIndex((prev) => (prev + 1) % punchlines.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      as="footer"
      w="100%"
      bg={colorMode === "light" ? "gray.50" : "gray.900"}
      color={colorMode === "light" ? "gray.800" : "white"}
      pt={10}
      pb={6}
      position="relative"
      overflow="hidden"
    >
      {/* Animated border instead of floating code */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="2px"
        bgGradient="linear(to-r, transparent, blue.400, transparent)"
      >
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(to right, transparent, white, transparent)",
            opacity: 0.7
          }}
        />
      </Box>

      <Box 
        maxW="1200px" 
        mx="auto" 
        px={{ base: 6, md: 10 }}
      >
        <Flex justify="center" mb={8} direction="column" align="center">
          <Text
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="bold"
            textAlign="center"
            mb={2}
          >
            <motion.div
              key={punchlineIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {punchlines[punchlineIndex]}
            </motion.div>
          </Text>
          <Text fontSize="sm" color={colorMode === "light" ? "gray.600" : "gray.400"}>
            Professional solutions for modern development
          </Text>
        </Flex>

        <Grid
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          gap={8}
          mb={8}
        >
          {/* About Section */}
          <Box>
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              About the Creator
            </Text>
            <Flex align="center" mb={4}>
              <Avatar
                name="CodeOps Creator"
                src="public\images\img.jpeg"
                mr={3}
                size="md"
                border={`2px solid ${colorMode === 'light' ? 'blue.500' : 'blue.300'}`}
              />
              <Box>
                <Text fontWeight="medium" fontSize="lg">Abhishek Singh</Text>
                <Text fontSize="sm" opacity={0.7}>
                  Full Stack Developer
                </Text>
              </Box>
            </Flex>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="sm"
                variant="outline"
                colorScheme="blue"
                onClick={onOpen}
                onMouseEnter={() => setIsHoveringContact(true)}
                onMouseLeave={() => setIsHoveringContact(false)}
                borderWidth="2px"
              >
                {isHoveringContact ? "Let's Talk!" : "Contact Me"}
              </Button>
            </motion.div>
          </Box>

          {/* Quick Links */}
          <Box>
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              Explore
            </Text>
            <VStack align="start" spacing={3}>
              {[
                'All Projects',
                'React Challenges', 
                'JavaScript Exercises',
                'Next.js Tutorials',
                'Submit Your Project'
              ].map((link, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <ChakraLink 
                    href="#" 
                    fontSize="sm"
                    fontWeight="500"
                    color={colorMode === 'light' ? 'blue.600' : 'blue.300'}
                  >
                    {link}
                  </ChakraLink>
                </motion.div>
              ))}
            </VStack>
          </Box>

          {/* Social & Newsletter */}
          <Box>
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              Connect
            </Text>
            <HStack spacing={4} mb={4} flexWrap="wrap">
              {[
                { icon: <FaGithub />, label: "GitHub", url: "https://github.com" },
                { icon: <FaTwitter />, label: "Twitter", url: "https://twitter.com" },
                { icon: <FaLinkedin />, label: "LinkedIn", url: "https://linkedin.com" },
                { icon: <FaYoutube />, label: "YouTube", url: "https://youtube.com" },
                { icon: <SiDevdotto />, label: "Dev.to", url: "https://dev.to" },
                { icon: <SiHashnode />, label: "Hashnode", url: "https://hashnode.com" }
              ].map((social, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconButton
                    aria-label={social.label}
                    icon={social.icon}
                    variant="ghost"
                    isRound
                    as="a"
                    href={social.url}
                    target="_blank"
                    fontSize="lg"
                    color={colorMode === 'light' ? 'gray.700' : 'gray.300'}
                    _hover={{
                      color: 'blue.500',
                      bg: colorMode === 'light' ? 'gray.100' : 'gray.700'
                    }}
                  />
                </motion.div>
              ))}
            </HStack>
            <Text fontSize="sm" mb={2} fontWeight="500">
              Subscribe to our newsletter:
            </Text>
            <Flex as="form" onSubmit={(e) => e.preventDefault()}>
              <Input
                placeholder="Your email"
                size="sm"
                mr={2}
                bg={colorMode === "light" ? "white" : "gray.800"}
                borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
                _focus={{
                  borderColor: 'blue.500',
                  boxShadow: `0 0 0 1px ${colorMode === 'light' ? '#3182ce' : '#90cdf4'}`
                }}
                type="email"
                required
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="sm" 
                  colorScheme="blue" 
                  type="submit"
                  px={4}
                >
                  Subscribe
                </Button>
              </motion.div>
            </Flex>
          </Box>
        </Grid>

        <Divider mb={4} borderColor={colorMode === "light" ? "gray.300" : "gray.700"} />
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
        >
          <Text fontSize="sm" mb={{ base: 2, md: 0 }} opacity={0.8}>
            © {new Date().getFullYear()} CodeOps. All rights reserved.
          </Text>
          <HStack spacing={4}>
            <ChakraLink 
              href="/privacy" 
              fontSize="sm"
              fontWeight="500"
              color={colorMode === 'light' ? 'blue.600' : 'blue.300'}
            >
              Privacy Policy
            </ChakraLink>
            <ChakraLink 
              href="/terms" 
              fontSize="sm"
              fontWeight="500"
              color={colorMode === 'light' ? 'blue.600' : 'blue.300'}
            >
              Terms of Service
            </ChakraLink>
            <motion.div whileHover={{ rotate: 20 }}>
              <IconButton
                aria-label="Toggle color mode"
                icon={
                  colorMode === "light" ? <FaRegLightbulb /> : <FaLightbulb />
                }
                onClick={toggleColorMode}
                size="sm"
                variant="ghost"
                color={colorMode === 'light' ? 'gray.700' : 'gray.300'}
                _hover={{
                  color: colorMode === 'light' ? 'yellow.500' : 'yellow.300'
                }}
              />
            </motion.div>
          </HStack>
        </Flex>
      </Box>

      {/* Contact Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay bg="blackAlpha.600" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <ModalContent 
            bg={colorMode === "light" ? "white" : "gray.800"}
            borderWidth="1px"
            borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
          >
            <ModalHeader fontSize="xl">Contact the Creator</ModalHeader>
            <ModalCloseButton size="lg" />
            <ModalBody pb={6}>
              <VStack spacing={4} as="form" onSubmit={(e) => e.preventDefault()}>
                <Input 
                  placeholder="Your Name" 
                  required 
                  focusBorderColor="blue.500"
                  size="lg"
                />
                <Input 
                  placeholder="Your Email" 
                  type="email" 
                  required 
                  focusBorderColor="blue.500"
                  size="lg"
                />
                <Textarea 
                  placeholder="Your Message" 
                  rows={5} 
                  required 
                  focusBorderColor="blue.500"
                  size="lg"
                />
              </VStack>
            </ModalBody>
            <ModalFooter>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button 
                  colorScheme="blue" 
                  mr={3} 
                  type="submit"
                  size="lg"
                  px={6}
                >
                  Send Message
                </Button>
              </motion.div>
              <Button 
                onClick={onClose} 
                variant="outline"
                size="lg"
                _hover={{
                  bg: colorMode === 'light' ? 'gray.100' : 'gray.700'
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </motion.div>
      </Modal>
    </Box>
  );
};

export default Footer;