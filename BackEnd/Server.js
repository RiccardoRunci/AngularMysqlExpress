/*PARTE DEL BACKEND!!!*/
const express = require('express'); //importo la libreria express.
const app = express(); //creo un instanza del mio server express e la metto in "app".
app.use(express.json()); //fà il parsing delle sole request http non delle response!!!
const connection =require('./ConnessioneDB');
const port = 8080; //la porta del server express


//seleziona tutte le persone
app.get('/utenti',(req,res)=>{
  let sql ='select * from tab_utenti';
  let query = connection.query(sql,(err,result)=>
  {
      if(err) console.log(result);
      else
      {
       res.json(result);
      }
  });
});

//seleziona una persona per id:
app.get('/utenti/:id',(req,res)=>{
    connection.query('SELECT * FROM tab_utenti where idutente = ?',[req.params.id],(err,row,fields)=>{
    if(!err){
      res.json(row); //questo invece di rispedirmi un json mi invia un array!?!?
    }
    else
    console.log(err);
    });
});


app.post('/inserisciutente',(req, res)=> 
{
   let Nome=req.body.nomeUt;
   let Email=req.body.emailUt;
  
    var sql = `INSERT INTO tab_utenti (NomeUtente, EmailUtente)
            VALUES(?, ?)`;
    connection.query(sql, [Nome , Email], function (err, data) 
    {
      if (err) {res.status(500).send(console.log("Errore nell'inserimento nel DB dell'utente "+err));} 
      else {res.status(201).send(console.log("Utente: "+Nome," Inserito nel DB!"));}
    });
});

app.listen(port, (req,res) => {
    console.log(`Express server listening on port ${port}`);
  });

