## 개발환경
- JavaScript(ES6),NodeJS,Express.js, MySQL

## 개발목적
### 전반적인 JavaScript 사용, CRUD 숙달
- 게시판 - CRUD 기능, 조회수, 페이징 및 검색 처리
- 사용자 - Security 회원가입 및 로그인, OAuth 2.0 카카오,회원 정보 수정, 유효성 검사 및 중복 검사
- 댓글 - CRUD 기능


![image](https://github.com/junrari/notice_board/assets/66519544/1ff71f69-d76a-4f28-8919-f8062e85324a)

## DB 구조
![image](https://github.com/junrari/notice_board/assets/66519544/69c5d1a7-378e-4814-a2b7-6a2c36923b0a)



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
<details>
 
<summary> 파일구조 접기/펼치기 </summary>

```
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
```
</details>

## API 설계

### 게시글 관련 API
| 기능 | Method  | URL  |   
|------|---|---|  
|    게시글 전체목록 조회  |  GET | /page/list  |  
|    게시글 상세조회  |  GET | /page/list/content:num  |  
|    게시글 생성페이지  |  GET | /page/write_form  |   
|    게시글 생성  |  POST | /page/write  |  
|    게시글 수정페이지  |  GET | /contentEdit_form/:num  | 
|    게시글 수정  |  POST | /page/contentEdit  | 
|    게시글 삭제  |  GET | /page/content/delete/:num  |    
|    마이페이지 이동  |  GET | /page/mypage  | 
|    마이페이지 수정페이지  |  GET | /page/mypage  |     
|    좋아요상태 업데이트  |  POST | /page/update-like-status  |   

### 유저정보 관련 API
| 기능 | Method  | URL  |  
|------|---|---| 
|   로그인 페이지   |  GET | /user/login  | 
|    로그인 시도   | POST  | /user/login/loginuser  | 
|    회원가입 페이지  |GET| /user/join  |  
|    회원가입 중 id중복확인 페이지  |GET| /user/join/idcheck_form |  
|   회원가입 중 id중복확인   |GET| /user/checkDuplicated  | 
|  회원가입    | POST  | /user/joinuser  | 
|    로그아웃  |GET   | /user/logout  |  
|    이름(닉네임) 확인  | GET  | /user/namecheck  |  
|  프로필수정    |  POST | /user/profileEdit  |   

### 답글 관련 API
| 기능 | Method  | URL  |  
|------|---|---| 
|   답글등록   |  POST | /rep/register  | 
|   답글삭제   |  POST | /rep/repDelete  | 
|   답글조회   |  GET | /rep/replyData/:groupNum  | 

### 소셜 로그인 관련 API
| 기능 | Method  | URL  |  
|------|---|---| 
|   카카오 로그인 요청   |  GET | /auth/kakao  | 
|   카카오 로그인 콜백   |  GET | /auth/kakao/callback  | 
|   카카오 로그아웃   |  GET | /auth/kakao/logout  | 


## 와이어 프레임(화면 설계)

### 로그인 관련
<details> 
 
<summary>  접기/펼치기 </summary>

#### 로그인 페이지


![image](https://github.com/junrari/notice_board/assets/66519544/f33a34ff-bf1e-4d9d-b4b2-5ee24015ceba)

로그인은 자체 로그인과, 카카오톡API을 이용한 로그인 두 방식이 있다.

#### 자체 회원가입

![image](https://github.com/junrari/notice_board/assets/66519544/c3d07e84-7049-4b4f-b5e2-507b5159d3c5)

입력한 username과 password가 일치하지 않는다면, 알림창이 뜬다.

![ㄴㅇㅇㄴㄹ없음](https://github.com/junrari/notice_board/assets/66519544/83985d81-1ac5-4764-b77d-e2c446d01235) ![image](https://github.com/junrari/notice_board/assets/66519544/126a0dfa-d8b2-41dc-a052-54393dc57e6c)

use 버튼을 누르면 username에 자동으로 삽입된다.

![image](https://github.com/junrari/notice_board/assets/66519544/d6bda9f0-e251-4c71-accd-d869a916184c)
![image](https://github.com/junrari/notice_board/assets/66519544/0848cbd6-a8cf-4c59-9d69-9b9c1f899aed)![image](https://github.com/junrari/notice_board/assets/66519544/635d6983-5463-45b4-883a-c50f78beddad)

`insert into user (fullname, email, username, password) values (?,?,?,SHA2(?,224))`;
MySQL에서 제공하는 해시함수 SHA(?,224)을 이용해 암호화한다.

![image](https://github.com/junrari/notice_board/assets/66519544/778839cf-fadc-4814-8a92-18086516bd6d)


#### 카카오톡 로그인

![ㄴㅇㅇ2ㄴㄹ없음](https://github.com/junrari/notice_board/assets/66519544/e0124c9e-733f-40ac-9a2d-ccac53b05438)


![image](https://github.com/junrari/notice_board/assets/66519544/ae5113df-3618-41b4-b62b-a7aaa29e65a5)

</details>


### 게시글 관련
<details>
 
<summary>  접기/펼치기 </summary>

#### 1. 게시글 전체 목록
 ![image](https://github.com/junrari/notice_board/assets/66519544/70a00c6f-e975-4e05-a710-7f60d8860bcf)

로그인을 하지않아도 확인 가능

### 2. 게시글 등록
![image](https://github.com/junrari/notice_board/assets/66519544/1573d754-3546-4dd7-9e2f-4fd2538322c7)

![제목 없음](https://github.com/junrari/notice_board/assets/66519544/33a445ae-2266-44c5-a625-ca88096c348d)


사진 선택을 통해 사진을 등록할수 있고, 미리보기 버튼을 눌러 이미지를 미리 확인 할 수 있다.


#### 3. 게시글 상세조회


![image](https://github.com/junrari/notice_board/assets/66519544/5b9087d9-cdc7-49ce-8423-362fe5d0b79a)

로그인을 하지 않아도 게시글과 답글 상세조회는 가능하지만, 좋아요 및 답변은 등록할 수 없음.


![제목 없음](https://github.com/junrari/notice_board/assets/66519544/79389dbf-dfd6-4432-ba5e-9df3d8208160)


로그인시 좋아요를 누른 게시글이면, 좋아요 버튼이 빨강색으로 되어있음.
또한 수정 삭제 버튼이 나타남.

![image](https://github.com/junrari/notice_board/assets/66519544/d5375366-21f5-4f91-a8d3-a38c96f68e7a)
좋아요를 안누른 게시글이면, 좋아요 버튼을 눌러 전체 좋아요수를 추가할수 있다.





#### 4. 게시글 수정
![image](https://github.com/junrari/notice_board/assets/66519544/eb47578b-4ff5-4bb3-9bc3-00304fe7f062)

제목과 내용, 사진첨부를 수정할 수 있다.

#### 5. 마이페이지

![제목 없음](https://github.com/junrari/notice_board/assets/66519544/4c87ab38-9a6c-454d-a5c7-99361212379d)

로그인 시 마이페이지로 이동이 가능하다.

![제1목 없음](https://github.com/junrari/notice_board/assets/66519544/7f48d856-4743-4511-a270-6cf7027c7cc4)

![제12목 없음](https://github.com/junrari/notice_board/assets/66519544/c9b01317-e5d4-46aa-881b-e5e7d173c20f)

마이페이지로 이동시, 내가 작성한게시글과 좋아요를 누른 게시글을 확인 할수 있다.

![제1ㄴ2목 없음](https://github.com/junrari/notice_board/assets/66519544/0f1297b6-9d70-4916-b9e3-72e57c3678d2)

회원정보 수정버튼을 누르면 수정할수 있는 창으로 이동한다.


![제1ㄴㄴ2목 없음](https://github.com/junrari/notice_board/assets/66519544/50ab1a70-9a1b-4711-91b4-40ee380124d8)

프로필 사진과, 닉네임(이름)을 수정할수 있는데, 닉네임은 중복확인 후 수정이 가능하다.

![제1ㄴㄴㄴ2목 없음](https://github.com/junrari/notice_board/assets/66519544/44963f9c-fe77-4467-bf17-289b85f1c643)

![image](https://github.com/junrari/notice_board/assets/66519544/30871ddd-3e44-4643-bde6-2053ce61a116)

![ㄴㅇㄹ없음](https://github.com/junrari/notice_board/assets/66519544/ceaefb89-a6ed-4df1-b9d5-dfa72f76b15e)

![image](https://github.com/junrari/notice_board/assets/66519544/96557f46-4482-4042-8846-d49da88e3aa8)

![image](https://github.com/junrari/notice_board/assets/66519544/b762e04c-ac91-452b-b0d9-f561ba790c47)

![image](https://github.com/junrari/notice_board/assets/66519544/b5f831d7-1504-408a-8800-a6004fde12af)

![image](https://github.com/junrari/notice_board/assets/66519544/6ddda967-23c9-48ec-95c9-38872059991a)

![image](https://github.com/junrari/notice_board/assets/66519544/6892a949-b1eb-41e5-abad-f825733cd243)


프로필사진과 닉네임(이름)이 바뀐것을 확인할 수 있다.


</details>

### 답글 관련
<details>
 
<summary>  접기/펼치기 </summary>

#### 1. 답글 조회
![image](https://github.com/junrari/notice_board/assets/66519544/4bde820b-558c-4a32-8154-1f16bc0ca14d)


#### 2. 답글 등록
 ![image](https://github.com/junrari/notice_board/assets/66519544/319f2d04-5f7a-4412-bc7b-4d96d2ca584d)

 로그인한 유저는 답글 등록이 가능하고, 답글 등록시

 ![image](https://github.com/junrari/notice_board/assets/66519544/5362efa3-9b71-4652-ac8f-9915b92eeeff)

 답글리스트를 reload한다.


#### 3. 답글 삭제

![ㄴㅇㅇㄴㅇ2ㄴㄹ없음](https://github.com/junrari/notice_board/assets/66519544/878b7d1b-82e9-40c3-8dc8-ecc83503674a)



</details>


