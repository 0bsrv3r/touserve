
class Stars{
    
    static async starsCount(services){
        let starCount = 0

        
        for (const review of services.reviews){
            starCount += review.stars
        }
        const stars = Math.round(starCount/services.reviews.length)
        return stars
    }
}

module.exports = Stars