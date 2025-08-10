// Book Constructor function
// 대문자인 이유? 생성자함수(관례)
function Book(title, author) {
	this.title = title
	this.author = author
}

//  UI Constructor function
function UI() {}
// 빈이유 :	UI 관련 메서드(예: 책 추가, 삭제, 경고 메시지 등)를 객체에 붙이기 위해

const titleEl = document.getElementById("title")
const authorEl = document.getElementById("author")
const bookSubmitEl = document.getElementById("book-form")
bookSubmitEl.addEventListener("submit", (e) => {
	e.preventDefault() //submit 제출해도 새로고침,이동 안됨

	const title = titleEl.value
	const author = authorEl.value

	//인스턴스객체생성
	const book = new Book(title, author)
	const ui = new UI() // ?

	//유효성체크
	if (title === "" || author === "") {
		console.log("error")
		ui.showAlert("모든 필드를 채워주세요.", "error")
	} else {
		// 책 리스트에 추가
		ui.addBookToList(book)
		// 성공 메시지 보여주기
		ui.showAlert("책이 추가되었습니다.", "success")
		//  필드를 초기화
		ui.clearFields()
	}
})

// 책 리스트에 추가
UI.prototype.addBookToList = function (book) {
	const list = document.getElementById("book-list")
	const row = document.createElement("tr")
	//<tr> 태그(테이블의 한 줄)를 새로 만드는 코드
	//  <tr>
	//     <td>책이름</td>
	//     <td>책저자</td>
	// </tr>

	row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td><a href="#" class="delete">X</a></td>
    `
	list.appendChild(row)
}

// 성공 메시지 보여주기
UI.prototype.showAlert = function (message, className) {
	const div = document.createElement("div")
	div.className = `alert ${className}`

	// <div class="alert success">
	//     성공했습니다.
	// </div>

	div.appendChild(document.createTextNode(message))

	const container = document.querySelector(".container")
	const form = document.querySelector("#book-form")
	container.insertBefore(div, form) //위의 div(알림메시지)를 폼 위에 삽입

	setTimeout(() => {
		document.querySelector(".alert").remove()
	}, 3000)
}

//  필드를 초기화
UI.prototype.clearFields = function () {
	titleEl.value = ""
	authorEl.value = ""
}

//책목록에서 ‘삭제(X)’ 버튼을 클릭했을 때 지우는 기능
const bookList = document.getElementById("book-list")
bookList.addEventListener("click", (e) => {
	const ui = new UI()

	ui.deleteBook(e.target)
	ui.showAlert("책이 지워졌습니다.", "success")
})

UI.prototype.deleteBook = function (target) {
	if (target.className === "delete") {
		target.parentElement.parentElement.remove()
	}
}

// target.parentElement는 <td>
// target.parentElement.parentElement는 <tr>
