const express = require("express");
const app = express();
const path = require("path");
const { v4 : uuidv4 } = require("uuid")
const methodOverride = require("method-override")
const dayjs = require('dayjs');
const { Console } = require("console");
// just call uuidv4() -> It will give you a random ID
// method override package
app.use(methodOverride("_method"))

// telling to understand req for express
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


// ejs configs
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))
app.set("template", path.join(__dirname, "/template"))

// public files access karne ke liye
app.use(express.static(path.join(__dirname, "/public")))

let data = [
    {
        uid: "b1a2c3d4-e5f6-7890-abcd-ef1234567890",
        username: "codeMaster",
        title: "JavaScript Basics",
        content: "Aaj maine JavaScript ke basic concepts jaise variables, functions, aur loops ke baare mein seekha.",
        date: "Saturday, July 3 2025"
    },
    {
        uid: "c2d3e4f5-g6h7-8901-ijkl-mn1234567890",
        username: "pythonDev",
        title: "Python List Comprehensions",
        content: "Python mein list comprehensions ka istemal karke maine data ko efficiently process karna seekha.",
        date: "Saturday, July 3 2025"
    },
    {
        uid: "d3e4f5g6-h7i8-9012-jklm-no1234567890",
        username: "webWizard",
        title: "CSS Flexbox",
        content: "Aaj maine CSS Flexbox ke baare mein seekha aur kaise isse responsive layouts banaye ja sakte hain.",
        date: "Saturday, July 3 2025"
    }
]

const port = 3000;
app.listen(port, () =>{
    console.log(`Server is up and running on port ${port}`)
})

app.get("/blogs", (req, res)=>{
    res.render("home.ejs", {data})
})

app.get("/blogs/:uid/view", (req, res)=>{
    let { uid } = req.params;
    let post = data.find((p)=> uid === p.uid)
    res.render("view.ejs", {post})
})

app.get("/blogs/:uid/edit", (req, res)=>{
    let { uid } = req.params;
    let post = data.find((p)=> uid === p.uid)
    res.render("edit.ejs", {post})
})

app.get("/blogs/new", (req, res)=>{
    res.render("new.ejs")
})

app.post("/blogs/", (req, res)=>{
    let { username, title, content } = req.body;
    let obj = {
        uid: uuidv4(),
        username: username,
        title: title,
        content: content,
        date: dayjs().format("dddd, MMMM D YYYY"),
    }
    data.push(obj);
    res.redirect("/blogs")
    console.log(data)
})

app.patch("/blogs/:uid", (req, res)=>{
    let { uid } = req.params
    let newBlog = req.body.content
    const post = data.find((p)=> uid == p.uid)
    post.content = newBlog
    res.redirect("/blogs")
})

app.delete("/blogs/:uid/delete", (req, res)=>{
    console.log("got a del req")
    let { uid } = req.params
    data = data.filter((p)=> uid !== p.uid)
    res.redirect("/blogs")
})

// console.log(data)