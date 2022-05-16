const experss = require("express")
const axios = require("axios").default
const bodyParser = require("body-parser")

const app = experss()
app.use(bodyParser.json())
app.get("/test", (req, res) => {
    console.log("Someone pinged me", req.rawHeaders)

    res.send("It's working!!! (Antony)")
})

app.post("/user/message", (req, res) => {
    console.log(req.body)
    res.end()
})

https: app.listen(5555, () => {
    console.log("listening on port 5555")
})
