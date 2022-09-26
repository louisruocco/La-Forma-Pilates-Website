const icons = document.querySelectorAll(".nav i");

icons.forEach(icon => {
    icon.addEventListener("mouseover", (e) => {
        const parent = e.target.parentElement;
        if(parent.tagName == "A"){
            const name = parent.children[1];
            name.style.display = "block";
        }
    })
})