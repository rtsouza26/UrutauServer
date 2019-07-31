var express = require('express');
var router = express.Router();
import User from  '../model/User';
import Rsa_Crypt from '../common/Rsa_Crypt';
import Room from '../model/Room';
import jwt from 'jsonwebtoken';
const io = require('socket.io')(1366);





io.on('connection',(socket)=>{
  console.log('User Connected - Socket ID '+socket.id);

  let room = new Room(10,'default');

  socket.on('JOIN',(roomName) =>{
    socket.join(room.name);
    io.to(socket.id).emit('ROOM_JOINED',room.name);
    socket.broadcast.to(room.name).emit('NEW_CONNECTION',null);
    console.log('Connected the room ')

  });
  socket.on('PUBLIC_KEY', (key) => {

    socket.broadcast.to(room.name).emit('PUBLIC_KEY', key);
    console.log(`chave - ${key}`);
  });
  socket.on('MESSAGE',(msg) =>{
    console.log(`New Message - ${msg}`);
    socket.broadcast.to(room.name).emit('MESSAGE', msg);
  });

  socket.on('disconnect', () => {
    socket.broadcast.to(room.name).emit('USER_DISCONNECTED', null)
  })
});


/* GET home page. */



router.get('/list', function(req, res, next) {
  let user = new User();
  user.list(function(err,result){
    console.log(result);
  });
  user.list2();


});
router.get('/publickey', function(req,res,next){
  let publicKey = Rsa_Crypt.getInstance().publicKey;
  res.send({publicKey});
});
router.post('/salvar', function(req,res,next){
  let user = new User();

  user.nome = req.body.nome;
  user.login = req.body.login;
  user.senha = req.body.senha;
  user.save(function(err,result){
      if(err){
        res.send({mensagem:"erro", user: user});
      }else{
        res.send({mensagem:"ok", user:user});
      }
  })

});

module.exports = router;
