const express = require('express'); 
const morgan = require('morgan');
const cors = require('cors');
const playstore = require('./playstore')

const app = express(); 
app.use(morgan('common')); 
app.use(cors())

app.get('/playstore', (req, res) => {
  const {app = "", sort, genres} = req.query; 
  let results = playstore; 

  if(app.length > 0){
    results = playstore.filter( key => 
      key.App.toLowerCase().includes(app.toLowerCase())
    )
    if(results.length === 0){
      res.status(400).send('No matches')
    }
  }

  if(sort) {
    if(!['App', 'Rating'].includes(sort)){
      res.status(400).send('must include sort by App or Rating')
    }
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    }); 
  }
  
  if(genres){
    if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)){
      res.status(400).send("Genre must include 'Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade',or 'Card'")
    }
      results.filter(key => {
        key.Genres = genres
      })
    }

  res.json(results)
})

app.listen(8000, ()=> {
    console.log('Server started on port 8000')
})