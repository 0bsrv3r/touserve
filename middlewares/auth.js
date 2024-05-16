function login(req, res, next){
    console.log(req.session) 
    if(req.session.username){ 
        res.redirect('/dashboard') 
    } 
    next(); 
}

module.exports = login