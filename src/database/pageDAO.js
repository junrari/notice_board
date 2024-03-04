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


const daoRead = {
    list: async (s, e) => {
        try {
            const conn = await pool.getConnection();

            try {
                console.log('Connected to MySQL database.');
                const sql1 = "SET @row_number = 0;";
                const sql = `SELECT * FROM (
                    SELECT @row_number := @row_number + 1 AS rn, A.*
                    FROM (SELECT * FROM paging ORDER BY num DESC) AS A
                ) AS numbered_rows
                WHERE rn BETWEEN ${s} AND ${e};`;
                const setrow = await conn.query(sql1) 
                const [result] = await conn.query(sql);

                if (result.length === 0) {
                    console.log("데이터가 존재하지 않습니다");
                    return 0;
                } else {
                    //console.log("결과: ", result);
                    return result;
                }
            } finally {
                conn.release();
            }
        } catch (error) {
            console.error('MySQL에 연결 중 오류 발생:', error);
            throw error;
        }
    },
    userContentList: async (s, e,userid) => { //수정중
        try {
            const conn = await pool.getConnection();

            try {
                console.log('Connected to MySQL database.');
                const sql1 = "SET @row_number = 0;";
                const sql = `SELECT * FROM (
                    SELECT @row_number := @row_number + 1 AS rn, A.*
                    FROM (SELECT * FROM paging where username = ? ORDER BY num DESC) AS A
                ) AS numbered_rows
                WHERE rn BETWEEN ? AND ?;`;
                const param = [userid,s,e];
                const setrow = await conn.query(sql1) 
                const [result] = await conn.query(sql,param);

                if (result.length === 0) {
                    console.log("데이터가 존재하지 않습니다");
                    return 0;
                } else {
                    //console.log("결과: ", result);
                    return result;
                }
            } finally {
                conn.release();
            }
        } catch (error) {
            console.error('MySQL에 연결 중 오류 발생:', error);
            throw error;
        }
    },
    userlikelist: async (s, e,userid) => { //수정중
        try {
            const conn = await pool.getConnection();

            try {
                console.log('Connected to MySQL database.');
                const sql1 = "SET @row_number = 0;";
                const sql = `SELECT * FROM (
                    SELECT @row_number := @row_number + 1 AS rn, A.*
                    FROM (SELECT paging.* FROM paging JOIN tb_like ON paging.num = tb_like.li_contentNum
                        where tb_like.li_username = ?   ORDER BY num DESC) AS A
                ) AS numbered_rows
                WHERE rn BETWEEN ? AND ?;`;
                const param = [userid,s,e]
                const setrow = await conn.query(sql1) 
                const [result] = await conn.query(sql,param);

                if (result.length === 0) {
                    console.log("데이터가 존재하지 않습니다");
                    return 0;
                } else {
                    //console.log("결과: ", result);
                    return result;
                }
            } finally {
                conn.release();
            }
        } catch (error) {
            console.error('MySQL에 연결 중 오류 발생:', error);
            throw error;
        }
    },
    content: async (num) => {
        try {
            const conn = await pool.getConnection();
            try {
                console.log('Connected to MySQL database.');
                const sql = `SELECT * FROM paging where num='${num}'`;
                const [result] = await conn.query(sql);

                if (result.length === 0) {
                    throw new Error("데이터가 존재하지 않습니다");
                } else {
                    
                    return result;
                }
            } finally {
                conn.release();
            }
        } catch (error) {
            console.error('MySQL에 연결 중 오류 발생:', error);
            throw error;
        }
    },
    totalContent: async () => {
        try {
            const conn = await pool.getConnection();

            try {
                console.log('Connected to MySQL database.');
                const sql = `SELECT count(*) FROM paging`;
                const [result] = await conn.query(sql);

                if (result.length === 0) {
                    throw new Error("데이터가 존재하지 않습니다");
                } else {
                    //console.log("결과: ", result);
                    return result;
                }
            } finally {
                conn.release();
            }
        } catch (error) {
            console.error('MySQL에 연결 중 오류 발생:', error);
            throw error;
        }
    },
    userliketotalContent: async (userid) => {
        try {
            const conn = await pool.getConnection();

            try {
                console.log('Connected to MySQL database.');
                const sql = `SELECT count(*) FROM tb_like where li_username= '${userid}'`;
                const [result] = await conn.query(sql);

                if (result.length === 0) {
                    throw new Error("데이터가 존재하지 않습니다");
                } else {
                    //console.log("결과: ", result);
                    return result;
                }
            } finally {
                conn.release();
            }
        } catch (error) {
            console.error('MySQL에 연결 중 오류 발생:', error);
            throw error;
        }
    },
    usertotalContent: async (userid) => {
        try {
            const conn = await pool.getConnection();

            try {
                console.log('Connected to MySQL database.');
                const sql = `SELECT count(*) FROM paging where username= '${userid}'`;
                const [result] = await conn.query(sql);

                if (result.length === 0) {
                    throw new Error("데이터가 존재하지 않습니다");
                } else {
                    //console.log("결과: ", result);
                    return result;
                }
            } finally {
                conn.release();
            }
        } catch (error) {
            console.error('MySQL에 연결 중 오류 발생:', error);
            throw error;
        }
    },
    
    pagetotalLike: async(num) =>{
        try {
            const conn = await pool.getConnection();

            try {
                console.log('Connected to MySQL database.');
                const sql = `SELECT count(*) FROM tb_like where li_contentNum=${num}`;
                const [result] = await conn.query(sql);

                if (result.length === 0) {
                    return 0;
                } else {
                    //console.log("결과: ", result);
                    return result;
                }
            } finally {
                conn.release();
            }
        } catch (error) {
            console.error('MySQL에 연결 중 오류 발생:', error);
            throw error;
        }
    },
    usertotalLike: async(username) =>{
        try {
            const conn = await pool.getConnection();
            try {
                console.log('Connected to MySQL database.');
                const sql = `SELECT * FROM tb_like where li_username='${username}'`;
                const [result] = await conn.query(sql);
                console.log("!!!!!!!!!!!!!!!!!!:",result);
                if (result.length === 0) {
                } else {
                    //console.log("결과: ", result);
                    return result; 
                }
            } finally {
                conn.release();
            }
        } catch (error) {
            console.error('MySQL에 연결 중 오류 발생:', error);
            throw error;
        }
    },
    isLike: async(body) =>{
        try {
            const conn = await pool.getConnection();
            console.log("!!!!!!!!!!!!!!!!!!:",body.username);
            try {
                console.log('Connected to MySQL database.');
                const sql = `SELECT * FROM tb_like where li_username='${body.username}' and li_contentNum='${body.postnum}'`;
                const [result] = await conn.query(sql);
                console.log("dao결과:",result);
                if (result.length === 0) {
                    return false;
                } else {
                    //console.log("결과: ", result);
                    return true; 
                }
            } finally {
                conn.release();
            }
        } catch (error) { 
            console.error('MySQL에 연결 중 오류 발생:', error);
            throw error;
        }
    }

};

const daoInsert = {
    write: async (body) => {
        try {
            const conn = await pool.getConnection();

            try {
                console.log('Connected to MySQL database.');
                const sql = `INSERT INTO paging (title, text, pdate, count,username,fullname,image_path) VALUES (?, ?, NOW(), 0,?,?,?)`;
                const param = [body.title,body.content,body.username,body.fullname,body.image_path];
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
};
const daoDelte = {
    delete: async (num) => {
        try {
            const conn = await pool.getConnection();

            try {
                console.log('Connected to MySQL database.');
                const sql = `DELETE FROM paging WHERE num = ?`;
                const param = [num];
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
};

const daoUpdate = {
    upHit: async (num) => {
        try {
            const conn = await pool.getConnection();

              // 'num' 값이 'undefined'인지 확인
            try {
                console.log('Connected to MySQL database.');
                const sql = `update paging set count=count+1 where num='${num}'`;
                const [result] = await conn.query(sql);

                if (result.length === 0) {
                    throw new Error("데이터가 존재하지 않습니다");
                } else {
                    //console.log("결과: ", result);
                }
            } finally {
                conn.release();
            }
        } catch (error) {
            console.error('MySQL에 연결 중 오류 발생:', error);
            throw error;
        }
    },
    likeplus: async(body)=>{
        try {
            const conn = await pool.getConnection();
             console.log("pagedao의 likeplus의 body: ",body); // 'num' 값이 'undefined'인지 확인
            try {
                console.log('Connected to MySQL database.');
                const sql = `INSERT INTO tb_like (li_username ,li_contentNum) VALUES (?,?)`;
                const param = [body.username,body.postnum];
                const [result] = await conn.query(sql, param);
                console.log('Result dao: ', result);

                if (result.length === 0) {
                    throw new Error("데이터가 존재하지 않습니다");
                } else {
                    //console.log("결과: ", result);
                }
            } finally {
                conn.release();
            }
        } catch (error) {
            console.error('MySQL에 연결 중 오류 발생:', error);
            throw error;
        }
    },
    likeminus: async(body)=>{
        try {
            const conn = await pool.getConnection();
             console.log("pagedao의 likeplus의 body: ",body); // 'num' 값이 'undefined'인지 확인
            try {
                console.log('Connected to MySQL database.');
                const sql = `DELETE FROM tb_like WHERE li_username = ? AND li_contentNum = ?`;
                const param = [body.username,body.postnum];
                const [result] = await conn.query(sql, param);
                console.log('Result dao: ', result);

                if (result.length === 0) {
                    throw new Error("데이터가 존재하지 않습니다");
                } else {
                    //console.log("결과: ", result);
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
module.exports = { daoRead, daoInsert, daoUpdate,daoDelte }
