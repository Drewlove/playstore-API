const express = require('express'); 
const morgan = require('morgan');
const cors = require('cors');
const playstore = require('./playstore')

const PORT = process.env.PORT || 8000;

const app = express(); 
app.use(morgan('common')); 
app.use(cors())

app.get('/playstore', (req, res) => {
  const {app = "", sort, genres} = req.query; 
  let results;

  if(app.length > 0){
    results = playstore.filter( key => 
      key.App.toLowerCase().includes(app.toLowerCase())
    )
    if(results.length === 0){
      return res.status(400).json('No matches')
    }
  }

  if(sort) {
    if(!['App', 'Rating'].includes(sort)){
      return res.status(400).json('must include sort by App or Rating')
    }
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    }); 
  }
  
  if(genres){
    if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)){
      return res.status(400).json("Genre must include 'Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', or 'Card'")
    }
      results.filter(key => {
        key.Genres = genres
      });
    }
    res.json(results)
})

module.exports = app; 

app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}`)
})