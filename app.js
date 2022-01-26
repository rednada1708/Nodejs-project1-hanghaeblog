const express = require("express")
const connect = require("./schemas/index")
const app = express()
const port = 3000
const articlesRouter = require("./routes/articles")


connect()

app.set('view engine', 'ejs')
app.use(express.static(__dirname+'/public'))


app.use(express.json())

app.use((req,res,next)=>{
    console.log("Request URL:", req.originalUrl, " - ", new Date())
    next()
})

app.use("/api",articlesRouter)







app.get("/",(req,res)=>{
    res.render('hello World')
})


app.listen(port,()=>{
    console.log(port,"포트가 열렸습니다.")
})