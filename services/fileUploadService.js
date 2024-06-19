const slugify = require("slugify")
const fs = require('fs')
const path = require('path')

class FileUpload{

    static async uploadFile(req, res, file, location){
        let images = []
        for(let i=0; i < file.length; i++) {
            let avatar = file[i]; 
            let avatarPath = location + Date.now() + '-' + slugify(avatar.name,{ 
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

        return images
    }

    static async deleteFile(req, res, file){
        if (file) {
            // delete image
            for(let filePath of file){
                const fullPath = path.join("./", filePath);
                fs.unlink(fullPath, (err) => {
                    if (err) {
                        return res.status(500).send('Failed to delete image file');
                    }
                });
            }
        }
    }
}

module.exports = FileUpload