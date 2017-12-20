const stockController = require('./controllers/stockController');
const userController = require('./controllers/userController');

const stockUrls = {
  tickerSearch: '/api/stocks/:ticker',
  tickerInfo: '/api/stocks/tickerinfo/:tickers',
  chartInfo: '/api/stocks/chart/:ticker',
  optionsInfo: '/api/stocks/options/:ticker',
  companyInfo: '/api/stocks/company/:ticker',
  companyStats: '/api/stocks/stats/:ticker',
  companyNews: '/api/stocks/news/:ticker'
};

const userUrls = {
  getUser: '/api/users/:uname',
  updateUser: '/api/users/:id'
};

module.exports = app => {
  // stock info endpoints
  app.get(stockUrls.tickerSearch, stockController.tickerSearch);
  app.get(stockUrls.tickerInfo, stockController.tickerInfo);
  app.get(stockUrls.chartInfo, stockController.chartInfo);
  app.get(stockUrls.optionsInfo, stockController.optionsInfo);
  app.get(stockUrls.companyInfo, stockController.companyInfo);
  app.get(stockUrls.companyStats, stockController.companyStats);
  app.get(stockUrls.companyNews, stockController.companyNews);

  // user endpoints
  app.get(userUrls.getUser, userController.getUser);
  app.patch(userUrls.updateUser, userController.updateUser);
};
