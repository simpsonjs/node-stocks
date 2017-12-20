module.exports = {
  tickerSearch: ticker => {
    return `http://d.yimg.com/aq/autoc?query=${ticker}&region=US&lang=en-US&callbacks.json`;
  },
  tickerInfo: tickers => {
    return `http://finance.yahoo.com/d/quotes.csv?s=${tickers}&f=nsc1p2l1xpobaghe7va2kjj1yrm3m4p5`;
  },
  chartInfo: ticker => {
    return `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?range=max`;
  },
  optionsInfo: (ticker, date) => {
    if (date !== null) {
      return `https://query2.finance.yahoo.com/v7/finance/options/${ticker}?date=${date}`;
    } else {
      return `https://query2.finance.yahoo.com/v7/finance/options/${ticker}`;
    }
  },
  companyInfo: ticker => {
    return `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${ticker}?formatted=true&lang=en-CA&region=CA&modules=assetProfile`;
  },
  companyStats: ticker => {
    return `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${ticker}?formatted=true&lang=en-CA&region=CA&modules=defaultKeyStatistics,financialData,calendarEvents`;
  },
  companyNews: ticker => {
    return `http://finance.yahoo.com/rss/headline?s=${ticker}`;
  }
};
