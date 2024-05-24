const pool  = require('../db.js') 

class Events{ 
    static async create(data){ 
        const db =  await pool.getConnection() 
        try { 
            const [result] = await db.execute("INSERT INTO events SET \
            userId=:userId, title=:title, description=:description, location=:location, date=:date, image=:image", data) 
            return [result] 
        } catch(e){ 
            console.log('error', e) 
            return 
        } finally { 
            db.release() 
        } 
    } 

    static async findEvent(){ 
        const db =  await pool.getConnection() 
        try { 
            const [row] = await db.execute("SELECT * from events") 
            return row 
        } catch(e){ 
            console.log('error', e) 
            return 
        } finally { 
            db.release() 
        } 
    } 
} 

module.exports = Events