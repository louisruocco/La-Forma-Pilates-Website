const title = document.querySelector(".title");
const invoiceItem = document.querySelectorAll(".invoice");
const nav = document.querySelector(".nav");
const overlay = document.querySelector(".overlay");
const about = document.querySelector(".about");

window.addEventListener("load", () => {
    title.classList.add("title-appear");
});

invoiceItem.forEach(item => {
    if(item.children[1].textContent === "pending"){
        item.style.background = "rgb(255, 204, 0)"
    } else {
        item.style.background = "seagreen"
        item.children[2].children[0].style.color = "black"
    }
});

window.addEventListener("scroll", () => {
    const topPosition = about.getBoundingClientRect().top;
    const windowPosition = window.innerHeight / 15;
    console.log(windowPosition);
    console.log(topPosition);
    if(topPosition < windowPosition){
        nav.style.opacity = 1;
        nav.style.transition = ".3s ease";
        overlay.style.opacity = .7;
        overlay.style.transition = ".5s ease";
    } 

    if(topPosition > windowPosition){
        nav.style.opacity = 0;
        nav.style.transition = ".3s ease";
        overlay.style.opacity = 0;
        overlay.style.transition = ".5s ease";
    }
})

