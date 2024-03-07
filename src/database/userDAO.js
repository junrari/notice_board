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

const userDB ={
    login : async(body)=>{
        try{
            const conn = await pool.getConnection();
            
            try{
                console.log('Connected to MySQL database.');
                const paramID = body.username;
                const paramPW = body.password;
                const values = [paramID,paramPW]
                console.log("param",values);
                const sql = `select * from user where username = ? and password = SHA2(?,224)`;
                const [result] = await conn.query(sql,values);
                console.log("유저 조회 결과:",result);
                    console.log("결과: ", result);
                    return result;
                
            } finally{
                conn.release();
            }
        } catch (error){
            console.error('MySQL에 연결 중 오류 발생:', error);
            throw error;
        }
    },
    idcheckDB: async(body)=>{
        try{
            const conn = await pool.getConnection();
            
            try{
                console.log('Connected to MySQL database.');
                const paramID = body.username;
                console.log("param",paramID);
                const sql = `select * from user where username = ?`;
                const [result] = await conn.query(sql,paramID);
                console.log("유저 조회 결과:",result);
    
                    return result;

            } finally{
                conn.release();
            }
        } catch (error){
            console.error('MySQL에 연결 중 오류 발생:', error);
            throw error;
        }
    },
    join: async(body)=>{
        try {
            const conn = await pool.getConnection();
            const fullname= body.fullname;
            const email= body.email;
            const username= body.username;
            const password= body.password;
            const param = [fullname,email,username,password];
            console.log("param:",param);
            try {
                console.log('Connected to MySQL database.');
                const sql = `insert into user (fullname, email, username, password) values (?,?,?,SHA2(?,224))`;
                const [result] = await conn.query(sql, param);
                console.log('Result dao: ', result);
            } finally {
                conn.release();
            }
        } catch (error) {
            console.error('MySQL에 연결 중 오류 발생:', error);
            throw error;
        }
    },
    edit_profile:async(data)=>{
        try {
            const conn = await pool.getConnection();
            const param= [data.image_path,data.username]
            console.log("param:!@#!@#!@#!@#!@#!@#!@#!@#!@#!@#",param);
            try {
                console.log('Connected to MySQL database.');
                const sql = 'update user set profile_image =? where username =?';
                const [result] = await conn.query(sql, param);
                console.log('Result dao: ', result);
            } finally {
                conn.release();
            }
        } catch (error) {
            console.error('MySQL에 연결 중 오류 발생:', error);
            throw error;
        }
    }

}

const social={

    getUserById: async(kakaoId) => {
        try {
            const conn = await pool.getConnection();
            const param= [kakaoId];
          
            console.log("param:",param);
            try {
                console.log('Connected to MySQL database.');
                const sql = `select * from  kakao_user where kakao_id = ?`;
                const [result] = await conn.query(sql, param);
                console.log('Result dao: ', result);
                return result[0];
            } finally {
                conn.release();
            }
        } catch (error) {
            console.error('MySQL에 연결 중 오류 발생:', error);
            throw error;
        }
    },
    kakaoAdduser: async(profile)=>{
        try {
            const conn = await pool.getConnection();
            console.log("이메일:!!!!!!",profile._json.kakao_account.email);
            const param= [profile.id,profile.displayName, profile._json.kakao_account.email, profile._json.properties.profile_image]
            console.log("param:",param);
            try {
                console.log('Connected to MySQL database.');
                const sql = 'insert into kakao_user(kakao_id,name,email,profile_image) values (?,?,?,?)';
                const [result] = await conn.query(sql, param);
                console.log('Result dao: ', result);
            } finally {
                conn.release();
            }
        } catch (error) {
            console.error('MySQL에 연결 중 오류 발생:', error);
            throw error;
        }
    },



}

module.exports = {userDB,social}