const User = require('../../db/schema').User;
const Domain = require('../../db/schema').Domain;

module.exports = (req, res) => {
  const allHistory = req.body.history
  // parse through user's chrome history in req.body
  // ============= add parsed domain to each history object in allData array ================
    allData.map((historyItem) => {
      const url = historyItem.url;
      let domain;
      if (url.indexOf('://') > -1) {
        domain = url.split('/')[2];
      } else {
        domain = url.split('/')[0];
      }
      if (domain.slice(0, 4) === 'www.') {
        domain = domain.slice(4);
      }
      domain = domain.split(':')[0];
      historyItem.domain = domain;
      return historyItem;
    });

    // ================ add unique domains to uniqueDomains object ============
    const uniqueDomains = {};

    allData.map((historyItem) => {
      if (uniqueDomains[historyItem.domain]) {
        return uniqueDomains[historyItem.domain].push(historyItem);
      }
      uniqueDomains[historyItem.domain] = [historyItem];
      return uniqueDomains[historyItem.domain];
    });
    
        // for each unique domain, find or create domain 
          // check if domain is in the users's domains list for today 
          // if no domains saved for today's date, add domain to 
          // if yes, add new count to current count
          // if no, create 

  res.sendStatus(200);

}

