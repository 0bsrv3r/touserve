const pool  = require('../db.js') 

class User{ 
    static async create(data){ 
        const db =  await pool.getConnection() 
        try { 
            const [result] = await db.execute("INSERT INTO users SET \
            uname=:uname, email=:email, password=:password, role=:role", data) 
            return [result] 
        } catch(e){ 
            console.log('error', e) 
            return 
        } finally { 
            db.release() 
        } 
    } 

    static async findById(id){ 
        const db =  await pool.getConnection() 
        try { 
            const [row] = await db.execute("SELECT * from users where id=:id", {id}) 
            return row[0] 
        } catch(e){ 
            console.log('error', e) 
            return 
        } finally { 
            db.release() 
        } 
    } 
} 

module.exports = User 