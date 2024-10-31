// backend/server.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors()); 
app.use(express.json()); 

const con = mysql.createConnection({
  host: 'localhost',    
  user: 'root',     
  password: '',       
  database: 'voting_system' 
});

con.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

app.get('/', async (req, res) => {
  const cardId = 'VB123T462';
  const query = `SELECT * FROM user_details WHERE id = '${cardId}'`;
  let name, fp,ability;
  const id = await new Promise((resolve, reject) => {
    con.query(query, (err, resl) => {
      if (err) return reject(err);

      if (resl.length === 0) {
        return reject(new Error('Card not found'));
      }

      const element = resl[0];
      resolve(element['id']); 
      name = element['name']; 
      fp = element['fingerprint'];
      ability=element['ability'];  
    });
  });
  console.log(id);

  res.json({ id: id, name: name, fp: fp ,ability:ability});
});

app.post('/vote', (req, res) => {
  const { cardId, vote,ability } = req.body; 

  if (!cardId || !vote) {
    return res.status(400).json({ error: 'Card ID and Candidate ID are required' });
  }
  console.log(cardId+" "+ vote);

  const query = `UPDATE user_details SET vote = '${vote}' , ability ='${ability}' WHERE id = '${cardId}'`;

  con.query(query, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(`Vote recorded for Card ID: ${cardId}`);
    //res.json({ message: 'Vote recorded successfully' });
  });
});

app.post('/block', async(req, res) => {
  const { cardId, ability } = req.body;
  console.log("card blocked, ability= "+ability);
  const query = `UPDATE user_details SET ability = '${ability}' WHERE id = '${cardId}'`;
  await new Promise((resolve, reject) =>{
    con.query(query, (err, result) => {
      if (err) {
        throw err;
      }
      console.log(`ability recorded for Card ID: ${cardId}`);
    });
  })
  
})

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
