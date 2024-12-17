const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
let methodOverride = require('method-override')

app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id : uuidv4(),    //automatically generate ID
        username : "college",
        content : "I love coding"
    },
    {
        id : uuidv4(),
        username : "Shiv patel",
        content : "Hard work is important to achieve sucess"
    },
    {
        id : uuidv4(),
        username : "Patel Shiv",
        content : "I love coding"
    },
];

app.get("/posts", (req, res) =>{            //This is GET request
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res) =>{    //This is GET request
    res.render("new.ejs");
});

app.post("/posts", (req, res) =>{               //This is POST request
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    // console.log(req.body);                   // Why body because in post all the data will be send in the BODY
    res.redirect("/posts")              // Used REDIRECT. That is connect different page.
});

app.get("/posts/:id", (req, res) =>{
    let { id } = req.params;
    console.log(id);
    let post = posts.find( (p) => id === p.id);
    res.render("show.ejs", {post});
});

app.patch("/posts/:id", (req, res) =>{
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find( (p) => id === p.id);
    post.content = newContent;
    console.log(newContent);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) =>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id );
    res.render("edit.ejs",{ post });
});

app.delete("/posts/:id", (req, res) =>{
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})

app.listen(port, ()=>{
    console.log("listening port : 8080");
});


// MAhesh@1906