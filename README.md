# Coin Tracker

A single-page cryptocurrency tracking web app built with vanilla JavaScript, jQuery, and Bootstrap 5.

## Features

- Displays 15 trending cryptocurrencies via the CoinGecko API
- Search coins by symbol
- Expand any coin card to see live prices in USD, EUR, and ILS
- Select up to 5 coins for tracking — a modal lets you swap out a coin if the limit is reached
- Client-side caching on coin details (2-minute TTL) to reduce redundant API calls
- Responsive layout — works on desktop, tablet, and mobile
- Parallax scroll effect on the header

## Tech Stack

- HTML5, CSS3
- JavaScript (ES6+)
- jQuery & AJAX
- Bootstrap 5
- [CoinGecko API](https://www.coingecko.com/en/api) — trending coins & coin details
- [CryptoCompare API](https://min-api.cryptocompare.com/) — multi-coin price feed

## Project Structure

```
├── index.html
├── css/
│   └── style.css
├── scripts/
│   ├── api.js         # API calls (CoinGecko, CryptoCompare)
│   ├── state.js       # Centralized app state & caching
│   ├── components.js  # Reusable UI components
│   ├── pages.js       # Page renderers (Home, Reports, About)
│   ├── utils.js       # Progress bar, currency formatter, toast alerts
│   └── main.js        # App entry point & nav routing
└── assets/
    └── crypto-bg.jpg
```

## Getting Started

No build step needed — just open `index.html` in a browser.

> Requires an internet connection to fetch live coin data from the APIs.
