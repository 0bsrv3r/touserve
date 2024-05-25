const { validationResult } = require("express-validator")
const slugify = require("slugify")
const Guides = require("../models/guide.js")


class Guide{
    static postGuide(req, res){
        const errors = validationResult(req)
        
        if(errors.isEmpty()){ 
            let avatar = req.files.image; 
            let avatarPath = 'upload/photos/guides/' + Date.now() + '-' + slugify(avatar.name,{ 
                lower: true, 
                strict: true 
            }) + '.' + avatar.name.split('.').pop();
            avatar.mv(avatarPath, err => { 
                if(err){ 
                    return res.status(500).send(err); 
                } 
            })

            let certificate = req.files.certificate; 
            let certificatePath = 'upload/photos/guides/certificates/' + Date.now() + '-' + slugify(certificate.name,{ 
                lower: true, 
                strict: true 
            }) + '.' + certificate.name.split('.').pop();
            certificate.mv(certificatePath, err => { 
                if(err){ 
                    return res.status(500).send(err); 
                } 
            })
            
            const data = {
                companyId: req.session.user_id, 
                name: req.body.name, 
                surname: req.body.surname, 
                location: req.body.location, 
                languages: req.body.languages,
                visa: req.body.visa,
                currency: req.body.currency,
                image: avatarPath,
                certificate: certificatePath
            } 

            console.log(data)
            Guides.create(data)
            res.redirect('/dashboard/guides')
        }else{
            console.log(errors)
            const errorObject = errors.array().reduce((acc, error) => {
                acc[error.path] = error.msg;
                return acc;
            }, {})

            res.render("./dashboard/guides", {layout: 'layouts/dashboard/top-side-bars', errors: errorObject});  
        } 
    }
}

module.exports = Guide