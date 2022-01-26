const express = require("express")
const ejs = require("ejs")
const bodyParser = require('body-parser')
const connect = require("./schemas/index")
const app = express()
const port = 3000
const articlesRouter = require("./routes/articles")


connect()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static(__dirname +'/'))


app.use(express.json())

app.use((req,res,next)=>{
    console.log("Request URL:", req.originalUrl, " - ", new Date())
    next()
})

app.use("/api",articlesRouter)


app.get("/",(req,res)=>{
    res.render("index",{})
})



app.listen(port,()=>{
    console.log(port,"포트가 열렸습니다.")
})