const slugify = require("slugify")
const fs = require('fs')
const path = require('path')

class FileUpload{

    // batch file upload
    static async batchFileUpload(req, res, file, location){
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

    // batch file delete
    static async batchFileDelete(req, res, file){
        if (file) {
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

    // single file upload
    static async singleFileUpload(req, res, file, location){
        let avatarPath = location + Date.now() + '-' + slugify(file.name,{ 
            lower: true, 
            strict: true 
        }) + '.' + file.name.split('.').pop();
        file.mv(avatarPath, err => { 
            if(err){ 
                return res.status(500).send(err); 
            } 
        })    
        return avatarPath
    }

    // single file delete
    static async singleFileDelete(req, res, file){
        if (file) {
            const fullPath = path.join("./", file);
            fs.unlink(fullPath, (err) => {
                if (err) {
                    return res.status(500).send('Failed to delete image file');
                }
            });
        }
    }
}

module.exports = FileUpload