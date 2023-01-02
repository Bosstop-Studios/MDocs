// @ts-nocheck
const fs = require('fs');
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use("/assets", express.static("assets"));
app.use("/md", express.static("docs"));

app.get('/docs', function(req, res){

    let path = req.query.path;

    console.log(path);

    if(path.endsWith(".md")) {
        res.render("doc", {
            path: req.query.path,
        })
    } else {
        let dirs = fs.readdirSync("./docs/" + path);  
        res.render("dir", {
            path: path,
            docs: dirs
        });
    }

});

app.get('/', function(req, res){
    let docs = fs.readdirSync("./docs").filter(file => !file.includes("."));
    res.render("home", {
        docs: docs
    });
});

app.get('*', function(req, res){
    res.render("404", {
        path: req.path,
    });
});

app.listen(8080, () => { console.log( `Server is running on http://localhost:${8080} !`) });