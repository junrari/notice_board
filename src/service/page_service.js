const dao =require("../database/pageDAO")
const pageOperation= (start,totalC)=>{
    let page ={};
    const pageNum = 5
    const num =(totalC%pageNum === 0)?0:1
    page.totalPage = parseInt(totalC/pageNum) + num
    page.startNum= (start-1)*pageNum+1
    page.endNum = start*pageNum
    return page;
}
const pageRead = {
    list :async (start,totalC) =>{  //전체 게시판 
        start =(start&&start>1)?Number(start) : 1
        const page = pageOperation(start,totalC)
        const list = await dao.daoRead.list(page.startNum,page.endNum)
        console.log("startNum:  "+page.startNum+ " endNum: "+page.endNum);
        data = {}
        data.page = page;
        data.start = start
        data.list = list
        console.log("page.ser.list의 data: ",data);
        return data;
    },
    userContentList :async (start,totalC,userid) =>{  //유저가 좋아요 누른 게시글 리스트
        start =(start&&start>1)?Number(start) : 1
        const page = pageOperation(start,totalC)
        const userlist = await dao.daoRead.userContentList(page.startNum,page.endNum,userid)
        console.log("startNum:  "+page.startNum+ " endNum: "+page.endNum);

        data = {}
        data.page = page;
        data.start = start
        data.list = userlist
        console.log("page.ser.list의 data: ",data);
        return data;
    },
    userlikelist :async (start,totalC,userid) =>{  //유저가 좋아요 누른 게시글 리스트
        start =(start&&start>1)?Number(start) : 1
        const page = pageOperation(start,totalC)
        const userlist = await dao.daoRead.userlikelist(page.startNum,page.endNum,userid)
        console.log("startNum:  "+page.startNum+ " endNum: "+page.endNum);

        data = {}
        data.page = page;
        data.start = start
        data.list = userlist
        console.log("page.ser.list의 data: ",data);
        return data;
    },
    content: async (num) =>{
        pageUpdate.upHit(num)
        const data = await dao.daoRead.content(num)
       
        return data[0];
    }, 
    totalContent: async ()=>{
        const totalContent = await dao.daoRead.totalContent();
        console.log("totalcount",totalContent[0]["count(*)"]);
        return totalContent[0]["count(*)"];
    },
    userliketotalContent: async (body)=>{
        const userliketotalContent = await dao.daoRead.userliketotalContent(body.username);
        console.log("userliketotalContent",userliketotalContent[0]["count(*)"]);
        return userliketotalContent[0]["count(*)"];
    },
    usertotalContent: async (body)=>{
        const usertotalContent = await dao.daoRead.usertotalContent(body.username);
        console.log("usertotalContent",usertotalContent[0]["count(*)"]);
        return usertotalContent[0]["count(*)"];
    }
}
const pageUpdate = {
    upHit: (num) =>{
        dao.daoUpdate.upHit(num)
    }
}
const pageInsert ={
    write: async(body) =>{
        await dao.daoInsert.write(body)
    }
}
const pageDelete ={
    delete: async(num) =>{
        await dao.daoDelte.delete(num)
    }
}
const likeServ = {
    pagelike : async(num)=>{
        const data = await dao.daoRead.pagetotalLike(num);
        console.log('pageservice의 like 결과:',data);
        return data[0]["count(*)"];
    },
    isLike: async(body)=>{
        const data = await dao.daoRead.isLike(body);
        console.log("pagserv의 isLike결과:",data);
        return data;
    },
    likeplus: async(body)=>{
        console.log("likeServ");
        await dao.daoUpdate.likeplus(body)
    },
    likeminus: async(body)=>{
        await dao.daoUpdate.likeminus(body)
    }
}
module.exports = {pageRead,pageInsert,likeServ,pageDelete}