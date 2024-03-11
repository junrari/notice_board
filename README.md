## 개발환경
- JavaScript(ES6),NodeJS,Express.js, MySQL

## 개발목적
### 전반적인 JavaScript 사용, CRUD 숙달
- 게시판 - CRUD 기능, 조회수, 페이징 및 검색 처리
- 사용자 - Security 회원가입 및 로그인, OAuth 2.0 카카오,회원 정보 수정, 유효성 검사 및 중복 검사
- 댓글 - CRUD 기능


![image](https://github.com/junrari/notice_board/assets/66519544/1ff71f69-d76a-4f28-8919-f8062e85324a)

## DB 구조
![image](https://github.com/junrari/notice_board/assets/66519544/4baf9c56-2398-4e86-982c-32efebf215ef)  


### user table
| 컬럼명 | 데이터 타입  | 조건  | 설명  |    
|------|---|---|---|   
|    rid  | int  | uq,autoi increase  | 고유값  |    
| fullname     | varchar  | not null  | 이름(닉네임)  |   
| email     | varchar  | not null  | 이메일  |    
| username     | varchar  | not null  | 아이디  |    
| password     | varchar  |   | 비밀번호  |    
| profile_image     | varchar  |   | 프로필  |    

### paging table
| 컬럼명 | 데이터 타입  | 조건  | 설명  |    
|------|---|---|---|   
|    num  | int  | pk,autoi increase  | 게시글 고유번호  | 
|    title  | varchar  | uq,autoi increase  | 제목  |    
| text     | varchar  | not null  | 내용  |   
| pdate     | varchar  | not null  | 생성날짜  |    
| count     | int  | not null  | 조회수  |   
| username     | varchar  | fk,not null  | 아이디  |    
| fullname     | varchar  | not null  | 이름(닉네임)  |    
| like_count     | int  |   | 좋아요 수  |    
| image_path     | varchar  |   | 첨부파일 경로  |    

### tb_like table  좋아요 테이블
| 컬럼명 | 데이터 타입  | 조건  | 설명  |    
|------|---|---|---|   
|    rid  | int  | pk,autoi increase  |  고유번호  | 
|    li_username  | varchar  | fk, not null  | 좋아요누른 유저아이디  |    
| li_contentNum     | int  | fk, not null  | 좋아요 누른 게시글번호  |   

### reply 답글 테이블
| 컬럼명 | 데이터 타입  | 조건  | 설명  |    
|------|---|---|---|   
|    rid  | int  | pk,autoi increase  |  고유번호  | 
|    id  | varchar  |  not null  |  답글단 유저아이디  |    
|    title  | varchar  |  not null  |  답글제목  |    
|    content  | varchar  |  not null  |  답글내용  |    
|    write_group  | int  | fk, not null  |  답글단 게시글번호  |    
| save_date     | datetime  | not null  | 답글단 시간  |  
|    name  | varchar  |  not null  | 답글단 유저이름   |  
 

## file 구조



📦notice_board

 ┣ 📂public  
 ┃ ┣ 📂css   
 ┃ ┣ 📂image  
 ┃ ┣ 📂js  
 ┃ ┃ ┣ 📜delete_post.js  
 ┃ ┃ ┣ 📜idcheck.js  
 ┃ ┃ ┣ 📜image_read.js  
 ┃ ┃ ┣ 📜join.js  
 ┃ ┃ ┣ 📜kakaoStrategy.js  
 ┃ ┃ ┣ 📜login.js  
 ┃ ┃ ┣ 📜reply.js  
 ┃ ┃ ┗ 📜reply_view.js  
 ┃ ┣ 📂profile  
 ┃ ┃ ┗ 📜default.png  
 ┃ ┗ 📂upload_file  
 ┃ ┃ ┗ 📜main.png  
 ┣ 📂src  
 ┃ ┣ 📂controller  
 ┃ ┃ ┣ 📜auth_controller.js  
 ┃ ┃ ┣ 📜page_controller.js  
 ┃ ┃ ┣ 📜rep_controller.js  
 ┃ ┃ ┗ 📜user_controller.js  
 ┃ ┣ 📂database  
 ┃ ┃ ┣ 📜pageDAO.js  
 ┃ ┃ ┣ 📜repDAO.js  
 ┃ ┃ ┗ 📜userDAO.js  
 ┃ ┣ 📂routes  
 ┃ ┃ ┣ 📜auth_router.js  
 ┃ ┃ ┣ 📜page_router.js  
 ┃ ┃ ┣ 📜rep_router.js  
 ┃ ┃ ┣ 📜router.js  
 ┃ ┃ ┗ 📜user_router.js  
 ┃ ┣ 📂service  
 ┃ ┃ ┣ 📜page_service.js  
 ┃ ┃ ┣ 📜rep_service.js  
 ┃ ┃ ┗ 📜user_service.js  
 ┃ ┗ 📂views  
 ┃ ┃ ┣ 📜content.ejs  
 ┃ ┃ ┣ 📜content_edit_form.ejs  
 ┃ ┃ ┣ 📜idcheck_form.ejs  
 ┃ ┃ ┣ 📜index.ejs  
 ┃ ┃ ┣ 📜join.ejs  
 ┃ ┃ ┣ 📜list.ejs  
 ┃ ┃ ┣ 📜login.ejs  
 ┃ ┃ ┣ 📜main.ejs  
 ┃ ┃ ┣ 📜mypage.ejs  
 ┃ ┃ ┣ 📜mypage_content.ejs  
 ┃ ┃ ┣ 📜mypage_edit.ejs  
 ┃ ┃ ┣ 📜mypage_like.ejs  
 ┃ ┃ ┣ 📜reply_form.ejs  
 ┃ ┃ ┗ 📜write_form.ejs  
 ┣ 📜.env  
 ┣ 📜app.js  
