function filterProduct(value) {
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach((button) => {
        if (value.toUpperCase() == button.innerText.toUpperCase()) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });
    let elements = document.querySelectorAll(".product-box");
    elements.forEach((element) => {
        console.log(value);
        console.log(element);
        if (value == "all") {
            element.classList.remove("hide");
        } else {
            if (element.innerText.includes(value)) {
                element.classList.remove("hide");
                console.log(element);
            } else {
                element.classList.add("hide");
            }
        }
    });
}