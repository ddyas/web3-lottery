import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bg="gray.900"
      color="white"
    >
      <Heading
        mb={4}
        fontSize="6xl"
        bgGradient="linear(to-r, #4F46E5, #EC4899)"
        bgClip="text"
      >
        404
      </Heading>
      <Text fontSize="xl" mb={8}>
        Page Not Found
      </Text>
      <Button
        onClick={() => router.push('/')}
        bg="rgba(79, 70, 229, 0.3)"
        border="1px solid"
        borderColor="#4F46E5"
        _hover={{
          bg: "rgba(79, 70, 229, 0.4)",
        }}
      >
        Return Home
      </Button>
    </Box>
  );
}
