import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));

app.get("/",(req,res) =>{
    const data = {
        blog_data: blog_data,
    }
    res.render("index.ejs",data);
});

app.get("/create",(req,res) =>{
    res.render("create_blog.ejs");
});

app.post("/create_blog",(req,res) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var date = mm + '/' + dd + '/' + yyyy;

    let post = {
        title: req.body["title"],
        content: req.body["content"],
        date:date,
    };
    blog_data.push(post);
    res.redirect("/");
})

app.get("/post_detail",(req,res) =>{
    let post = blog_data[req.query["id"]];
    const data = {
        post: post,
    }
    res.render("post_detail.ejs",data);
})

app.get("/edit",(req,res) =>{
    let post = blog_data[req.query["id"]];
    const data = {
        index: req.query["id"],
        post: post,
    }
    res.render("edit_blog.ejs",data);
});

app.post("/edit_blog",(req,res) =>{
    let title = req.body["title"];
    let content = req.body["content"];
    let index = req.body["index"];
    blog_data[index]["title"] = title;
    blog_data[index]["content"] = content;
    res.redirect("/");
})

app.get("/delete",(req,res) =>{
    let post = blog_data[req.query["id"]];
    const data = {
        index: req.query["id"],
        post: post,
    }
    res.render("delete_blog.ejs",data)
})

app.post("/delete_blog",(req,res) =>{
    blog_data.splice(req.body["index"],1);
    res.redirect("/");
});

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});

var blog_data = [
    {
        title: "Clairo - Charm album review",
        content: "Always pleasant and listenable, but rarely memorable or outstanding. 'Sexy to Someone' is the most energetic highlight of this sweet, slow, sleepy affair. Charm probably makes for good lazy Sunday morning listening, but it's not an album I imagine I would return to often.",
    },
    {
        title: "Remi Wolf - Big Ideas album review",
        content: "The sophomore album from Remi Wolf, sees her exploring a wide range of styles, from boogie and synthpop to her comfortable indie pop and rock. Although the album has a lot of bite and presence to it (staying toe to toe with others in the general alt-pop space), it definitely doesn’t know exactly what it wants to sound like. I really great EP is present here, but the whole album is too much of a mixed bag.",
    },
];

