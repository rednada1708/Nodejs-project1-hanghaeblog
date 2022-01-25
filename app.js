const express = require("express")
const connect = require("./schemas/index")
const app = express()
const port = 3000
const articlesRouter = require("./routes/articles")


connect()


app.use((req,res,next)=>{
    console.log("Request URL:", req.originalUrl, " - ", new Date())
    next()
})

app.use("/api",articlesRouter)







app.get("/",(req,res)=>{
    res.send('hello World')
})


app.listen(port,()=>{
    console.log(port,"포트가 열렸습니다.")
})