const { validationResult } = require("express-validator")
const slugify = require("slugify")
const {Guides} = require("../models")


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
            
            const lang = req.body.languages.join(",")
            
            const data = {
                companyId: req.session.user_id, 
                name: req.body.name, 
                surname: req.body.surname, 
                location: req.body.location, 
                languages: lang,
                visa: req.body.visa,
                currency: req.body.currency,
                description: req.body.description,
                age: req.body.age,
                experience: req.body.experience,
                gender: req.body.gender,
                image: avatarPath,
                certificate: certificatePath
            } 

            Guides.create(data)
            res.redirect('/dashboard/guides')
        }else{
            const errorObject = errors.array().reduce((acc, error) => {
                acc[error.path] = error.msg;
                return acc;
            }, {})

            res.render("./dashboard/guides", {layout: 'layouts/dashboard/top-side-bars', errors: errorObject});  
        } 
    }

    static async getGuides(req, res){
        const guides = await Guides.findAll()

        if(guides != undefined){
            res.render("guides", {layout: 'layouts/pagesheader', guides:guides});
        }else{
            res.render("guides", {layout: 'layouts/pagesheader', guides:{}});
        }
    }

    static async getGuideById(req, res){
        const data = req.params
        const guide = await Guides.findOne({where: data, include: "tours"})
                
        if(guide != undefined){
            res.render("guide-details", {layout: 'layouts/pagesheader', guide:guide});
        }else{
            res.render("404", {layout: 'layouts/pagesheader'});

        }
    }
}

module.exports = Guide