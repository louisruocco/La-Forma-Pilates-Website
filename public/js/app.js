const title = document.querySelector(".title");
const invoiceItem = document.querySelectorAll(".invoice");
const nav = document.querySelector(".nav");
const overlay = document.querySelector(".overlay");
const welcome = document.querySelector(".welcome");
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

invoiceItem.forEach(item => {
    if(item.children[1].textContent === "pending"){
        item.style.background = "rgb(255, 204, 0)"
    } else {
        item.style.background = "seagreen"
        item.children[2].children[0].style.color = "black"
    }
});

window.addEventListener("scroll", () => {
    const topPosition = welcome.getBoundingClientRect().bottom / 40;
    const windowPosition = window.innerHeight / 25;
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

burger.addEventListener("click", () => {
    navLinks.classList.toggle("nav-active");
})