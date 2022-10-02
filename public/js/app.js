const title = document.querySelector(".title");
const invoiceItem = document.querySelectorAll(".invoice");

window.addEventListener("load", () => {
    title.classList.add("title-appear");
});

invoiceItem.forEach(item => {
    if(item.children[0].textContent === "Pending"){
        item.style.background = "yellow"
    } else {
        item.style.background = "seagreen"
        item.children[1].children[0].style.color = "black"
    }
})