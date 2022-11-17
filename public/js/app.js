const title = document.querySelector(".title");
const invoiceItem = document.querySelectorAll(".invoice");
const nav = document.querySelector(".nav");
const overlay = document.querySelector(".overlay");
const welcome = document.querySelector(".welcome");
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

invoiceItem.forEach(item => {
    if(item.children[3].textContent === "Status: pending"){
        item.style.background = "rgb(255, 204, 0)"
    } else {
        item.style.background = "seagreen"
        item.children[4].children[0].style.color = "black"
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
        navLinks.classList.remove("nav-active");
    }
});

burger.addEventListener("click", () => {
    navLinks.classList.toggle("nav-active");
});

const map = L.map('map').setView([51.650020024605986, -0.17265712127611482], 18);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const marker = L.marker([51.650020024605986, -0.17265712127611482]).addTo(map);