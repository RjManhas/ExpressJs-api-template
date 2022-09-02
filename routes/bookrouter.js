/**
 * @author Joe Passanante
 */
const express = require("express");
const router = express.Router();
const Book = require("../bin/models/book")

//The comments for setting up routes can be found in clientrouter.js

//This will mostly go over how to:
// GET data from mongoose
// UPDATE data from mongoose
// CREATE data in mongoose 
// and DELETE data in mongoose. 

// We use the following HTTP methods 
// GET - get the data
// POST - create the data
// PUT - update the data
// DELETE - delete the data.

router.route("/")
    .all((req, res, next) => {
        console.log("[Book Action]", "Got book action")
        next();
    })
    .get((req, res, next) => {
        console.log("[Book Action]", "Get Books")
        Book.find({}).exec()
            .then(books => {
                console.log("[Book Action]", "Got Books")
                res.json(books)
            })
            .catch(err => {
                console.log("[Book Action]", "Error getting books")
            })
    })
    .post((req, res, next) => {
        console.log("[Book Action]", "Create Books")

        //Alright well, we are making a book. We should need to check if the request has the data we need. 
        let data = req.body;

        //check to make sure that the request came with name and author -> These are the two fields we require!!!
        if (!data.hasOwnProperty("name") || !data.hasOwnProperty("author")) {
            return res.status(400).send("Hey! You are missing some really important fields. Make sure you have name and author.")
        }

        //If we made it this far, that means the post request was sent correctly. 

        //We can now create the book. 
        Book.create({
            //We set the properties of the book, note how these match the schema defined in models. 
            name: data.name,
            author: data.author
        })
            .then(doc => {
                //On sucess, we get the doc back. 

                //We send the doc to the client.
                res.json(doc)
            })
            .catch(err => {
                //In the case of an error, we log the error
                console.log(err.message);

                //We then tell the client that somewhere something happened and we couldn't complete the request. 
                res.status(500).send("yeah... so we couldn't create the book. We have no idea why.");
            })

    })
    .put((req, res, next) => {
        console.log("[Book Action]", "Update Books")
        /*now for put requests, we need an id
        There are many ways you an do this, i'm going to expect the id to come through the query of the request...
        in example /book?id=XXXX
        */
        let query = req.query;

        //check to make sure the ID tag is present. 
        if (!query.hasOwnProperty("id")) {
            return res.status(400).send("Missing id query.");
        }

        //now we need to make sure that the request has the data to update the book with. 
        let data = req.body;

        if (!data.hasOwnProperty("name") || !data.hasOwnProperty("author")) {
            return res.status(400).send("Hey! You are missing some really important fields. Make sure you have name and author.")
        }


        //If we made it here, we are gooooood.

        //This is a method that accepts 2 parameters, the ID of the object we are updating, and the json object to be changed. 
        //Just a reminder, our data variable really looks like this: {name: "",author:""} - which is what we checked for on line 88!
        //This directly matches up with the schema we created. 
        //There are more advanced ways to edit objects, but this is the building block. Please see mongoose documentation for more.

        Book.findByIdAndUpdate(query.id, data).exec()
        .then(doc=>{
            res.json(doc);
        })
        .catch(err=>{
            res.status(500).send("Yeah so updating didn't really work... oops")
        })
    })
    .delete((req, res, next) => {
        console.log("[Book Action]", "Delete Books")
        let query = req.query;

        //check to make sure the ID tag is present. 
        if (!query.hasOwnProperty("id")) {
            return res.status(400).send("Missing id query.");
        }
        Book.findByIdAndDelete(query.id).exec()
        .then(x=>{
            res.send(`Deleted id ${query.id}`)
        })
        .catch(err=>{
            res.status(500).send("Could not delete id. " + err.message);
        })
    })

module.exports = router;