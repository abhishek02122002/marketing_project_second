import { 
  Box, 
  Text, 
  VStack, 
  HStack, 
  Image, 
  Icon, 
  Link, 
  Flex, 
  useColorMode, 
  Button, 
  Avatar,
  Tag,
  TagLabel,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Grid,
  GridItem,
  useToast,
  Center,
  IconButton
} from "@chakra-ui/react";
import { FaYoutube, FaLinkedin, FaInstagram, FaTwitter, FaHeart, FaRegHeart, FaShare, FaTimes } from "react-icons/fa";
import {  AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const creatorData = {
  name: "Abhishek Singh",
  role: "Web Developer & Educator",
  bio: "Passionate about building digital experiences and teaching others.",
  stats: {
    followers: "1.5K",
    projects: "6",
    experience: "1+ years"
  },
  social: {
    youtube: "https://youtube.com/@AbhishekSingh0212",
    linkedin: "https://linkedin.com/in/abhishekkumarsingh17",
    twitter: "https://twitter.com/Abhishek021217",
    instagram: "https://instagram.com/abhisheksingh170212"
  },
  cover: "public/blog-images/blog-img-second.png",
  images: [
    "public/images/img.jpeg",
    "public/images/img2.jpeg",
    "public/images/img3.jpeg",
    "public/images/img4.jpeg",
    "public/images/img5.jpeg",
    "public/images/img6.jpeg"
  ]
};

const DraggableImage = ({ image, index, moveImage }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'IMAGE',
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'IMAGE',
    hover: (item) => {
      if (item.index !== index) {
        moveImage(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <Box
      ref={(node) => drag(drop(node))}
      opacity={isDragging ? 0.6 : 1}
      cursor="grab"
      borderRadius="md"
      overflow="hidden"
      boxShadow="md"
      _hover={{ transform: "scale(1.02)" }}
      transition="transform 0.2s, opacity 0.2s"
    >
      <Image 
        src={image} 
        alt={`Creator image ${index + 1}`}
        objectFit="cover"
        w="full"
        h="200px"
      />
    </Box>
  );
};

const ImageGalleryModal = ({ isOpen, onClose, images: initialImages }) => {
  const [images, setImages] = useState(initialImages);
  const toast = useToast();

  const moveImage = (fromIndex, toIndex) => {
    const newImages = [...images];
    const [removed] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, removed);
    setImages(newImages);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
      <ModalOverlay />
      <ModalContent minH="80vh">
        <ModalHeader>
          <Flex justify="space-between" align="center">
            <Text>Image Gallery</Text>
            <IconButton 
              icon={<FaTimes />} 
              onClick={onClose}
              variant="ghost"
              aria-label="Close gallery"
            />
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap={4}>
            {images.map((img, idx) => (
              <GridItem key={`${img}-${idx}`}>
                <DraggableImage 
                  image={img} 
                  index={idx} 
                  moveImage={moveImage} 
                />
              </GridItem>
            ))}
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button 
            colorScheme="blue" 
            onClick={() => {
              onClose();
              toast({
                title: "Changes Saved",
                status: "success",
                duration: 2000,
                isClosable: true,
              });
            }}
          >
            Save Arrangement
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const CreatorProfile = () => {
  const { colorMode } = useColorMode();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { isOpen: isGalleryOpen, onOpen: openGallery, onClose: closeGallery } = useDisclosure();

  // Control the animation direction (0 = left, 1 = right, 2 = up, 3 = down)
  const animationDirection = 0; 

  const getAnimationProps = () => {
    switch(animationDirection) {
      case 0: // Left
        return {
          initial: { x: -50, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: 50, opacity: 0 }
        };
      case 1: // Right
        return {
          initial: { x: 50, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: -50, opacity: 0 }
        };
      case 2: // Up
        return {
          initial: { y: -50, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: 50, opacity: 0 }
        };
      case 3: // Down
        return {
          initial: { y: 50, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: -50, opacity: 0 }
        };
      default: // Default (fade)
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        };
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % creatorData.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    { icon: FaYoutube, url: creatorData.social.youtube, color: "red.500", name: "YouTube" },
    { icon: FaLinkedin, url: creatorData.social.linkedin, color: "blue.600", name: "LinkedIn" },
    { icon: FaTwitter, url: creatorData.social.twitter, color: "blue.400", name: "Twitter" },
    { icon: FaInstagram, url: creatorData.social.instagram, color: "pink.500", name: "Instagram" }
  ];

  return (
    <Box minH="100vh" bg={colorMode === "light" ? "gray.50" : "gray.900"} p={4}>
      <Center>
        <Box 
          maxW="xl" 
          w="full" 
          bg={colorMode === "light" ? "white" : "gray.800"} 
          borderRadius="2xl" 
          overflow="hidden"
          boxShadow="2xl"
        >
          {/* Static Cover Image */}
          <Box h="200px" position="relative" overflow="hidden">
            <Image
              src={creatorData.cover}
              alt="Profile cover"
              w="full"
              h="full"
              objectFit="cover"
              fallbackSrc="https://via.placeholder.com/1200x400"
            />
          </Box>

          {/* Profile Content */}
          <Box px={6} pb={6} position="relative">
            {/* Animated Avatar - Only this part moves */}
            <Box position="absolute" top="-16" left="6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  {...getAnimationProps()}
                  transition={{ duration: 0.5 }}
                  onClick={openGallery}
                  style={{ cursor: 'pointer' }}
                >
                  <Avatar
                    src={creatorData.images[currentImageIndex]}
                    name={creatorData.name}
                    size="2xl"
                    borderWidth="4px"
                    borderColor={colorMode === "light" ? "white" : "gray.800"}
                    boxShadow="lg"
                  />
                </motion.div>
              </AnimatePresence>
            </Box>

            {/* Static Profile Info */}
            <Box pt={20}>
              <Flex justify="space-between" align="center" mb={2}>
                <Box>
                  <Text fontSize="2xl" fontWeight="bold">{creatorData.name}</Text>
                  <Text color={colorMode === "light" ? "gray.600" : "gray.400"}>{creatorData.role}</Text>
                </Box>
                <Button 
                  leftIcon={isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
                  variant="outline"
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  {isLiked ? "Liked" : "Like"}
                </Button>
              </Flex>

              <Text my={4} color={colorMode === "light" ? "gray.700" : "gray.300"}>
                {creatorData.bio}
              </Text>

              <HStack spacing={3} mb={6} flexWrap="wrap">
                {Object.entries(creatorData.stats).map(([key, value]) => (
                  <Tag 
                    key={key} 
                    colorScheme="blue" 
                    borderRadius="full"
                    size="lg"
                    variant={colorMode === "light" ? "subtle" : "solid"}
                  >
                    <TagLabel fontWeight="bold">{value} {key}</TagLabel>
                  </Tag>
                ))}
              </HStack>

              <Flex justify="space-between" align="center">
                <HStack spacing={4}>
                  {socialLinks.map((social, index) => (
                    <Link 
                      key={index} 
                      href={social.url} 
                      isExternal
                      _hover={{ transform: "translateY(-2px)", color: social.color }}
                      transition="all 0.2s"
                      aria-label={social.name}
                    >
                      <Icon as={social.icon} w={6} h={6} />
                    </Link>
                  ))}
                </HStack>
                <Button 
                  leftIcon={<FaShare />} 
                  variant="ghost" 
                  size="sm"
                >
                  Share
                </Button>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Center>

      <DndProvider backend={HTML5Backend}>
        <ImageGalleryModal 
          isOpen={isGalleryOpen} 
          onClose={closeGallery} 
          images={creatorData.images} 
        />
      </DndProvider>
    </Box>
  );
};

export default CreatorProfile;