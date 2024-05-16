export const login = (req, res, next) => { 
    if(req.session.username){ 
        res.redirect('/') 
    } 
    next(); 
}