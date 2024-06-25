const { validationResult } = require("express-validator")
const slugify = require("slugify")
const {Guides} = require("../models")
const fs = require('fs');
const path = require('path');


class Guide{
    
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