const {Users} = require('../models')

class UserInfo{
    static async  userInfoReviews(req, res, reviews){
        let users = []
        if(reviews){
            for (let review of reviews){
                const user = await Users.findOne({where: review.userId, attributes: ['uname', 'image']})
                users.push(user.dataValues )
            }

            return users
        }else{
            return []
        }
    }
}

module.exports = UserInfo