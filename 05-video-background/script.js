const btnEl = document.querySelector('.switch-btn');
const videoEl = document.querySelector('.video-container');

btnEl.addEventListener("click", () => {
    if(!btnEl.classList.contains("slide")) {
        btnEl.classList.add("slide");
        videoEl.pause();
    } else {
        btnEl.classList.remove("slide");
        videoEl.play();
    }
})




const preloaderEl = document.querySelector('.preloader');


window.addEventListener("load", () => {
    preloaderEl.classList.add("hide-preloader");
})