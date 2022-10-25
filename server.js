const express = require('express');
const app = express();
const PORT = process.env.PORT||3001;

//middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get('/',(req,res)=>{
    res.json({message:"Nope world"});
});

app.use((req,res)=>{
    res.status(404).end();
});

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})