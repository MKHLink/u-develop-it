const express = require('express');
const app = express();
const PORT = process.env.PORT||3001;

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

/*db.query(`select * from candidates`,(err,rows)=>{
    console.log(rows);
})*/

//select a candidate
db.query(`select * from candidates where id =1`,(err,row)=>{
    if(err){
        console.log(err);
    }
    console.log(row);
});

//delete a candidate
/*db.query(`delete from candidates where id = ?`,1,(err,result)=>{
    if(err){
        console.log(err);
    }
    console.log(result);
});*/

//create a candidate
const sql = `insert into candidates (id,first_name,last_name,industry_connected)
values(?,?,?,?)`;

const params = [1,'Ronald','Firbank',1];

db.query(sql,params, (err,result)=>{
    if (err) {
        console.log(err);
      }
      console.log(result);
});

app.get('/',(req,res)=>{
    res.json({message:"Nope world"});
});

app.use((req,res)=>{
    res.status(404).end();
});

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})