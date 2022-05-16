const axios = require("axios").default
const express = require("express")
const bodyParser = require("body-parser")
const app = express().use(bodyParser.json())

const token = "mercy12345"

let webhooks = []

const autoMessages = [
    "Be confident in yourself!",
    "Every moment is a fresh beginning!",
    "Change the world by being yourself!",
]

setInterval(() => {
    const message = autoMessages[Math.floor(Math.random() * 3)]
    console.log(message)
    webhooks.forEach((url) => {
        axios.post(url, { message })
    })
}, 10000)

app.get("/", (req, res) => {
    // check if verification token is correct
    if (req.query.token !== token) {
        return res.sendStatus(401)
    }

    // return challenge
    return res.end(req.query.challenge)
})

app.get("/test", (req, res) => {
    console.log("Somebody called me", req.rawHeaders)
    res.send("IT'S WORKING!!! (Mercy)")
})

app.post("/", (req, res) => {
    // check if verification token is correct
    if (req.query.token !== token) {
        return res.sendStatus(401)
    }

    // print request body
    console.log(req.body)

    // return a text response
    const data = {
        responses: [
            {
                type: "text",
                elements: ["Hi", "Hello"],
            },
        ],
    }

    res.json(data)
})

app.post("/webhook", (req, res) => {
    const url = req.query.url

    console.log("!!!! SOMEBODY REGISTERED A WEBHOOK !!! ")

    webhooks.push(url)

    res.end()
})

app.delete("/webhook", (req, res) => {
    const url = req.query.url

    webhooks = webhooks.filter((el) => el !== url)

    res.end()
})
app.listen(5555, () => {
    console.log("Listening on port 5555")
})
