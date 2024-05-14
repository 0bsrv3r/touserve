const  { validationResult } = require("express-validator") 
const User = require('../models/user.js'); 
 
module.exports = postRegister = (req, res) => { 
    
    const errors = validationResult(req); 
    console.log(req.body)
    
    if(errors.isEmpty()){ 
        
        // model structure 
        const data = { 
            uname: req.body.uname, 
            email: req.body.email, 
            password: req.body.password,
            role: req.body.selectOption
        } 

        const insertedData = User.create(data) 
        // const user = User.findById(insertedData.insertId) 
        // req.session.username = user.name 
        // req.session.user_id = user.id 
        res.redirect('/') 
    } 
}