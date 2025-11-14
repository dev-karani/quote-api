const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

app.use(express.static('public'));

app.get('/api/quotes/random', (req,res,next)=>{
  const randomQuote = getRandomElement(quotes)
  res.send({quote:randomQuote})
})
app.get('/api/quotes', (req,res,next)=>{
  const person = req.query.person
  if(person){
    const filteredQuotes = quotes.filter(quote => quote.person === person  )
    res.send({quotes: filteredQuotes})
  } else{
    res.send({quotes})
  }
})

app.post('/api/quotes', (req,res,next)=>{
  const newQuote = req.query.quote
  const newPerson = req.query.person


  if(newPerson && newQuote){
    const newQuoteByte = {
      quote: newQuote,
      person: newPerson
      }
    quotes.push(newQuoteByte)
    res.send({quote: newQuoteByte})
  } else{
    res.status(400).send()
  }
})
// export app for use in main.js and for testing
module.exports = {
  app
};

