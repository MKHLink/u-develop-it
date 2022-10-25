const express = require('express');
const app = express();
const PORT = process.env.PORT||3001;

const inputCheck = require('./utils/inputCheck');

//mysql2
const mysql = require('mysql2');

//database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Likhon8090',
        database: 'election'
    },
    console.log('connected to election')
);

//middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get('/api/candidates',(req,res)=> {
    const sql = `select * from candidates`;

    db.query(sql, (err,rows)=>{
        if(err)
        {
            res.status(500).json({error: err.message});
        }

        res.json({
            message:'success',
            data: rows
        });
    });
});

//select a candidate
app.get('/api/candidate/:id',(req,res)=>{
    const sql = `select * from candidates where id = ?`;
    const params = [req.params.id];

    db.query(sql,params, (err,row)=>{
        if (err) {
            res.status(400).json({ error: err.message });
            return;
          }

        res.json({
            message: 'success',
            data: row
        });
    });
});

//delete a candidate
app.delete('/api/candidate/:id',(req,res)=>{
    const sql = `delete from candidates where id =?`;
    const params = [req.params.id];

    db.query(sql,params, (err,result)=>{
        if (err) {
            res.statusMessage(400).json({ error: res.message });
          } else if (!result.affectedRows) {
            res.json({
              message: 'Candidate not found'
            });
        }
        else
        {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

//create a candidate
app.post('/api/candidate',({body},res)=>{
    const errors = inputCheck(body, 'first_name','last_name','industry_connected');

    if(errors){
        res.status(400).json({error:errors});
        return;
    }

    const sql = `insert into candidates (first_name,last_name,industry_connected)
    values(?,?,?)`;

    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql,params, (err,result)=>{
    if (err) {
        res.send(400).json({error: err.message});
        return;
      }
      res.json({
        message:'success',
        data: body
      })
    });
})

app.get('/',(req,res)=>{
    res.json({message:"Nope world"});
});

app.use((req,res)=>{
    res.status(404).end();
});

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})