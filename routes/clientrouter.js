/**
 * @author Joe Passanante
 */
const express = require("express");
const router = express.Router();

//Here is an example of us using middleware. We can alter the incoming request object before it goes to the route. 
router.use((req,res,next)=>{
    let rand = Math.random()*10000
    req.number = rand;
    next();
})

//We want to capture all the traffic to the root of this router to THIS
//simplifies if we plan on using a variety of methods.
router.route("/")
//Requests will be piped in order through valid http methods. 
//So here we have .all, which means any HTTP method (get,post,put,etc) will HAVE to go through this route before finishing. 
.all((req,res,next)=>{
    //see how we can use req.number here, this is because any request that enters this router is edited to have a .number property.
    console.log("[Request Number]",req.number);
    next(); // this allows the request to keep going!
})
.get((req,res,next)=>{
    //send that request. 
    res.send(`Hey! End the of line pal!\n\nYour number is ${Math.round(req.number)}.`)
})



//we need to export the router as a module so it can be used!
module.exports = router; 