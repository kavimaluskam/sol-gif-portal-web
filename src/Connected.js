import { useState } from "react";

const TEST_GOATS = [
  "https://i.imgur.com/gNRTGPx.gif",
  "https://i.imgur.com/sQRkbIs.gif",
  "https://i.imgur.com/OHVUsQX.gif",
  "https://i.imgur.com/y6srtzU.gif",
];

const Connected = () => {
  const [inputValue, setInputValue] = useState("");

  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const sendGif = async () => {
    if (inputValue.length > 0) {
      console.log("Goat link:", inputValue);
    } else {
      console.log("Empty input. Try again.");
    }
  };

  return (
    <div className="connected-container">
      <input
        type="text"
        placeholder="Enter goat link!"
        value={inputValue}
        onChange={onInputChange}
      />
      <button className="cta-button submit-gif-button" onClick={sendGif}>
        Submit
      </button>
      <div className="gif-grid">
        {TEST_GOATS.map((goat) => (
          <div className="gif-item" key={goat}>
            <img src={goat} alt={goat} />
          </div>
        ))}
      </div>
    </div>
  );
};

export { Connected };
