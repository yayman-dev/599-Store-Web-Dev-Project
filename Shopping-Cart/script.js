//Fetching From API
fetch('https://dummyjson.com/products').then((data) => {
    // console.log(data);
    return data.json()
}).then((completedata) => {
    // console.log(completedata.products[0].title);
    let data1 = "";
    completedata.products.map((values) => {
        data1 += `<div class="product-box hide">
        <img src= ${values.images[0]} alt="" class="product-img">
        <h2 class="product-title">${values.title}</h2>
        <span class = "price">$${values.price}</span>
        <i class = 'bx bx-shopping-bag add-cart'></i>
       <span class = "category hide">${values.category}</span>
    </div>`
    })
    document.getElementById("content").innerHTML = data1;
}).then(() => {
    ready();
}).catch((err) => {
    console.log(err);
})
//cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
//Open Cart
cartIcon.onclick = () => {
    cart.classList.add("active");
}
//Close Cart
closeCart.onclick = () => {
    cart.classList.remove("active");
}
flag = true;
// cart Working JS
// if (document.readyState == "loading") {
//     document.addEventListener('DOMContentLoaded', ready)
// }
//  else {
//     ready();
// }
//Making Function
function ready() {
    // Search
    let search = document.querySelector(".search-icon");
    search.onclick = function () {
        document.querySelector(".search-bar").classList.toggle('active');
        inp.classList.toggle("hide");
    }
    //Search Element
    document.getElementById("inp").addEventListener("keypress", () => {
        let searchInput = document.getElementById("inp").value;
        let Elements = document.querySelectorAll(".product-title");
        let cards = document.querySelectorAll(".product-box");

        Elements.forEach((element, index) => {
            if (element.innerText.includes(searchInput.toUpperCase())) {
                cards[index].classList.remove("hide");
            }
            else {
                cards[index].classList.add("hide");
            }
        });

    });
    //Remove Items From Cart
    var removeCartButton = document.getElementsByClassName("cart-remove");
    // console.log(removeCartButton[0])
    for (let index = 0; index < removeCartButton.length; index++) {
        var button = removeCartButton[index];
        button.addEventListener("click", reomoveCartItem)
    }
    //Quantity Changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    //Add to Cart
    var addCart = document.getElementsByClassName('add-cart');
    console.log(addCart.length);
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    //Buy Button Work
    document.getElementsByClassName('btn-buy')[0].addEventListener("click", buyButtonClicked);
}
//filter buttons


// function filterProduct(value) {
//     let buttons = document.querySelectorAll(".button-value");
//     buttons.forEach(button => {
//         // Value Checking
//         if (value.toUpperCase() == button.innerText.toUpperCase()) {
//             button.classList.toggle("active");
//                 Check(value);
//         }
//         else {
//             button.classList.remove("active");
//         }
//     });
// }

// function Check(value) {
//     let elements = document.querySelectorAll(".product-box");
//     elements.forEach((element) => {
//         if (element.innerText.includes(value)) {
//             element.classList.remove("hide");
//             // console.log(element.innerText.includes(value));
//         }
//         else {
//             element.classList.add("hide");
//             // console.log(element.classList.contains(value));
//         }
//     });
// }

// Buy Button
function buyButtonClicked() {
    if (flag) {
        alert('Cart is Empty');
    }
    else {
        alert('Your Order is Placed');
        var cartContent = document.getElementsByClassName('cart-content')[0];
        flag = true;
        while (cartContent.hasChildNodes()) {
            cartContent.removeChild(cartContent.firstChild);
        }
        updatetotal();
    }
}


//remove Items from cart
function reomoveCartItem(event) {
    // console.log(closed)
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}
//Quantity changes
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}
// Add to cart
function addCartClicked(event) {
    flag = false;
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}
function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (let i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert('You have already have this item');
            return;
        }
    }
    var cartBoxContent =
        `<img src=${productImg} alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <!-- Remove Cart-->
    <i class='bx bxs-trash-alt cart-remove'></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener("click", reomoveCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener("change", quantityChanged);
}


//Update Total
function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (let index = 0; index < cartBoxes.length; index++) {
        var cartBox = cartBoxes[index];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ""))
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    // if price is a float
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText = "$" + total;


}