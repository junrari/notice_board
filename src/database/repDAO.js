const mysql = require("mysql2/promise")
require('dotenv').config()
//mysql

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    debug: false,
    timezone: '+09:00'
})

const repInsert = {
    register: async(body) =>{
        try {
            const conn = await pool.getConnection();

            try {
                console.log('Connected to MySQL database.');
                const sql = `insert into reply(id,title,content,write_group) values (?,?,?,?)`;
                const param = [body.id,body.title,body.content,body.write_group]
                const [result] = await conn.query(sql,param);
                console.log('Result repDao: ',result);

                if (result.length === 0) {
                    throw new Error("데이터가 존재하지 않습니다");
                } else {
                    console.log("결과: ", result);
                    return result;
                }
            } finally {
                conn.release();
            }
        } catch (error) {
            console.error('MySQL에 연결 중 오류 발생:', error);
            throw error;
        }
    }
}

const repRead = {
    replyData: async (groupNum) => {
        try {
            const conn = await pool.getConnection();
            try {
                console.log('Connected to MySQL database.');
                console.log('groupNum',groupNum);
                const sql = `SELECT * FROM reply where write_group='${groupNum}' order by save_date desc`;
                const [result] = await conn.query(sql);
                
                if (result.length === 0) {
                    console.log("데이터가 존재하지 않습니다");
                } else {
                   // console.log("결과: ", result);
                    return result;
                }
            } finally {
                conn.release();
            }
        } catch (error) {
            console.error('MySQL에 연결 중 오류 발생:', error);
            throw error;
        }
    }
}

module.exports = {repInsert,repRead}