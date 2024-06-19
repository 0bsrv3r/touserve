const { validationResult } = require("express-validator")
const slugify = require("slugify")
const {Guides} = require("../../models")
const fs = require('fs');
const path = require('path');


class Guide{

    // admin Side
    static async getGuidesByUserId(req, res){
        const userId = {userId: 1} // {userId: req.session.user_id} //UPDATE THIS IN PROD ENV
        const guides = await Guides.findAll({where: userId})

        return res.render("./admin/guides", {layout: 'layouts/admin/top-side-bars', errors: {}, guides: guides });
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
                userId: 1, // req.session.user_id,  //UPDATE THIS IN PROD ENV
                name: req.body.name, 
                surname: req.body.surname, 
                country: req.body.country, 
                city: req.body.city, 
                languages: lang,
                age: req.body.age,
                experience: req.body.experience,
                gender: req.body.gender,
                description: req.body.description,
                image: avatarPath,
                certificate: certificatePath
            } 

            Guides.create(data)
            res.redirect('/admin/guides/create')
        }else{
            const errorObject = errors.array().reduce((acc, error) => {
                acc[error.path] = error.msg;
                return acc;
            }, {})

            return res.render("./admin/guides-create", {layout: 'layouts/admin/top-side-bars', errors: errorObject});  
        } 
    }

    static async getUpdateGuideById(req, res){
        const ids  = {
            id: req.params.id,
            userId: 1 // req.session.user_id //UPDATE THIS IN PROD ENV
        }
        const guide  = await Guides.findOne({where: ids})

        if (guide) {
            return res.render("./admin/guides-update", {layout: 'layouts/admin/top-side-bars', guide: guide, errors: {}});
        }else {
            return res.status(404).json({ message: `Guide with ID ${ids.id} not found` });
        }
    }

    static async postUpdateGuideById(req, res){
        const errors = validationResult(req);
        const ids = {
            id: req.params.id,
            userId: 1 // req.session.user_id  // UPDATE THIS IN PROD ENV
        }

        try {
            if(errors.isEmpty()){ 
                const guide = await Guides.findOne({where: ids});
                let oldImage  = guide.image
                let certificateImage  = guide.certificate
                const lang = req.body.languages.join(",")

                if (guide) {
                    guide.name = req.body.name;
                    guide.surname = req.body.surname;
                    guide.country = req.body.country;
                    guide.city = req.body.city;
                    guide.languages = lang;
                    guide.age = req.body.age;
                    guide.experience = req.body.experience;
                    guide.gender = req.body.gender;
                    guide.description = req.body.description;

                    if (req?.files?.image) {
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

                    if(req?.files?.certificate){
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
                    res.redirect(`/admin/guides/update/${ids.id}`)
                } else {
                    res.status(404).json({ message: 'Event not found' });
                }
            }else{
                const errorObject = errors.array().reduce((acc, error) => {
                    acc[error.path] = error.msg;
                    return acc;
                }, {})
                    
                return res.render("./admin/guides-update", {layout: 'layouts/admin/top-side-bars', errors: errorObject, guide: {...req.body, id: req.params.id}});                  
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'An error occurred while updating the guide' });
        }
    }

    static async deleteGuideById(req, res){
        const ids = {
            id: req.params.id,
            userId: 1 // req.session.user_id  //UPDATE THIS IN PROD ENV
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
            res.redirect('/admin/guides')
        }else {
            res.status(404).json({ message: `Guide with ID ${ids.id} not found` });
        }
    }

    // Front Side
    static async getGuides(req, res){
        const guides = await Guides.findAll()

        if(guides != undefined){
            return res.render("guides", {layout: 'layouts/pagesheader', guides:guides});
        }else{
            return res.render("guides", {layout: 'layouts/pagesheader', guides:{}});
        }
    }

    static async getGuideById(req, res){
        const data = req.params
        const guide = await Guides.findOne({where: data, include: "tours"})
                
        if(guide != undefined){
            return res.render("guide-details", {layout: 'layouts/pagesheader', guide:guide});
        }else{
            return res.render("404", {layout: 'layouts/pagesheader'});

        }
    }
}

module.exports = Guide