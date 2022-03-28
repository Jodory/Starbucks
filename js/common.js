const searchEl = document.querySelector('.search');
// .search클래스 내부에 input div
const searchInputEl = searchEl.querySelector('input')

searchEl.addEventListener('click', function() {
    //logic..
    //search가 클릭되면 포커스 되라
    //.search클래스 내부엔 input도 있고 icon도 있다.
    searchInputEl.focus();
});

//search클래스 내부에 input이 포커스 되면
// setAttribute(속성삽입)을 통해 통합검색 삽입by placeholder
searchInputEl.addEventListener('focus', function() {
    searchEl.classList.add('focused');
    searchInputEl.setAttribute('placeholder', '통합검색');
});

// blur == 포커스 아웃 // 되면 
// 속성을 삭제한다
searchInputEl.addEventListener('blur', function() {
    searchEl.classList.remove('focused');
    searchInputEl.setAttribute('placeholder', '');
});

const thisYear = document.querySelector(".this-year");
thisYear.textContent = new Date().getFullYear(); //2022