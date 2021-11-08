import { useState } from "react";
import { createGifAccount, sendGif } from "./utils/solana";

const TEST_GOATS = [
  "https://i.imgur.com/gNRTGPx.gif",
  "https://i.imgur.com/sQRkbIs.gif",
  "https://i.imgur.com/OHVUsQX.gif",
  "https://i.imgur.com/y6srtzU.gif",
];

const Connected = ({ gifList, setGifList }) => {
  const [inputValue, setInputValue] = useState("");

  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  if (gifList === null) {
    return (
      <div className="connected-container">
        <button
          className="cta-button submit-gif-button"
          onClick={() => createGifAccount(setGifList)}
        >
          Do One-Time Initialization For GIF Program Account
        </button>
      </div>
    );
  }

  return (
    <div className="connected-container">
      <input
        type="text"
        placeholder="Enter goat link!"
        value={inputValue}
        onChange={onInputChange}
      />
      <button
        className="cta-button submit-gif-button"
        onClick={() => sendGif(setGifList, inputValue)}
      >
        Submit
      </button>
      <div className="gif-grid">
        {gifList.map(({ gifLink }) => (
          <div className="gif-item" key={gifLink}>
            <img src={gifLink} alt={gifLink} />
          </div>
        ))}
      </div>
    </div>
  );
};

export { Connected };
