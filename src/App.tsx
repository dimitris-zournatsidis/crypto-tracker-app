import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';
import { ICoins } from '../assets/fixtures';

function App() {
  const [coins, setCoins] = useState<ICoins[]>([]);
  const [search, setSearch] = useState('');
  const ref: any = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current.focus();
  }, []);

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=EUR&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(event: any) {
    setSearch(event.target.value);
  }

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input
            type="text"
            placeholder="Search"
            onChange={handleChange}
            className="coin-input"
            ref={ref}
          />
        </form>
      </div>

      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            volume={coin.total_volume}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            marketcap={coin.market_cap}
          />
        );
      })}
    </div>
  );
}

export default App;
