var express = require('express');
var router = express.Router();
const axios = require("axios");

const calculaLucro = (ticker, preco_comprado, volume_comprado) =>{
axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol="+ticker+"&apikey=MNPK2NIL3UAS75LJ").
then(response =>{
    const data = response.data;
  
    var texto = JSON.stringify(data), i = 0, pos = -1;
    do {
        pos = texto.indexOf('close', pos + 1);
        i++;
    } while (pos !== -1 && i < 2)
    
    var valor_atual = parseFloat(texto.substring(pos+8,pos+15));

    var lucro = (valor_atual - preco_comprado) * volume_comprado;
    console.log(lucro);
    
    return(response);

}).catch(err => console.log(err));
}

/* GET users and stocks. */
router.get('/users', function(req, res) {
  var db = require("../db");
  var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
  Users.find({}).lean().exec(
    function(e, docs){
      res.json(docs);
      res.end();
    }
  )
});

/* GET ONE users and stocks. */
router.get('/user/:nome', function(req, res) {
  var db = require("../db");
  var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
  Users.find({nome: req.params.nome}).lean().exec(
    function(e, docs){
      
      for (var i=0;i<=docs.length;i++){
        var tick = docs[0].acoes[i].ticker
        var price = docs[0].acoes[i].preco
        var quant = docs[0].acoes[i].qtd
        var profit = calculaLucro(""+tick,price,quant)
        console.log("PROFIT",profit)
        docs[0].acoes[i]={ticker:tick, preco:price, qtd:quant, lucro: profit}
        console.log("DOCS.ACOES FINAL DENTRO DE CADA FOR: ", docs[0].acoes);
      }
      res.json(docs);
      console.log("DOCS.ACOES NO GET: ", docs[0].acoes);
      res.end();
    }
  )
});
/* POST ONE user. */
router.post('/users/', function (req,res,next){
  var db = require('../db');
  var User = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
  var newuser = new User({nome: req.body.nome, senha: req.body.senha});
  newuser.save(function(err){
    if (err) {
      res.status(500).json({error: err.message});
      res.end();
      return;
    }
    res.json(newuser);
    res.end;
  })
})

/* POST ONE user data for login check. */
router.post('/user/', function (req,res,next){
  console.log("CHEGOU AQUI")
  console.log("REQUEST BODY:", req.body)
  var db = require('../db');
  var User = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
  var user = req.body;
  console.log(user)
  User.find(user, function(err,doc){
    console.log("DOC LENGTH: ",doc.length)
    if (err) {
      res.status(500).json({error:err.message});
      res.end();
      return;
    }else if (doc.length === 0){
      res.json({worked:false})
      return;
    }else{
      res.json({worked: true});
      res.end();
    }
    
    
    }
  )

  })
    


/* PUT ONE user stock/info */
router.put('/users/:nome', function (req,res,next){
  var db = require('../db');
  var User = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
  User.findOneAndUpdate({nome: req.params.nome}, req.body, {upsert: true}, function(err,doc){
    if (err) {
      res.status(500).json({error:err.message});
      res.end();
      return;
    }
    res.json(req.body);
    res.end();
  });
});

/*DELETE ONE user. */
router.delete('/users/:nome', function(req,res,next){
  var db = require('../db');
  var User = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
  User.find({nome: req.params.nome}).remove(function(err,doc){
    if (err) {
      res.status(500).json({error:err.message});
      res.end();
      return;
    }
    res.json({success: true});
    res.end();
  });
});


module.exports = router;
