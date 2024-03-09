import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import './coindata.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function CoinChart() {
  const [currency, setCurrency] = useState("Bitcoin");
  const [image,setimage]=useState(null)
  const [price, setPrice] = useState("");
  const [percentChange, setPercentChange] = useState("");
  const [description, setDescription] = useState("");
  const [uuid, setUuid] = useState("Qwsogvtv82FCd");
  const [time, setTime] = useState("24h");
  const myChartRef = useRef(null);

  useEffect(() => {
    getCoinData(uuid, time);
  }, [uuid, time]);

  function getCoinData(currency, timeframe) {
    axios.get(`https://currency-api-1.onrender.com/api/coin/${currency}?timePeriod=${timeframe}`)
      .then(response => {
        const coinsData = response.data.data.coin;
        console.log(coinsData)
        setimage(coinsData.iconUrl)
        updateUI(coinsData);
        drawChart(coinsData);
      })
      .catch(error => console.error('Fetch error:', error));
  }

  function updateUI(coinsData) {
    setCurrency(coinsData.name);
    setPrice(coinsData.price);
    setPercentChange(coinsData.change);
    setDescription(coinsData.description);
  }

  function drawChart(coinsData) {
    const ctx = document.getElementById('myChart');

    if (!myChartRef.current) {
      myChartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Array.from({ length: coinsData.sparkline.length }, (_, i) => ''),
          datasets: [{
            data: coinsData.sparkline,
            label: coinsData.symbol,
            lineTension: 0,
            backgroundColor: 'transparent',
            borderColor: coinsData.color,
            borderWidth: 4,
            pointBackgroundColor: coinsData.color,
          }]
        },
        options: {
          scales: {
            y: {
              ticks: {
                beginAtZero: false,
                callback: value => '$' + value
              }
            }
          },
          legend: {
            display: true
          }
        }
      });
    } else {
      myChartRef.current.destroy();
      myChartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Array.from({ length: coinsData.sparkline.length }, (_, i) => ''),
          datasets: [{
            data: coinsData.sparkline,
            label: coinsData.symbol,
            lineTension: 0,
            backgroundColor: 'transparent',
            borderColor: coinsData.color,
            borderWidth: 4,
            pointBackgroundColor: coinsData.color,
          }]
        },
        options: {
          scales: {
            y: {
              ticks: {
                beginAtZero: false,
                callback: value => '$' + value
              }
            }
          },
          legend: {
            display: true
          }
        }
      });
    }
  }

  function handleCurrencyChange(event) {
    const selectedValueCurrency = parseInt(event.target.value);
    let newUuid = "";

    switch (selectedValueCurrency) {
      case 0:
        newUuid = "Qwsogvtv82FCd";
        break;
      case 1:
        newUuid = "razxDUgYGNAdQ";
        break;
      case 2:
        newUuid = "D7B1x_ks7WhV5";
        break;
      default:
        newUuid = "Qwsogvtv82FCd"; // Default to Bitcoin
    }

    setUuid(newUuid);
  }

  function handleTimeframeChange(event) {
    const newTimeframe = event.target.value;
    setTime(newTimeframe);
  }

  return (
    <div className="wrapper">
      <div className="container">
        <div>
          <h1 className="display-4 d-inline-block">{currency}</h1>
          <img src={image} alt={currency}  width="30" height="30" className="d-inline-block align-top" />
        </div>
        <div>
          <select id="cryptoList" className="custom-select custom-select-lg mb-3" onChange={handleCurrencyChange}>
            <option value="0">Bitcoin</option>
            <option value="1">Ethereum</option>
            <option value="2">Litecoin</option>
          </select>
        </div>
        <hr className="my-4" />
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="changeFont d-inline-block mb-0">$</p>
            <p className="changeFont d-inline-block mb-0">{price}</p>
            <p className="d-inline-block align-top">{percentChange}</p>
          </div>
          <div className="btn-group d-inline-block align-center" id="timeframeButtons">
            <input type="radio" name="options" value="24h" className="btn-check" id="24h" onChange={handleTimeframeChange} />
            <label className="btn btn-success" htmlFor="24h">24h</label>
            <input type="radio" name="options" value="7d" className="btn-check" id="7d" onChange={handleTimeframeChange} />
            <label className="btn btn-success" htmlFor="7d">7d</label>
            <input type="radio" name="options" value="30d" className="btn-check" id="30d" onChange={handleTimeframeChange} />
            <label className="btn btn-success" htmlFor="30d">30d</label>
            <input type="radio" name="options" value="1y" className="btn-check" id="1y" onChange={handleTimeframeChange} />
            <label className="btn btn-success" htmlFor="1y">1y</label>
          </div>
        </div>
        <canvas className="my-4 w-100" id="myChart" width="900" height="380"></canvas>
      </div>
      <div id="infoContainer" className="container mt-4">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default CoinChart;
