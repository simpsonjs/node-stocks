const request = require('request');
const { parseString } = require('xml2js');
const yahooUrls = require('./yahooUrls');

const urls = {
  tickerSearch: '/api/stocks/:ticker',
  tickerInfo: '/api/stocks/tickerinfo/:tickers',
  chartInfo: '/api/stocks/chart/:ticker',
  optionsInfo: '/api/stocks/options/:ticker',
  companyInfo: '/api/stocks/company/:ticker',
  companyStats: '/api/stocks/stats/:ticker',
  companyNews: '/api/stocks/news/:ticker'
};

module.exports = (app) => {

    // get ticker search results
    app.get(urls.tickerSearch, (req, res) => {
        request({ url: yahooUrls.tickerSearch(req.params.ticker), json: true }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                res.send(body);
            } else {
                res.status(400).send();
            }
        });
    });

    // get ticker info
    app.get(urls.tickerInfo, (req, res) => {
        request({ url: yahooUrls.tickerInfo(req.params.tickers), json: false }, (error, response, body) => {
            if (!error && response.statusCode === 200) {

                let data = { items: [] };
                let split = [], lines = [];
                lines = body.split('\n');

                for (let i = 0; i < lines.length; i++) {
                    if (lines[i] !== '') {

                        split = lines[i].split(/['"]+/g);

                        if (split[1].includes(","))
                            split[1] = split[1].replace(/\,/g, '');

                        split = split.join('').split(',');

                        data.items.push(tickerInfo(split));
                    }
                }

                res.send(data);
            } else {
                res.status(400).send();
            }
        });
    });

    // get chart info
    app.get(urls.chartInfo, (req, res) => {
      request({ url: yahooUrls.chartInfo(req.params.ticker), json: true }, (error, response, body) => {
          if (!error && response.statusCode === 200) {
            if (body.chart) {

              let returnAr = [];
              let timestamps = body.chart.result[0].timestamp;
              let adjClose = body.chart.result[0].indicators.adjclose[0].adjclose;
              for (let i = 0; i < timestamps.length; i++) {
                let epochTime = new Date(timestamps[i] * 1000).valueOf();
                returnAr.push([epochTime, adjClose[i]]);
              }

              res.send(returnAr);
            }
          } else {
            res.status(400).send();
          }
      });
    });

    // get options info
    app.get(urls.optionsInfo, (req, res) => {

      let url;
      if (req.query.date) {
        url = yahooUrls.optionsInfo(req.params.ticker, req.query.date);
      } else {
        url = yahooUrls.optionsInfo(req.params.ticker, null);
      }

      request({ url: url, json: true }, (error, response, body) => {
          if (!error && response.statusCode === 200) {
            if (body.optionChain) {
              res.send(body.optionChain.result[0]);
            }
          } else {
            res.status(400).send();
          }
      });

    });

    // get company info
    app.get(urls.companyInfo, (req, res) => {
      request({ url: yahooUrls.companyInfo(req.params.ticker), json: true }, (error, response, body) => {
          if (!error && response.statusCode === 200) {
            if (body.quoteSummary) {
              res.send(body.quoteSummary.result[0].assetProfile);
            }
          } else {
            res.status(400).send();
          }
      });
    });

    // get company statistics
    app.get(urls.companyStats, (req, res) => {
      request({ url: yahooUrls.companyStats(req.params.ticker), json: true }, (error, response, body) => {
          if (!error && response.statusCode === 200) {
            if (body.quoteSummary) {
              res.send(body.quoteSummary.result[0]);
            }
          } else {
            res.status(400).send();
          }
      });
    });

    // get company news
    app.get(urls.companyNews, (req, res) => {
      request({ url: yahooUrls.companyNews(req.params.ticker), json: true }, (error, response, body) => {
          if (!error && response.statusCode === 200) {
            parseString(body, function (err, result) {
              if (!err) {
                if (result.rss) {
                  res.send(result.rss.channel[0].item);
                }
              }
            });
          } else {
            res.status(400).send();
          }
      });
    });

}

tickerInfo = (split) => {
  return {
      name: split[0],
      symbol: split[1],
      change: split[2],
      percentChange: split[3],
      price: split[4],
      exchange: split[5],
      previousClose: split[6],
      open: split[7],
      bid: split[8],
      ask: split[9],
      dayLow: split[10],
      dayHigh: split[11],
      eps: split[12],
      volume: split[13],
      avgVolume: split[14],
      yearHigh: split[15],
      yearLow: split[16],
      marketCap: split[17],
      dividendYield: split[18],
      PERatio: split[19],
      fiftyMovingAvg: split[20],
      twoHundredMovingAvg: split[21],
      priceSaleRatio: split[22]
  };
}
