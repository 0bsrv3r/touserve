const pool  = require('../db.js') 

class Guides{ 
    static async create(data){ 
        const db =  await pool.getConnection() 
        try { 
            const [result] = await db.execute("INSERT INTO guides SET \
            companyId=:companyId, name=:name, surname=:surname, location=:location, languages=:languages,\
            visa=:visa, currency=:currency, description=:description, age=:age, experience=:experience, \
            gender=:gender, image=:image,\ certificate=:certificate", data) 
            return [result] 
        } catch(e){ 
            console.log('error', e) 
            return 
        } finally { 
            db.release() 
        } 
    } 

    static async findGuide(){ 
        const db =  await pool.getConnection() 
        try { 
            const [row] = await db.execute("SELECT * from guides") 
            return row 
        } catch(e){ 
            console.log('error', e) 
            return 
        } finally { 
            db.release() 
        } 
    }

    static async findGuideById(data){ 
        const db =  await pool.getConnection() 
        try { 
            const [row] = await db.execute("SELECT * from guides where id=:id", data) 
            return row
        } catch(e){ 
            console.log('error', e) 
            return 
        } finally { 
            db.release() 
        } 
    } 
} 

module.exports = Guides