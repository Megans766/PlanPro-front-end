import React, { useState } from "react";
import styles from './Quotes.module.css'

const Quote = (props) => {
  const [quote, setQuote] = useState({ quote: "" });
  const handleChange = ({ target }) => {
    setQuote({ ...quote, [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleAddQuote(quote);
  };

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1>Quote</h1>
        <label> Add an Inspirational Quote here!</label>
        <input
          type="text"
          name="quote"
          value={quote.quote}
          onChange={handleChange}
        />
        <button style={{ color: "black" }} type="submit">
          Submit
        </button>
      </form>
      {props.quotes.map((quote) => (
        <li key={quote._id}>
          {quote.quote}
          <button
            style={{ color: "black" }}
            onClick={() => props.handleDeleteQuote(quote._id)}
          >
            X
          </button>
        </li>
      ))}
    </main>
  );
};

export default Quote;

