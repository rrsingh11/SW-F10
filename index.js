const PORT = 3002;
let RESULT = false
let isPending = false
//importing dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
// const ejs = require('ejs')

//initializing the app
const app = express();

//initializing the multer
const multer = require("multer");

//configuring the multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload_images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

//middleware------------------
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(express.json());
app.set("view engine", "ejs");

//routes-starting-------------
//home route
app.get("/", (req, res) => {
  res.status(200).render("home");
});

//task route
app.get("/task", (req, res) => {
  res.status(200).render("task", {
    upload: "",
  });
});

// app.get('/upload', (req, res)=>{
//     res.render('upload',{
//         title : "srm"
//     });
// })

//uploading the image
app.post("/upload", upload.single("image"), (req, res) => {
  if(!RESULT){
    return res.status(200).render("task", {
      upload: "image uploaded and its underprocess",
      });
  }else{
    RESULT = null
    return res.status(200).render('result')
  }
  

});

//result route

app.get('/result',(req, res)=>{
  res.status(200).render('result')
})

//sending pdf to the user
app.get("/pdf", (req, res) => {
  var data = fs.readFileSync("./assets/example/write.pdf");
  res.contentType("application/pdf");
  res.send(data);
});

//other routes sending error 404 page
app.use("*", (req, res) => {
  res.send("page not found");
});

app.listen(PORT, () => {
  console.log("server running at port 3002");
});
