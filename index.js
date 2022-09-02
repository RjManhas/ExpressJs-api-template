/**
 * @author Joe Passanante
 */
const express = require("express")
const app = express()
const port = process.env.PORT || 5000; //port we will listen for connections on. 
const mongoose = require("mongoose") //Library we will be using for connecting and manipulating mongoDB documents. 
const path = require("path") // Default Node library. 
const bodyparser = require("body-parser")

//Here we set up out mongoose connections. 
const DBconfig = require("./config/db")

app.use(bodyparser.json()); // get information from html forms


mongoose.connect(DBconfig.url).then(object => {
    console.log("Connection to Mongoose is good!")
})
    .catch(err => {
        console.log("There was an error connecting!!!! TIME TO PANIC!!!!")
        throw "The world is ending - make sure you added the db.js file in config!!!"
    })


app.get("/", (req, res, next) => { //WHOA WHOA WHOA what is "/"... this just means that when you go to the root of the URL, it will be handled here. 
    //req = request object. Contains all the juicy data coming from the incoming client 
    //res = response object. Contains all the juicy data and methods we need to send a response to the client. 

    //Using path, we will navigate to our resources and public file. 
    let file = path.join(__dirname, "resources", "public", "helloworld.html") //__dirname is a constant that is established, automatically provides the path to the current folder <THIS> Js file is in. 
    console.log(file)

    res.sendFile(file)
})

app.get("/secondpage", (req, res, next) => { //if you go to the URL, you can see that 

    //we don't have to send a file. We can just send text if we wish.
    let file = path.join(__dirname, "resources", "public", "second.html") //__dirname is a constant that is established, automatically provides the path to the current folder <THIS> Js file is in. 

    res.sendFile(file)

})

app.get("/jsondata", (req, res, next) => {

    //we can send JSON data as a response as well. This is great for POST requests.

    res.json({ name: "Testing", page: "None", state: false, number: 100000 })

})


//Here we are using a route. 
//Routes are great for when we have complex routes that are going to have a ton of subtrees.
const clientrouter = require("./routes/clientrouter")
const bookrouter = require("./routes/bookrouter")

app.use("/clients", clientrouter);
app.use("/book",bookrouter)
//catch unknown traffic
app.get("*", (req, res, next) => { // * represents a wild card. Any pages that do not match the pages above will be handled here.

    //we don't have to send a file. We can just send text if we wish.

    res.send("Brother, this page does not exist.")

})


console.log("Server started on port " + port)
app.listen(port)
console.log("Webpage can be found at http://localhost:" + port)
console.log("Some testing web pages: \n http://localhost:" + port + " \n \t /secondpage \n \t /jsondata \n \t /anythingyouwant")
