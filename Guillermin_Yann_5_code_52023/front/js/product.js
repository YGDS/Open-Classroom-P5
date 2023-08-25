//importing function from cart.js to handle sending product to cart
import { send_to_cart } from './cart_handler.js';

//getting current product page search element in url and parsing it with replace  to remove ?id=

let url = window.location.search;
const my_id = url.replace("?id=", "");



//function to get one element by it's id and then displaying each element at their place on the page calling the set color function

async function display_product() {
    const reponse = await fetch(`http://localhost:3000/api/products/${my_id}`);
    const get_product = await reponse.json();
    if (!Object.keys(get_product).length) {
        alert("Error the product do not exist please be sure the url is correct");
        return;
    }
    const imgDisplay = document.getElementsByClassName("item__img");
    const imageElement = document.createElement("img");
    imageElement.src = get_product.imageUrl;
    imageElement.setAttribute("alt", get_product.altTxt);
    imgDisplay[0].appendChild(imageElement);
    const nameDisplay = document.getElementById("title");
    nameDisplay.innerText = get_product.name;
    const priceDisplay = document.getElementById("price");
    priceDisplay.innerText = get_product.price;
    const descriptionDisplay = document.getElementById("description");
    descriptionDisplay.innerText = get_product.description;
    set_color(get_product);
}

//simple function to add option element for each color available

function set_color(one_product) {
    const s = document.getElementById("colors");
    const option = one_product.colors;
    const nb_color = option.length;
    let opt;
    for (let i = 0; i < nb_color; i++) {
        opt = document.createElement("option");
        opt.value = option[i];
        opt.innerText = option[i];
        s.appendChild(opt);
    }

}

display_product();


//Event handler to send information from product page to cart

const button_add = document.getElementById("addToCart");

button_add.addEventListener("click", function() {
    const element1 = document.getElementById("colors");
    const colors = element1.value;
    const product_number = document.getElementById("quantity").value;
    if (product_number < 1 || !colors) {
        alert("Error: be sure to select a color and to put at least 1 item in the cart");
    } else {
        try {
            send_to_cart(my_id, colors, product_number);
        } catch (e) {
            console.error(e);
        }
    }

});