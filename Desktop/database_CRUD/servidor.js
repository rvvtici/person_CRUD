const colors = require("colors");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb")
const bcrypt = require("bcrypt")

const app = express ();
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.set('view engine', 'ejs');
app.set('views', './views');

var server = http.createServer(app);
server.listen(80);
console.log("Servidor rodando...".rainbow)


//npm install dotenv

require("dotenv").config();
const MongoClient = mongodb.MongoClient;
const uri = process.env.DATABASE_URL;
//const uri ='mongodb+srv;
const client = new MongoClient(uri, { useNewUrlParser: true })

// salva dados no banco (create)
app.post("/cadastrar_usuario", function(req, res) {	
	//const hashedPassword = bcrypt.hash(req.body.senha, 10);
    client.db("database_CRUD").collection("usuarios").insertOne(
		{
		id: Date.now().toString(),	 
		db_nome: req.body.nome, 
		db_login: req.body.login, 
		db_senha: req.body.senha }, 
		//db_senha: hashedPassword }, 
		function (err, items) {
			if (err) {
			res.render('login', {resposta: "Erro ao cadastrar usuário!"}) //redirectiona para o "resposta_usuario.ejs". nele, mostra a resposta
			}else {
			res.render('login', {resposta: "Usuário cadastrado com sucesso!"})       
			};
    });
 
 });
 
 // busca um usuário no banco de dados
 app.post("/logar_usuario", function(requisicao, resposta) {
    client.db("database_CRUD").collection("usuarios").find(
      {db_login: requisicao.body.login, 
        db_senha: requisicao.body.senha }).toArray(function(err, items) {
        console.log(items);

		// validar se logado
        if (items.length == 0) {
          resposta.render('home', {resposta: "Usuário/senha não encontrado!"})
        }else if (err) {
          resposta.render('home', {resposta: "Erro ao logar usuário!"})
        }else {
          resposta.render('home', {resposta: "Usuário logado com sucesso!"})       
        };
      });
 
 });


 // atualiza senha do usuário (update)
 app.post("/atualizar_usuario", function(requisicao, resposta) {
    client.db("database_CRUD").collection("usuarios").updateOne(
        { db_login: requisicao.body.login, 
          db_senha: requisicao.body.senha },
        { $set: {db_senha: requisicao.body.novasenha} }, function (err, result) {
          console.log(result);
          if (result.modifiedCount == 0) {
            resposta.render('home', {resposta: "Usuário/senha não encontrado!"})
          }else if (err) {
            resposta.render('home', {resposta: "Erro ao atualizar usuário!"})
          }else {
            resposta.render('home', {resposta: "Usuário atualizado com sucesso!"})       
          };
    });
 
 });

 // remover o usuário (delete)
 app.post("/remover_usuario", function(requisicao, resposta) {
    client.db("database_CRUD").collection("usuarios").deleteOne(
      { db_login: requisicao.body.login, 
        db_senha: requisicao.body.senha } , function (err, result) {
        console.log(result);
        if (result.deletedCount == 0) {
          resposta.render('home', {resposta: "Usuário/senha não encontrado!"})
        }else if (err) {
          resposta.render('home', {resposta: "Erro ao remover usuário!"})
        }else {
          resposta.render('home', {resposta: "Usuário removido com sucesso!"})       
        };
      });
 
 });
 
//  // busca todos os usuarios no banco de dados
//  // procura o .db("blog") e .collection("usuarios")
//  app.get("redirect_home", function(requisicao, resposta) {
//   client
//     .db("database_CRUD")
//     .collection("usuarios")
//     .find().toArray(function(err, items) {
//       // renderiza a resposta para o navegador
//       resposta.render("home.ejs", { usuarios: items });
//     });

// });

//url localhost/ redireciona para o formulario.html
app.get("/", function(req, res){
    res.redirect("formulario.html")
});

app.get("/login", (req, res) =>{
    res.render("login", {resposta: ""})
});

app.get("/cadastro", (req, res) =>{
    res.render("cadastro", {resposta: ""})
});

app.get("/home", (req, res) =>{
	res.render("home", {resposta: ""});
})



// npm install 
//npm install colors
// npm install mongodb@4.12
// npm install express
// npm install ejs
//npm install dotenv