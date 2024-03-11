## 개발환경
- JavaScript(ES6),NodeJS,Express.js, MySQL

## 개발목적
### 전반적인 JavaScript 사용, CRUD 숙달
- 게시판 - CRUD 기능, 조회수, 페이징 및 검색 처리
- 사용자 - Security 회원가입 및 로그인, OAuth 2.0 카카오,회원 정보 수정, 유효성 검사 및 중복 검사
- 댓글 - CRUD 기능


![image](https://github.com/junrari/notice_board/assets/66519544/1ff71f69-d76a-4f28-8919-f8062e85324a)

  
## file 구조



📦notice_board

 ┣ 📂public  
 ┃ ┣ 📂css   
 ┃ ┃ ┣ 📜contentStyles.css  
 ┃ ┃ ┣ 📜file.css  
 ┃ ┃ ┣ 📜reply.css  
 ┃ ┃ ┣ 📜styles.css  
 ┃ ┃ ┣ 📜user.css  
 ┃ ┃ ┗ 📜writeForm.css  
 ┃ ┣ 📂image  
 ┃ ┃ ┣ 📜kakaotalk.png  
 ┃ ┃ ┣ 📜like.png  
 ┃ ┃ ┣ 📜main.png  
 ┃ ┃ ┗ 📜photo.png  
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
