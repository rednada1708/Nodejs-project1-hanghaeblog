const express = require("express")
const articles = require("../schemas/articles")
const router = express.Router()
const Articles = require("../schemas/articles")


router.get("/", async(req,res)=>{
    res.send("This is root page")
})

router.get("/articles", async(req,res)=>{
    const existArticles = await Articles.find()
    const articles = existArticles.sort((a,b)=>b.date-a.date)
    console.log(articles)
    res.send({articles})
})




router.post("/articles",async(req,res)=>{
    const {title, author, password, content} = req.body
    const date = new Date()
    const articles = await Articles.find()
    console.log(articles)
    const ids = articles.map((item)=>item.articleId)
    let articleId = 1
    if (ids.length !== 0){
        articleId = Math.max(...ids) + 1
    } 
    const createdArticle = await Articles.create({articleId,title,author,password,content,date})
    console.log(articleId)
    res.json({articles:createdArticle})
})





module.exports = router