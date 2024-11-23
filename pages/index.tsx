import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Spinner,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
  Image,
} from '@chakra-ui/react';
import JSConfetti from 'js-confetti';

// Network configurations with logo paths
const NETWORKS = {
  ethereum: {
    name: 'Ethereum',
    logo: (
      <svg width="20" height="20" viewBox="0 0 784 784" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M392 0L385.76 21.16V536.64L392 542.86L632.96 400.19L392 0Z" fill="#C1CCF7"/>
        <path d="M392 0L151.04 400.19L392 542.86V290.47V0Z" fill="white"/>
        <path d="M392 588.53L388.67 592.6V776.95L392 784L633.07 445.86L392 588.53Z" fill="#C1CCF7"/>
        <path d="M392 784V588.53L151.04 445.86L392 784Z" fill="white"/>
        <path d="M392 542.86L632.96 400.19L392 290.47V542.86Z" fill="#8198EE"/>
        <path d="M151.04 400.19L392 542.86V290.47L151.04 400.19Z" fill="#C1CCF7"/>
      </svg>
    ),
    tokens: ['ETH', 'USDT'],
    nativeToken: 'ETH'
  },
  arbitrum: {
    name: 'Arbitrum One',
    logo: (
      <svg width="20" height="20" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M150 0C67.1573 0 0 67.1573 0 150C0 232.843 67.1573 300 150 300C232.843 300 300 232.843 300 150C300 67.1573 232.843 0 150 0ZM150.5 240C99.9 240 59 199.1 59 148.5C59 97.9 99.9 57 150.5 57C201.1 57 242 97.9 242 148.5C242 199.1 201.1 240 150.5 240ZM150.5 86C116.1 86 88 114.1 88 148.5C88 182.9 116.1 211 150.5 211C184.9 211 213 182.9 213 148.5C213 114.1 184.9 86 150.5 86Z" fill="white"/>
      </svg>
    ),
    tokens: ['ETH', 'USDT'],
    nativeToken: 'ETH'
  },
  optimism: {
    name: 'Optimism',
    logo: (
      <svg width="20" height="20" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M250 0C111.929 0 0 111.929 0 250C0 388.071 111.929 500 250 500C388.071 500 500 388.071 500 250C500 111.929 388.071 0 250 0ZM250 450C139.543 450 50 360.457 50 250C50 139.543 139.543 50 250 50C360.457 50 450 139.543 450 250C450 360.457 360.457 450 250 450Z" fill="#FF0420"/>
        <circle cx="250" cy="250" r="150" fill="#FF0420"/>
      </svg>
    ),
    tokens: ['ETH', 'USDT'],
    nativeToken: 'ETH'
  },
  polygon: {
    name: 'Polygon',
    logo: (
      <svg width="20" height="20" viewBox="0 0 38 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28.5 0L38 5.5V22L28.5 27.5L19 33L9.5 27.5L0 22V5.5L9.5 0L19 5.5L28.5 0Z" fill="#8247E5"/>
        <path d="M19 5.5V22L9.5 27.5V11L19 5.5Z" fill="white"/>
        <path d="M19 5.5L28.5 11V27.5L19 22V5.5Z" fill="white"/>
      </svg>
    ),
    tokens: ['ETH', 'USDT'],
    nativeToken: 'ETH'
  }
};

// Token configurations
const TOKENS = {
  ETH: {
    name: 'ETH',
    logo: (
      <svg width="20" height="20" viewBox="0 0 784 784" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M392 0L385.76 21.16V536.64L392 542.86L632.96 400.19L392 0Z" fill="#62A2EF"/>
        <path d="M392 0L151.04 400.19L392 542.86V290.47V0Z" fill="#96C1F7"/>
        <path d="M392 588.53L388.67 592.6V776.95L392 784L633.07 445.86L392 588.53Z" fill="#62A2EF"/>
        <path d="M392 784V588.53L151.04 445.86L392 784Z" fill="#96C1F7"/>
        <path d="M392 542.86L632.96 400.19L392 290.47V542.86Z" fill="#3480EA"/>
        <path d="M151.04 400.19L392 542.86V290.47L151.04 400.19Z" fill="#62A2EF"/>
      </svg>
    ),
  },
  USDT: {
    name: 'USDT',
    logo: (
      <svg width="20" height="20" viewBox="0 0 2000 2000" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1000,0c552.26,0,1000,447.74,1000,1000S1552.24,2000,1000,2000,0,1552.26,0,1000,447.76,0,1000,0" fill="#53ae94"/>
        <path d="M1123.42,866.76V718H1463.6V491.34H537.28V718H877.5V866.64C601,879.34,393.1,934.1,393.1,999.7s208,120.36,484.4,133.14v476.5h246V1132.8c276-12.74,483.48-67.46,483.48-133s-207.48-120.26-483.48-133m0,225.64v-0.12c-6.94.44-42.6,2.58-122,2.58-63.48,0-108.14-1.8-123.88-2.62v0.2C633.34,1081.66,451,1039.12,451,988.22S633.36,894.84,877.62,884V1050.1c16,1.1,61.76,3.8,124.92,3.8,75.86,0,114-3.16,121-3.8V884c243.8,10.86,425.72,53.44,425.72,104.16s-182,93.32-425.72,104.18" fill="#ffffff"/>
      </svg>
    ),
  }
};

// Wallet configurations
const WALLETS = {
  metamask: {
    name: 'MetaMask',
    logo: (
      <svg width="32" height="32" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32.9582 1L19.8241 10.7183L22.2665 4.99099L32.9582 1Z" fill="#E17726" stroke="#E17726" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2.65179 1L15.6802 10.809L13.3434 4.99098L2.65179 1Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M28.2031 23.5335L24.7195 28.8874L32.2769 30.9463L34.4385 23.6501L28.2031 23.5335Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1.17432 23.6501L3.32266 30.9463L10.8801 28.8874L7.40961 23.5335L1.17432 23.6501Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.4704 14.5149L8.39185 17.6507L15.8612 17.9897L15.6083 10.0132L10.4704 14.5149Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M25.1395 14.5149L19.9177 9.92285L19.8239 17.9898L27.2932 17.6508L25.1395 14.5149Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: 'Popular browser extension',
  },
  walletconnect: {
    name: 'WalletConnect',
    logo: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.56818 11.193C13.0682 6.69297 20.3864 6.69297 24.8864 11.193L25.4545 11.7611C25.6932 12 25.6932 12.3573 25.4545 12.5962L23.5909 14.4598C23.4716 14.5791 23.2727 14.5791 23.1534 14.4598L22.3864 13.6928C19.2045 10.5109 14.25 10.5109 11.0682 13.6928L10.25 14.5109C10.1307 14.6302 9.93182 14.6302 9.81251 14.5109L7.94887 12.6473C7.71023 12.4084 7.71023 12.0511 7.94887 11.8122L8.56818 11.193ZM28.9545 15.2611L30.5909 16.8975C30.8295 17.1364 30.8295 17.4937 30.5909 17.7326L22.7727 25.5508C22.5341 25.7897 22.1768 25.7897 21.9379 25.5508L16.4545 20.0675C16.3955 20.0084 16.2955 20.0084 16.2364 20.0675L10.7528 25.5508C10.5142 25.7897 10.1569 25.7897 9.91796 25.5508L2.09091 17.7237C1.85227 17.4848 1.85227 17.1275 2.09091 16.8886L3.72728 15.2522C3.96591 15.0133 4.32319 15.0133 4.56205 15.2522L10.0455 20.7357C10.1046 20.7948 10.2046 20.7948 10.2637 20.7357L15.7472 15.2522C15.9858 15.0133 16.3431 15.0133 16.582 15.2522L22.0654 20.7357C22.1245 20.7948 22.2245 20.7948 22.2836 20.7357L27.7671 15.2522C28.0057 15.0133 28.363 15.0133 28.6019 15.2522L28.9545 15.2611Z" fill="#3B99FC"/>
      </svg>
    ),
    description: 'Connect with mobile wallet',
  },
  coinbase: {
    name: 'Coinbase Wallet',
    logo: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="16" fill="#2C5FF6"/>
        <path d="M16 6C10.5 6 6 10.5 6 16C6 21.5 10.5 26 16 26C21.5 26 26 21.5 26 16C26 10.5 21.5 6 16 6ZM16 19.5C14.1 19.5 12.5 17.9 12.5 16C12.5 14.1 14.1 12.5 16 12.5C17.9 12.5 19.5 14.1 19.5 16C19.5 17.9 17.9 19.5 16 19.5Z" fill="white"/>
      </svg>
    ),
    description: 'Use Coinbase Wallet app',
  },
};

// Custom Select Option component for network selection
const NetworkOption = ({ network, value }: { network: any, value: string }) => (
  <option 
    style={{
      background: "#1A202C",
      padding: "8px",
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }} 
    value={value}
  >
    {network.name}
  </option>
);

export default function Home() {
  const [selectedNetwork, setSelectedNetwork] = useState<string>('arbitrum');
  const [selectedToken, setSelectedToken] = useState<string>('ETH');
  const [ticketCount, setTicketCount] = useState<number>(0);
  const [currentPot, setCurrentPot] = useState<number>(1.5);
  const [ethPrice, setEthPrice] = useState<number>(0);
  const [isLoadingPrices, setIsLoadingPrices] = useState(true);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [confetti, setConfetti] = useState<any>(null);

  // Initialize confetti after component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setConfetti(new JSConfetti());
    }
  }, []);

  const handleConfetti = () => {
    if (confetti) {
      confetti.addConfetti({
        confettiNumber: 300,
        confettiColors: [
          '#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7',
        ],
      });
    }
  };

  // Remove any previous confetti effects
  useEffect(() => {
    return () => {
      if (confetti) {
        confetti.clearCanvas();
      }
    };
  }, [confetti]);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const statBg = useColorModeValue('blue.50', 'blue.900');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const headingGradient = 'linear(to-r, teal.400, blue.500)';

  // Fetch ETH price
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await response.json();
        setEthPrice(data.ethereum.usd);
        setIsLoadingPrices(false);
      } catch (error) {
        console.error('Error fetching prices:', error);
        toast({
          title: 'Error fetching prices',
          status: 'error',
          duration: 3000,
        });
        setIsLoadingPrices(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  // Trigger confetti occasionally
  useEffect(() => {
    const triggerConfetti = () => {
      if (confetti) {
        confetti.addConfetti({
          confettiColors: ['#4F46E5', '#06B6D4', '#3B82F6', '#EC4899', '#8B5CF6'],
          confettiRadius: 6,
          confettiNumber: 50,
        });
      }
    };

    const interval = setInterval(triggerConfetti, 15000); // Every 15 seconds
    triggerConfetti(); // Initial confetti

    return () => clearInterval(interval);
  }, [confetti]);

  const calculateCost = () => {
    const ticketPriceUSD = 0.10;
    const totalCostUSD = ticketPriceUSD * ticketCount;
    
    if (selectedToken === 'USDT') {
      return totalCostUSD;
    } else {
      const ethCost = ethPrice ? totalCostUSD / ethPrice : 0;
      return ethCost;
    }
  };

  // Calculate current pot in selected currency
  const getCurrentPot = () => {
    if (selectedToken === 'USDT') {
      return (currentPot * ethPrice).toFixed(2);
    }
    return currentPot.toFixed(8);
  };

  // Format the current pot with the selected currency
  const formattedCurrentPot = `${getCurrentPot()} ${selectedToken}`;

  return (
    <Box 
      position="relative" 
      minH="100vh" 
      overflow="hidden"
      bgGradient="linear(to-b, gray.900, gray.800)"
      css={{
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(79, 70, 229, 0.15) 0%, transparent 50%), radial-gradient(circle at 100% 0%, rgba(236, 72, 153, 0.1) 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
          animation: 'gradient 15s ease infinite',
          zIndex: 0,
        },
        '@keyframes gradient': {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: '0% 50%',
          },
        },
      }}
    >
      {/* BLOTTERY Heading - Now in top left */}
      <Box position="absolute" top={4} left={6} zIndex={2}>
        <Heading
          as="h1"
          bgGradient="linear(to-r, #4F46E5, #EC4899, #06B6D4)"
          bgClip="text"
          letterSpacing="widest"
          textTransform="uppercase"
          fontWeight="black"
          fontSize={{ base: "3xl", md: "4xl" }}
          position="relative"
          textShadow="0 0 20px rgba(79, 70, 229, 0.3)"
          _after={{
            content: '""',
            position: 'absolute',
            bottom: '-4px',
            left: '0',
            width: '60px',
            height: '2px',
            background: 'linear-gradient(to right, #4F46E5, #EC4899)',
            borderRadius: 'full',
            boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)'
          }}
          _before={{
            content: '"β"',
            position: 'absolute',
            top: '-8px',
            right: '-20px',
            fontSize: '16px',
            color: '#EC4899',
            fontWeight: 'bold',
            textShadow: '0 0 10px rgba(236, 72, 153, 0.5)'
          }}
          css={{
            animation: 'glow 3s ease-in-out infinite alternate',
            '@keyframes glow': {
              '0%': {
                textShadow: '0 0 20px rgba(79, 70, 229, 0.3)',
              },
              '100%': {
                textShadow: '0 0 30px rgba(236, 72, 153, 0.5), 0 0 40px rgba(6, 182, 212, 0.3)',
              },
            },
          }}
        >
          BLOTTERY
        </Heading>
      </Box>

      {/* Connect Wallet Button */}
      <Box position="absolute" top={4} right={4} zIndex={2}>
        <Button
          onClick={() => {
            handleConfetti();
            onOpen();
          }}
          size="md"
          px={6}
          bg="rgba(236, 72, 153, 0.3)"
          _hover={{
            bg: "rgba(236, 72, 153, 0.4)",
          }}
          backdropFilter="blur(8px)"
          border="1px solid rgba(236, 72, 153, 0.4)"
          leftIcon={<Icon viewBox="0 0 24 24" boxSize="18px">
            <path fill="currentColor" d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
          </Icon>}
          color="white"
          fontWeight="semibold"
        >
          Connect Wallet
        </Button>
      </Box>

      <Container maxW="container.xl" position="relative" zIndex={1} py={6}>
        <VStack spacing={6}>
          {/* Current Pot Section */}
          <Box
            position="relative"
            p={6}
            rounded="2xl"
            bg="rgba(13, 16, 25, 0.8)"
            borderWidth="1px"
            borderColor="rgba(255, 255, 255, 0.1)"
            backdropFilter="blur(10px)"
            mt={16}
            maxW="container.md"
            w="full"
            _before={{
              content: '""',
              position: 'absolute',
              top: '-2px',
              left: '-2px',
              right: '-2px',
              bottom: '-2px',
              background: 'linear-gradient(45deg, #4F46E5, #EC4899, #06B6D4)',
              zIndex: -1,
              borderRadius: '1rem',
              filter: 'blur(8px)',
              opacity: 0.5,
              animation: 'borderGlow 3s ease-in-out infinite alternate'
            }}
            css={{
              '@keyframes borderGlow': {
                '0%': {
                  opacity: 0.3,
                  filter: 'blur(8px)',
                },
                '100%': {
                  opacity: 0.7,
                  filter: 'blur(12px)',
                },
              },
            }}
          >
            <VStack spacing={1}>
              <Text 
                fontSize="lg" 
                color="whiteAlpha.700"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                Current Pot
              </Text>
              <Text 
                fontSize={{ base: "3xl", md: "5xl" }}
                fontWeight="black"
                bgGradient="linear(to-r, #4F46E5, #EC4899, #06B6D4)"
                bgClip="text"
                textShadow="0 0 20px rgba(79, 70, 229, 0.5)"
                css={{
                  animation: 'potGlow 3s ease-in-out infinite alternate',
                  '@keyframes potGlow': {
                    '0%': {
                      textShadow: '0 0 20px rgba(79, 70, 229, 0.3)',
                    },
                    '100%': {
                      textShadow: '0 0 40px rgba(236, 72, 153, 0.5), 0 0 80px rgba(6, 182, 212, 0.3)',
                    },
                  },
                }}
              >
                {isLoadingPrices ? (
                  <Spinner size="sm" />
                ) : (
                  formattedCurrentPot
                )}
              </Text>
              <Box position="relative">
                <Text 
                  color="whiteAlpha.900"
                  fontSize="xs"
                  textTransform="uppercase"
                  letterSpacing="widest"
                  position="relative"
                  _before={{
                    content: '""',
                    position: 'absolute',
                    left: '-20px',
                    top: '50%',
                    width: '8px',
                    height: '8px',
                    borderRadius: 'full',
                    bg: '#22c55e',
                    transform: 'translateY(-50%)',
                    boxShadow: '0 0 10px #22c55e',
                    animation: 'pulse 2s ease-in-out infinite'
                  }}
                  _after={{
                    content: '""',
                    position: 'absolute',
                    right: '-20px',
                    top: '50%',
                    width: '8px',
                    height: '8px',
                    borderRadius: 'full',
                    bg: '#22c55e',
                    transform: 'translateY(-50%)',
                    boxShadow: '0 0 10px #22c55e',
                    animation: 'pulse 2s ease-in-out infinite'
                  }}
                  css={{
                    '@keyframes pulse': {
                      '0%': {
                        opacity: 0.5,
                        transform: 'translateY(-50%) scale(1)',
                      },
                      '50%': {
                        opacity: 1,
                        transform: 'translateY(-50%) scale(1.2)',
                      },
                      '100%': {
                        opacity: 0.5,
                        transform: 'translateY(-50%) scale(1)',
                      },
                    },
                  }}
                >
                  Next draw in 23:45:12
                </Text>
              </Box>
            </VStack>
          </Box>

          {/* Stats Section - Made more compact */}
          <Grid templateColumns="repeat(2, 1fr)" gap={4} maxW="container.md" w="full">
            <GridItem>
              <Stat
                bg="rgba(255, 255, 255, 0.03)"
                p={4}
                rounded="lg"
                textAlign="center"
                borderWidth="1px"
                borderColor="rgba(255, 255, 255, 0.1)"
                backdropFilter="blur(8px)"
                boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
                transition="all 0.3s ease"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.47)',
                }}
              >
                <StatLabel fontSize="lg" color="whiteAlpha.900">Ticket Price</StatLabel>
                <StatNumber fontSize="3xl" bgGradient="linear(to-r, #4F46E5, #EC4899)" bgClip="text">$0.10</StatNumber>
                <StatHelpText color="whiteAlpha.800">
                  {isLoadingPrices ? (
                    <Spinner size="xs" />
                  ) : (
                    <>≈ {calculateCost().toFixed(8)} {selectedToken}</>
                  )}
                </StatHelpText>
              </Stat>
            </GridItem>
            <GridItem>
              <Stat
                bg="rgba(255, 255, 255, 0.03)"
                p={4}
                rounded="lg"
                textAlign="center"
                borderWidth="1px"
                borderColor="rgba(255, 255, 255, 0.1)"
                backdropFilter="blur(8px)"
                boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
                transition="all 0.3s ease"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.47)',
                }}
              >
                <StatLabel fontSize="lg" color="whiteAlpha.900">Total Tickets</StatLabel>
                <StatNumber fontSize="3xl" bgGradient="linear(to-r, #4F46E5, #EC4899)" bgClip="text">{ticketCount}</StatNumber>
                <StatHelpText color="whiteAlpha.800">Tickets in current round</StatHelpText>
              </Stat>
            </GridItem>
          </Grid>

          {/* Network and Token Selection - Restructured */}
          <VStack spacing={6} w="full" maxW="container.md">
            {/* Network Selection */}
            <Box 
              w="full" 
              bg="rgba(255, 255, 255, 0.03)" 
              p={4} 
              borderRadius="xl"
              border="1px solid rgba(255, 255, 255, 0.1)"
            >
              <VStack align="stretch" spacing={3}>
                <Text color="whiteAlpha.900" fontSize="sm" fontWeight="medium">
                  1. Select Network
                </Text>
                <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                  {Object.entries(NETWORKS).map(([key, network]) => (
                    <Button
                      key={key}
                      onClick={() => {
                        setSelectedNetwork(key);
                        // Set the default token to the network's native token
                        setSelectedToken(network.nativeToken);
                      }}
                      bg={selectedNetwork === key ? "rgba(79, 70, 229, 0.3)" : "rgba(255, 255, 255, 0.07)"}
                      border="1px solid"
                      borderColor={selectedNetwork === key ? "#4F46E5" : "rgba(255, 255, 255, 0.1)"}
                      _hover={{
                        bg: "rgba(255, 255, 255, 0.1)",
                        borderColor: "rgba(255, 255, 255, 0.2)"
                      }}
                      height="50px"
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-start"
                      gap={2}
                      px={3}
                      position="relative"
                      overflow="hidden"
                      _before={{
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bg: selectedNetwork === key ? "linear-gradient(45deg, rgba(79, 70, 229, 0.1), rgba(236, 72, 153, 0.1))" : "none",
                        opacity: 0.5,
                        borderRadius: "inherit"
                      }}
                    >
                      <Box>
                        {network.logo}
                      </Box>
                      <Text color="whiteAlpha.900" fontSize="sm" fontWeight="medium">
                        {network.name}
                      </Text>
                    </Button>
                  ))}
                </Grid>
              </VStack>
            </Box>

            {/* Token Selection */}
            <Box 
              w="full" 
              bg="rgba(255, 255, 255, 0.03)" 
              p={4} 
              borderRadius="xl"
              border="1px solid rgba(255, 255, 255, 0.1)"
            >
              <VStack align="stretch" spacing={3}>
                <Text color="whiteAlpha.900" fontSize="sm" fontWeight="medium">
                  2. Choose Token
                </Text>
                <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                  {NETWORKS[selectedNetwork as keyof typeof NETWORKS].tokens.map((tokenSymbol) => (
                    <Button
                      key={tokenSymbol}
                      onClick={() => setSelectedToken(tokenSymbol)}
                      bg={selectedToken === tokenSymbol ? "rgba(79, 70, 229, 0.3)" : "rgba(255, 255, 255, 0.07)"}
                      border="1px solid"
                      borderColor={selectedToken === tokenSymbol ? "#4F46E5" : "rgba(255, 255, 255, 0.1)"}
                      _hover={{
                        bg: "rgba(255, 255, 255, 0.1)",
                        borderColor: "rgba(255, 255, 255, 0.2)"
                      }}
                      height="50px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      gap={2}
                      px={3}
                      position="relative"
                      overflow="hidden"
                      _before={{
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bg: selectedToken === tokenSymbol
                          ? tokenSymbol === 'USDT'
                            ? "linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))"
                            : "linear-gradient(45deg, rgba(96, 165, 250, 0.1), rgba(37, 99, 235, 0.1))"
                          : "none",
                        opacity: 0.5,
                        borderRadius: "inherit"
                      }}
                    >
                      <Box>
                        {TOKENS[tokenSymbol as keyof typeof TOKENS].logo}
                      </Box>
                      <Text 
                        color="whiteAlpha.900" 
                        fontSize="sm" 
                        fontWeight="medium"
                        bgGradient={selectedToken === tokenSymbol
                          ? tokenSymbol === 'USDT'
                            ? "linear-gradient(45deg, #10B981, #059669)"
                            : "linear-gradient(45deg, #60A5FA, #2563EB)"
                          : "none"
                        }
                        bgClip={selectedToken === tokenSymbol ? "text" : "inherit"}
                      >
                        {TOKENS[tokenSymbol as keyof typeof TOKENS].name}
                      </Text>
                    </Button>
                  ))}
                </Grid>
              </VStack>
            </Box>
          </VStack>

          {/* Ticket Purchase Section - More compact */}
          <Box
            w="full"
            maxW="container.md"
            p={6}
            borderRadius="lg"
            bg="rgba(13, 16, 25, 0.7)"
            borderWidth="1px"
            borderColor="rgba(255, 255, 255, 0.1)"
            backdropFilter="blur(10px)"
            boxShadow="0 8px 32px 0 rgba(0, 0, 0, 0.37)"
          >
            <VStack spacing={4}>
              <FormControl>
                <FormLabel color="whiteAlpha.900" fontSize="md">Number of Tickets</FormLabel>
                <NumberInput
                  min={0}
                  value={ticketCount}
                  onChange={(_, value) => setTicketCount(value)}
                  max={100}
                  clampValueOnBlur={false}
                >
                  <NumberInputField 
                    bg="rgba(255, 255, 255, 0.05)"
                    border="1px solid rgba(255, 255, 255, 0.1)"
                    color="whiteAlpha.900"
                    _hover={{
                      borderColor: "rgba(255, 255, 255, 0.2)"
                    }}
                    _focus={{
                      borderColor: "#4F46E5",
                      boxShadow: "0 0 0 1px #4F46E5"
                    }}
                    h="50px"
                    fontSize="md"
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper 
                      border="none"
                      color="whiteAlpha.700"
                      _active={{ bg: "rgba(255, 255, 255, 0.1)" }}
                    />
                    <NumberDecrementStepper 
                      border="none"
                      color="whiteAlpha.700"
                      _active={{ bg: "rgba(255, 255, 255, 0.1)" }}
                    />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <Stat
                bg="rgba(255, 255, 255, 0.03)"
                p={4}
                rounded="md"
                w="full"
                borderWidth="1px"
                borderColor="rgba(255, 255, 255, 0.1)"
              >
                <StatLabel color="whiteAlpha.900">Total Cost</StatLabel>
                <StatNumber 
                  bgGradient="linear(to-r, #4F46E5, #EC4899)"
                  bgClip="text"
                  fontSize="2xl"
                >
                  {isLoadingPrices ? (
                    <Spinner size="sm" />
                  ) : (
                    `${calculateCost().toFixed(8)} ${selectedToken}`
                  )}
                </StatNumber>
              </Stat>

              <Button
                colorScheme="blue"
                size="lg"
                w="full"
                isDisabled={ticketCount === 0}
                bg="rgba(79, 70, 229, 0.9)"
                _hover={{ bg: 'rgba(79, 70, 229, 1)' }}
                h="50px"
                fontSize="lg"
                textTransform="uppercase"
                letterSpacing="wide"
              >
                Purchase Tickets
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
      {/* Wallet Selection Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay backdropFilter="blur(4px)" bg="rgba(0, 0, 0, 0.4)" />
        <ModalContent
          bg="rgba(26, 32, 44, 0.95)"
          borderRadius="xl"
          border="1px solid rgba(255, 255, 255, 0.1)"
          backdropFilter="blur(40px)"
          p={4}
          maxW="400px"
        >
          <ModalHeader p={4}>
            <Text 
              fontSize="xl" 
              fontWeight="bold"
              bgGradient="linear(to-r, #4F46E5, #EC4899)"
              bgClip="text"
            >
              Connect Wallet
            </Text>
          </ModalHeader>
          <ModalCloseButton 
            color="whiteAlpha.700" 
            _hover={{ color: "white" }} 
          />
          <ModalBody p={4}>
            <VStack spacing={3} align="stretch">
              {Object.entries(WALLETS).map(([key, wallet]) => (
                <Button
                  key={key}
                  height="60px"
                  bg="rgba(255, 255, 255, 0.05)"
                  border="1px solid rgba(255, 255, 255, 0.1)"
                  _hover={{
                    bg: "rgba(255, 255, 255, 0.1)",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    transform: "translateY(-2px)",
                    transition: "all 0.2s"
                  }}
                  _active={{
                    transform: "translateY(0)",
                  }}
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                  gap={3}
                  px={4}
                  onClick={onClose}
                >
                  <Box>
                    {wallet.logo}
                  </Box>
                  <VStack align="flex-start" spacing={0}>
                    <Text color="white" fontSize="md" fontWeight="semibold">
                      {wallet.name}
                    </Text>
                    <Text color="whiteAlpha.700" fontSize="xs">
                      {wallet.description}
                    </Text>
                  </VStack>
                </Button>
              ))}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
