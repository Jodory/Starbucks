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


const badgeEl = document.querySelector("header .badges");
const toTopEl = document.querySelector('#to-top');

// lodash cdn 이라고 구글에서 검색해서 긁어옴
//왜냐하면 eventlistner를 function()으로 직접 작성하여 구현하면 1ms 초당 갱신하기떄문에
//크기가 너무 커져서(무거워져서) 큰 웹프로그램 만들때 많이 버벅거림
window.addEventListener('scroll', _.throttle(function() {
    console.log(window.scrollY);
    if (window.scrollY > 500) {
        //배지숨기기
        //badgeEl.style.display = "none";
        //gsap cdn 구글에서 검색하여 삽입(애니매이션이 부족해서 )
        //gsap.to(요소(선택자('header .badges)도 가능은 하나 시간이 오래걸릴 수 있으므로 비추천), 지속시간(s), {옵션 by 객체});
        gsap.to(badgeEl, .6, {
                opacity: 0,
                display: "none"
            })
            //맨위로 올라가는 버튼 보이기
        gsap.to(toTopEl, .2, {
            x: 0
        });
    } else {
        //배지 다시 보이기
        //badgeEl.style.display = "block";
        gsap.to(badgeEl, .6, {
                opacity: 1,
                display: 'block'
            })
            //맨위로 올라가는 버튼 숨기기
        gsap.to(toTopEl, .2, {
            x: 100
        });
    }
}, 300)); //trottle을 lodash cdn 에서 가져와서 사용하면300ms = 3s임  -->
// _.throttle(함수(이벤트), 시간(ms초))


toTopEl.addEventListener('click', function() {
    gsap.to(window, .7, {
        // scrollTo를 사용하기 위해 gsap cdn에서 scroll plugin 스크립트 복사해서 넣어준거임
        scrollTo: 0
    })
})

const fadeEls = document.querySelectorAll(".visual .fade-in");

// 반복문: A.foreach(function({A의리스트중하나씩 꺼낼 요소, index})임
// A = [1,2,3,4] 일때
// A.foreach(function(a, index))        -> a = 1, index = 0 // a = 2, index= 1 순으로 나옴
// for (var index = 0; index < A.length; index++)  a = A[index] // == 와 똑같음 순서대로 나옴


fadeEls.forEach(function(fadeEl, index) {
    //gsap.to(요소, 지속시간(s), {옵션 by 객체});
    gsap.to(fadeEl, 1, {
        delay: (index + 1) * .7, //요소별로 0.7 1.4 2.1 2.7 순서로 나타남
        opacity: 1,
    })
});

// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
    direction: 'vertical', // 수직으로 슬라이드
    autoplay: true,
    loop: true
});

new Swiper('.promotion .swiper-container', {
    direction: 'horizontal', // 수평으로 슬라이드(근데 기본값이라 없애도 됨)
    slidesPerView: 3,
    spaceBetween: 10,
    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 5000
    },
    pagination: {
        el: '.promotion .swiper-pagination', //페이지 번호 요소 선택자
        clickable: true //사용자가 폐이지 번호 요소 제어
    },
    navigation: {
        prevEl: '.promotion .swiper-prev',
        nextEl: '.promotion .swiper-next'
    }
});


new Swiper('.awards .swiper-container', {
    direction: 'horizontal', // 수평으로 슬라이드(근데 기본값이라 없애도 됨)
    autoplay: true,
    loop: true,
    spaceBetween: 30,
    slidesPerView: 5,
    navigation: {
        prevEl: '.awards .swiper-prev',
        nextEl: '.awards .swiper-next'
    }
})



const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector(".toggle-promotion");
let isHidePromotion = false;

promotionToggleBtn.addEventListener("click", function() {
        isHidePromotion = !isHidePromotion
        if (isHidePromotion) {
            // 숨김처리!
            promotionEl.classList.add("hide");
        } else {
            // 보임처리
            promotionEl.classList.remove("hide");
        }
    })
    // 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
    // `.toFixed()`를 통해 반환된 문자 데이터를,
    // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
    //gsap.to(요소,시간,옵션);
    gsap.to(selector, random(1.5, 2.5), {
        y: size,
        repeat: -1, //repeat에 -1 대입시 무한반복
        yoyo: true, //역으로 애니매이션 진행
        ease: Power1.easeInOut, //google에 gsap easing으로 검색하여 소스 복사
        delay: random(0, delay)
    });
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

// 다시 공부 복습필요
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl) {

    new ScrollMagic.Scene({
        triggerElement: spyEl, //보여짐 여부를 감시할 요소를 지정
        triggerHook: .8 //요소 검사할 시작범위 지정
    }).setClassToggle(spyEl, 'show').addTo(new ScrollMagic.Controller());
})

const thisYear = document.querySelector(".this-year");
thisYear.textContent = new Date().getFullYear();