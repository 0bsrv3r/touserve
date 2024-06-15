const { validationResult } = require("express-validator")
const slugify = require("slugify")
const {Guides} = require("../models")
const fs = require('fs');
const path = require('path');


class Guide{

    // Dashboard Side
    static async getGuidesByUserId(req, res){
        const user_id = {companyId: 1} // {userId: req.session.user_id} //UPDATE THIS IN PROD ENV
        const guides = await Guides.findAll({where: user_id})

        res.render("./dashboard/guides", {layout: 'layouts/dashboard/top-side-bars', errors: {}, guides: guides });
    }

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
                companyId: 1, // req.session.user_id,  //UPDATE THIS IN PROD ENV
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
            res.redirect('/dashboard/guides/create')
        }else{
            const errorObject = errors.array().reduce((acc, error) => {
                acc[error.path] = error.msg;
                return acc;
            }, {})

            res.render("./dashboard/guides-create", {layout: 'layouts/dashboard/top-side-bars', errors: errorObject});  
        } 
    }

    static async getUpdateGuideById(req, res){
        const ids  = {
            id: req.params.id,
            companyId: 1 // req.session.user_id //UPDATE THIS IN PROD ENV
        }
        const guide  = await Guides.findOne({where: ids})

        if (guide) {
            res.render("./dashboard/guides-update", {layout: 'layouts/dashboard/top-side-bars', guide: guide, errors: {}});
        }else {
            res.status(404).json({ message: `Guide with ID ${ids.id} not found` });
        }
    }

    static async postUpdateGuideById(req, res){
        const errors = validationResult(req);
        const ids = {
            id: req.params.id,
            companyId: 1 // req.session.user_id  // UPDATE THIS IN PROD ENV
        }

        try {
            if(errors.isEmpty()){ 
                const guide = await Guides.findOne({where: ids});
                let oldImage  = guide.image
                let certificateImage  = guide.certificate
                
                if (guide) {
                    guide.name = req.body.name;
                    guide.surname = req.body.surname;
                    guide.location = req.body.location;
                    guide.languages = req.body.languages;
                    guide.visa = req.body.visa;
                    guide.currency = req.body.currency;
                    guide.age = req.body.age;
                    guide.experience = req.body.experience;
                    guide.gender = req.body.gender;
                    guide.description = req.body.description;

                    if (req?.files?.images) {
                        // Remove Old Image
                        if (oldImage) {
                            const imagePath = path.join("./", oldImage);
                            fs.unlink(imagePath, (err) => {
                                if (err) {
                                    return res.status(500).send('Failed to delete image file');
                                }
                            });
                        }

                        // Upload New Image
                        let avatar = req.files.image; 
                        let newImagePath = 'upload/photos/guides/' + Date.now() + '-' + slugify(avatar.name,{ 
                            lower: true, 
                            strict: true 
                        }) + '.' + avatar.name.split('.').pop();
                        avatar.mv(newImagePath, err => { 
                            if(err){ 
                                return res.status(500).send(err); 
                            } 
                        })

                        guide.image = newImagePath;                        
                    }

                    if(req.files.certificate){
                        // Remove Old Certificate
                        if (certificateImage) {
                            const certificatePath = path.join("./", certificateImage);
                            fs.unlink(certificatePath, (err) => {
                                if (err) {
                                    return res.status(500).send('Failed to delete image file');
                                }
                            });
                        }

                        // Upload New Certificate
                        let certificate = req.files.certificate; 
                        let newCertificatePath = 'upload/photos/guides/certificates/' + Date.now() + '-' + slugify(certificate.name,{ 
                            lower: true, 
                            strict: true 
                        }) + '.' + certificate.name.split('.').pop();
                        certificate.mv(newCertificatePath, err => { 
                            if(err){ 
                                return res.status(500).send(err); 
                            } 
                        })

                        guide.certificate = newCertificatePath;
                    }

                    await guide.save();
                    res.redirect(`/dashboard/guides/update/${ids.id}`)
                } else {
                    res.status(404).json({ message: 'Event not found' });
                }
            }else{
                const errorObject = errors.array().reduce((acc, error) => {
                    acc[error.path] = error.msg;
                    return acc;
                }, {})
                    
                res.render("./dashboard/guides-update", {layout: 'layouts/dashboard/top-side-bars', errors: errorObject, guide: {...req.body, id: req.params.id}});                  
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while updating the guide' });
        }
    }

    static async deleteGuideById(req, res){
        const ids = {
            id: req.params.id,
            companyId: 1 // req.session.user_id  //UPDATE THIS IN PROD ENV
        }

        const guides = await Guides.findOne({where:ids})
        const imagePath = guides.image
        const certificatePath = guides.certificate

        const deleted = await Guides.destroy({where: ids})

        if (deleted && guides) {
            if (imagePath && certificatePath) {
                // delete image
                const fullimagePath = path.join("./", imagePath);
                fs.unlink(fullimagePath, (err) => {
                  if (err) {
                    return res.status(500).send('Failed to delete image file');
                  }
                });

                // delete certificate
                const fullCertificatePath = path.join("./", certificatePath);
                fs.unlink(fullCertificatePath, (err) => {
                  if (err) {
                    return res.status(500).send('Failed to delete certificate file');
                  }
                });
            }
            res.redirect('/dashboard/guides')
        }else {
            res.status(404).json({ message: `Guide with ID ${ids.id} not found` });
        }
    }

    // Front Side
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