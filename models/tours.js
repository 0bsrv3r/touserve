const pool  = require('../db.js') 

class Tours{ 
    static async create(data){ 
        const db =  await pool.getConnection() 
        try { 
            const [result] = await db.execute("INSERT INTO tours SET \
            companyId=:companyId, guideId=:guideId, title=:title, category=:category, location=:location, departure=:departure,\
            duration=:duration, highlights=:highlights, inclusions=:inclusions, price=:price, currency=:currency, \
            overview=:overview, additional=:additional, images=:images", data) 
            return [result] 
        } catch(e){ 
            console.log('error', e) 
            return 
        } finally { 
            db.release() 
        } 
    } 

    static async findTours(){ 
        const db =  await pool.getConnection() 
        try { 
            const [row] = await db.execute("SELECT * from tours") 
            return row 
        } catch(e){ 
            console.log('error', e) 
            return 
        } finally { 
            db.release() 
        } 
    }

    static async findTourById(data){ 
        const db =  await pool.getConnection() 
        try { 
            const [row] = await db.execute("SELECT * from tours where id=:id", data) 
            return row
        } catch(e){ 
            console.log('error', e) 
            return 
        } finally { 
            db.release() 
        } 
    } 
} 

module.exports = Tours