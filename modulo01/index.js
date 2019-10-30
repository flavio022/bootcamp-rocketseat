const express = require("express");
const users = ["Flavio","Aline"];
const server = express();
/*Diz para o expresse que usar JSON*/
server.use(express.json());

server.use((req,res,next)=>{
  console.time("Request");
  console.log(`Metodo: ${req.method}; URL: ${req.url}`);
  next();
  console.timeEnd("Request");
});

function checkIfUserExist(req,res,next){
  if(!req.body.name){
    return res.status(400).json({error: 'User not found on request body'});
  }
  return next();
}

function checkIfUserInArray(req,res,next){
  const user = users[req.params.id];
  if(!user){
    return res.status(400).json({error: 'User does not in array'})
  }
  req.user = user;
  return next();
}
server.get("/teste",function(req,res){
    /*return res.send("Hello World")*/
    return res.json({"message":"Hello World"})
});
server.get("/novarota",(req,res)=>{
  const nome = req.query.nome;

  return res.json({"message":`${nome}`});
});

server.get("/users-teste/:id",function(req,res){
  const id = req.params.id;

  return res.json({"message":`${id}`});

});


server.get("/users/:id",checkIfUserInArray,function(req,res){
  const id = req.params.id;

  return res.json(req.user);


});
//CRUD - Create, Read, Update, Delete

server.get("/users",function(req,res){
  return res.json(users);
});
server.get("/users/:id",checkIfUserInArray,(req,res)=>{
  const {id} = req.params;

  return res.json(users[id]);
})
server.post("/users",checkIfUserExist,(req,res)=>{
  const nome = req.body.name;
  users.push(nome);
  
  return res.json(users);
});

server.put("/users/:id",checkIfUserExist,checkIfUserInArray,(req,res)=>{
    const id  = req.params.id;
    const nome = req.body.name;
    users[id] = nome;
    return res.json(users);
});

server.delete("/users/:id",checkIfUserInArray,(req,res)=>{
  const {id} = req.params;
  users.splice(id,1);
  return res.send();
});

server.listen(3000);