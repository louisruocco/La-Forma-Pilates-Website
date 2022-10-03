const title = document.querySelector(".title");
const invoiceItem = document.querySelectorAll(".invoice");

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
})