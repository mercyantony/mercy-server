// init express server and use static html views
var express = require("express")
var app = express()
var port = 8351
app.listen(port)
app.use(express.static("views"))
console.log("server is listening on " + port)

// set up webhooks
var WebHooks = require("node-webhooks")
var webHooks = new WebHooks({
    db: "./webHooksDB.json",
})

// load default route with landing page
app.get("/", function (req, res) {
    res.render("index.html")
})

// use body parser for json and encoding
var bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// post route to handle the API call and build the webhook
app.post("/notify", function (req, res) {
    var connector = req.body.connector
    var title = req.body.title
    var text = req.body.text
    var color = "16161d"
    color = req.body.color
    var actionName = req.body.actionName
    var actionURL = req.body.actionURL
    var potentialAction
    //check to see if an action button is requested
    if (req.body.actionName) {
        potentialAction = [
            {
                "@context": "https://schema.org",
                "@type": "ViewAction",
                name: actionName,
                target: [actionURL],
            },
        ]
    } else {
        potentialAction = null
    }
    //trigger the webhook
    webHooks.trigger("webhook", {
        title: title,
        text: text,
        themeColor: color,
        potentialAction: potentialAction,
    })
    //initialize the webhook callback
    webHooks
        .add("webhook", connector)
        .then(function () {
            res.send("webhook success")
        })
        .catch(function (err) {
            res.send(err)
        })
})
