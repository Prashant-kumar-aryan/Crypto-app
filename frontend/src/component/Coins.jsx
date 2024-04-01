import React, { useEffect } from "react";
import CoinCard from "./CoinCard.jsx";
import Loader from "./Loader.jsx";
import ErrorComponent from "./ErrorComponent.jsx";
import coinsStore from "./stores/CoinStore.js";
import "./Coins.css";
const Coins = () => {
  const {
    coins,
    loading,
    error,
    fetchCoins,
    prevPage,
    nextPage,
    handleCurrencyChange,
    getCurrencySymbol,
  } = coinsStore();

  useEffect(() => {
    fetchCoins();
  }, []);

  if (error) return <ErrorComponent message="Error fetching data" />;

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="CoinContainer">
        {coins.map((coin) => (
          <CoinCard
            key={coin.id}
            id={coin.id}
            name={coin.name}
            price={coin.current_price}
            imgSrc={coin.image}
            symbol={coin.symbol}
            currencySymbol={getCurrencySymbol()}
          />
        ))}
      </div>
      <div className="pagecontainer">
        <button className="pagebutton" onClick={prevPage}>
          Prev
        </button>
        <p>{coinsStore.getState().page}</p>
        <button className="pagebutton" onClick={nextPage}>
          Next
        </button>
      </div>
    </>
  );
};

export default Coins;
