const title = document.querySelector(".title");
const invoiceItem = document.querySelector(".invoice");
const invoice = document.querySelector(".invoice span");

window.addEventListener("load", () => {
    title.classList.add("title-appear");
})

console.log(invoice.textContent);

if(invoice.textContent = "Pending"){
    invoiceItem.style.background = "rgba(255, 230, 0, 0.644)";
} else {
    invoiceItem.style.background = "seagreen"
}