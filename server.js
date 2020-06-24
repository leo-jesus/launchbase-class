const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))
server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", (req, res) => {
    const about = {
        avatar_url: "https://avatars2.githubusercontent.com/u/21048049?s=400&u=235dd059e0607a85e18522b6c906fef968dac12d&v=4",
        name: "Leonardo Jesus",
        role: "Aluno - Rocketseat",
        description: 'Futuro programador full-stack. Servidor no <a href="http://www.tre-sp.jus.br" target="_blank">TRE-SP</a>',
        links: [
            { name: "Github", url: "https://github.com/leo-jesus/" },
            { name: "Twitter", url: "https://www.twitter.com/llxdgb1" },
            { name: "Linkedin", url: "https://www.linkedin.com/in/leonardo-jesus-226a97112/" }
        ]
    }

    return res.render("about", { about })
})
server.get("/portfolio", (req, res) => {
    return res.render("portfolio", { items: videos })
})

server.get("/video", (req, res) => {
    const id = req.query.id
    const video = videos.find((video) => {
       return video.id == id
    })

    if (!video) {
        return res.send("video not found!")
    }

    return res.render("video", { item: video })

    res.send(id)

})
server.listen(5000, () => {
    console.log("server is running")
}) 