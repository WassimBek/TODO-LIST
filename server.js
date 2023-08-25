const express = require("express");
const app = express();
const bodyParser = require("body-parser"); 

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true })); 

let listData = [];

app.get("/", (req, res) => {
  res.render("todo", { data: listData, webtitle: "TODO" });
});

app.get("/add", (req, res) => {
  res.render("addNote", { webtitle: "ADD TODO" });
});

app.post("/add", (req, res) => {
  const { title, content } = req.body;
  listData.push({
    title,
    content,
    id: listData.length + 1
  });
  return res.redirect("/");
});


app.get("/update/:id" , (req , res) => {
  const {id} = req.params 
  console.log(id)
  res.render("update" , {webtitle : "Update TODO" , data : listData.at(id - 1)})
})


app.post("/update/:id" , (req , res) => {
  const {id} = req.params 
  const {title , content} = req.body 
  listData[id - 1] = {title , content , id}
  res.redirect("/") 
})

app.post("/delete/:id", (req, res) => {
  const { id } = req.params;
  listData = listData.filter((listItem) => listItem.id !== id);
  res.redirect("/");
});





app.listen(3000, () => {
  console.log("server is working at port 3000"); 
});
