const express=require("express");

const mysql=require("mysql2");

const app=express();

let port=2500;

app.use(express.json());

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"gamezone",
    password:"",
    port:3306,

});

db.connect((err)=>{
    if(err)
    {
        console.log(err,"error");
    }
    else
    {
console.log("Rahul data based");
    }

});

app.get("/:id",(req,res)=>{
    let id=req.params.id;
    let qry="SELECT * FROM `games` WHERE Game_id='"+id+"'";

    db.query(qry,(err,result)=>{
        if(err)
        {
console.log(err);
        }
        if(result.length>0)
        {
            res.send({status:true,msg:"database success",data:result});
        }
else
{
res.send({status:false,msg:"failed"});
}

    });
});

app.post("/insert",(req,res)=>{
let Name=req.body.Name;
let Size=req.body.Size;
let Mostuser=req.body.Mostuser;
let Rating=req.body.Rating;

let qry="INSERT INTO `games`( `Name`, `Size`, `Mostuser`, `Rating`) VALUES ('"+Name+"','"+Size+"','"+Mostuser+"','"+Rating+"')";

db.query(qry,(err,result)=>{
    if(err)
    {
        console.log(err);
    }
    console.log(result);
    if(result.affectedRows == 1)
    {
        res.send({status:true,msg:"success",data:result});
    }
    else
    {
        res.send({status:false,msg:"failed"});
    }
});
});

app.put("/:id",(req,res)=>{
   
    let id=req.params.id;
    let qry="UPDATE games SET rating=4 WHERE Game_id='"+id+"'";

    db.query(qry,(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        console.log(result);
        if(result.affectedRows == 1)
        {
            res.send({status:true,msg:"success",data:result});
        }
        else
        {
           res.send({status:false,msg:"failed"});
        }
    });
});

app.delete("/:id",(req,res)=>{
    let id=req.params.id;
   let qry= "DELETE FROM games WHERE Game_id='"+id+"'";

   db.query(qry,(err,result)=>{
        if(err){
            console.log(err);
        }
        console.log(result);
       if(result.affectedRows == 1){
            res.send({status:true,msg:"success",data:result});
        }
        else{
           res.send({status:false,msg:"failed"});
        }
    });
});

app.listen(port,()=>{
console.log("server is running");
});

