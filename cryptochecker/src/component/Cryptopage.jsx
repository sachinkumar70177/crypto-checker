import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { useParams } from 'react-router-dom';
import { Box, Heading } from '@chakra-ui/react';

const CryptoPage = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cryptocurrency`);
        setCryptoData(response.data.data); 
      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
      }
    };

    fetchCryptoData();
  }, []);

  useEffect(() => {
    if (cryptoData.length > 0) {
      renderChart();
    }
  }, [cryptoData]);

  const renderChart = () => {
    const ctx = document.getElementById('cryptoChart');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: cryptoData.map(crypto => crypto.name),
        datasets: [{
          label: 'Market Capitalization',
          data: cryptoData.map(crypto => crypto.quote.USD.market_cap),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
              beginAtZero: true,
              max: 1000000000000
          }
        }
      }
    });
  };

  return (
    <Box maxW="800px" mx="auto" p="20px">
      <Heading as="h1" mb="20px">Cryptocurrency Market Cap Chart</Heading>
      <canvas id="cryptoChart" width="400" height="200"></canvas>
    </Box>
  );
};

export default CryptoPage;
