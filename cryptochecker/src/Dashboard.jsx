// Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Box, Heading, Flex, Grid, GridItem, Button, Text } from '@chakra-ui/react';

const Dashboard = () => {
  const [cryptos, setCryptos] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cryptocurrency?start=${page}&limit=5`);
        setCryptos(response.data.data);
      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
      }
    };

    fetchCryptos();
  }, [page]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };
console.log(cryptos)
  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={4}>
        Cryptocurrency Dashboard
      </Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {cryptos.map((crypto) => (
          <GridItem key={crypto.id}>
            <Link to={`/crypto/${crypto.id}`} style={{ textDecoration: 'none' }}>
              <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md" bg="gray.100" color="gray.800">
                <Text fontSize="lg" fontWeight="bold">
                  {crypto.name} ({crypto.symbol})
                </Text>
                <Text fontSize="md" mt={2}>
                  Current Price: <Text as="span" fontWeight="bold" color="blue.500">${crypto.quote.USD.price}</Text>
                </Text>
                <Text fontSize="md" mt={2}>
                  Market Cap: <Text as="span" fontWeight="bold" color="green.500">${crypto.quote.USD.market_cap}</Text>
                </Text>
                <Text fontSize="md" mt={2}>
                  24h Change: <Text as="span" fontWeight="bold" color={crypto.quote.USD.percent_change_24h > 0 ? "green.500" : "red.500"}>{crypto.quote.USD.percent_change_24h}%</Text>
                </Text>
              </Box>
            </Link>
          </GridItem>
        ))}
      </Grid>
      <Flex mt={4} justify="space-between">
        <Button onClick={handlePrevPage} disabled={page === 1}>
          Previous Page
        </Button>
        <Button onClick={handleNextPage}>
          Next Page
        </Button>
      </Flex>
    </Box>
  );
};

export default Dashboard;
