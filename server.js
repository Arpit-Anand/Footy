const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/footy', {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;

db.once('open', ()=> {
  console.log("Connected to MongoDB");
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let Player = require('./models/players')

app.get('/', (req, res) => {
    Player.find({}, (err, players)=>{
      res.render('index',{
        players : players
      });
    });
  });
app.get('/players/add',(req,res)=>{
  res.render('add_player');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.post('/players/add', (req, res) =>{
  let player = new Player();
  player.name = req.body.name;
  player.jersey = req.body.jersey;
  player.age = req.body.age;
  player.country = req.body.country;
  player.position = req.body.position;
  player.goalScored = req.body.goalScored;
  player.cleansheet = req.body.cleansheet;

  player.save((err)=>{
    if(err){
      console.log(err);
    }
    else {
      res.redirect('/');
    }
  });
});

app.get('/players/edit', (req, res) => {
    Player.find({}, (err, players)=>{
      res.render('edit',{
        players : players
      });
    });
  });
app.get('/players/edit/:id',(req,res) => {
  var id = req.params.id;
  Player.findById(id, (err, player) => {
      res.render('edit_player', {
        player : player
      })
  })
})

app.post('/players/editDetail/:id', (req, res) =>{
  let player = {};
  player.name = req.body.name;
  player.jersey = req.body.jersey;
  player.age = req.body.age;
  player.country = req.body.country;
  player.position = req.body.position;
  player.goalScored = req.body.goalScored;
  player.cleansheet = req.body.cleansheet;

  let query = {_id:req.params.id}
  Player.updateOne(query, player, (err)=>{
    if(err){
      console.log(err);
    }
    else {
      res.redirect('/');
    }
  });
});

app.get('/players/delete', (req, res) => {
    Player.find({}, (err, players)=>{
      res.render('delete',{
        players : players
      });
    });
  });

app.delete('/players/:id', (req, res) => {
  let query = {_id:req.params.id}
  Player.deleteOne(query, (err) => {
    if(err){
      console.log(err);
    }
    res.send('Success');
  })
})

app.listen(3000,() => {
  console.log("On port 3000......");
});
