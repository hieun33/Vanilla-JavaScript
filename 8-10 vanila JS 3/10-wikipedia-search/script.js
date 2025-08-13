const url =
	"https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=";

const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".form-input");
const resultsEl = document.querySelector(".results");

// 제출버튼 누를때 이벤트 감지
formEl.addEventListener("submit", (e) => {
	e.preventDefault();
	// 폼 제출 시 페이지 새로고침 방지 (preventDefault)
	const value = inputEl.value;
	if (!value) {
		resultsEl.innerHTML =
			'<div class="error"> 검색어를 작성해주세요. </div>';
		return;
	}
	fetchPages(value);
});

//검색결과 가져오기 너무어렵다.;;
const fetchPages = async (searchValue) => {
	resultsEl.innerHTML = '<div class="loading"></div>'; // 로딩 UI 표시
	try {
		const response = await fetch(`${url}${searchValue}`); // 위키피디아 API 호출
		const data = await response.json();
		console.log(data); //이데이타 콘솔에서 보기
		const results = data.query.search; //여기에 내용들어있음.
		if (results.length < 1) {
			resultsEl.innerHTML =
				'<div class="error"> 검색어에 맞는 결과가 없습니다.</div>';
		}
		renderResults(results);
	} catch (error) {
		resultsEl.innerHTML =
			'<div class="error">요청을 보내는데 에러가 있습니다.</div>';
	}
};

const renderResults = (list) => {
	const cardsList = list
		.map((item) => {
			const { title, snippet, pageid } = item;
			return `<a href=http://en.wikipedia.org/?curid=${pageid} target="_blank">
            <h4>${title}</h4>
            <p>
            ${snippet}
            </p>
        </a>
        `;
		})
		.join("");

	resultsEl.innerHTML = `<div class="articles">${cardsList} </div>`;
};
