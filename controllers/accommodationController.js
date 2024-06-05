const slugify = require("slugify")
const {Accommodations} = require("../models")

class Accommodation{
    static postAccommodation(req, res){
        console.log(req.body)
        // const errors = validationResult(req)
        
        // if(errors.isEmpty()){

            let images = []
            for(let i=0; i<req.files.images.length; i++) {
                let avatar = req.files.images[i]; 
                let avatarPath = 'upload/photos/accommodations/' + Date.now() + '-' + slugify(avatar.name,{ 
                    lower: true, 
                    strict: true 
                }) + '.' + avatar.name.split('.').pop();
                avatar.mv(avatarPath, err => { 
                    if(err){ 
                        return res.status(500).send(err); 
                    } 
                })
                images.push(avatarPath)
            }
            
            const data = {
                userId: req.session.user_id, 
                title: req.body.title, 
                location: req.body.location, 
                price: req.body.price,
                currency: req.body.currency,
                in: req.body.in,
                out: req.body.out,
                amenities: req.body.amenities,
                roomCount: req.body.roomCount,
                bedCount: req.body.bedCount,
                bathCount: req.body.bathCount,
                rules: req.body.rules,
                guestCount: req.body.guestCount,
                promotions: req.body.promotions,
                homeType: req.body.homeType,
                about: req.body.about,
                images: images
            } 

            Accommodations.create(data)
            res.redirect('/dashboard/accommodations')
        // }else{
        //     return Tour.getGuideName(req, res, errors)
        // } 
    }
}

module.exports = Accommodation