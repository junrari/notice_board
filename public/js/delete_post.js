function delete_post(){
    let isConfirmed = confirm("정말로 삭제하시겠습니까?");

        if (isConfirmed) {
            // 예를 선택한 경우의 동작
            window.location.href = `/page/content/delete/${postnum}`
            alert("삭제되었습니다.");
        } else {
            // 아니오를 선택한 경우의 동작
            alert("삭제가 취소되었습니다.");
        }
}