fetch("http://localhost:3000/api/products").then(function(res) {
    return res.json();
}).then(function(Article) {
    generate_cart(Article);
    //making sure to call the event function AFTER generating the cart page
    edit_value(Article);
})



//generating user cart list

function generate_cart(Article) {
    let cart_list = JSON.parse(window.localStorage.getItem("user_cart"));
    if (cart_list == null || cart_list === undefined) {
        return;
    }
    const display_cart = document.getElementById("cart__items");

    for (let i = 0; i < cart_list.length; i++) {
  
        const articleElement = document.createElement("article");
        articleElement.setAttribute("class", "cart__item");
        articleElement.setAttribute("data-id", cart_list[i]._id);
        articleElement.setAttribute("data-color", cart_list[i].color);

        const picturediv = document.createElement("div");
        picturediv.setAttribute("class", "cart__item__img");
        
        const imageElement = document.createElement("img");
        imageElement.src = Article.find(Article => Article._id === `${cart_list[i]._id}`).imageUrl;
        imageElement.setAttribute("alt", Article.find(Article => Article._id === `${cart_list[i]._id}`).altTxt);
        picturediv.appendChild(imageElement);
        articleElement.appendChild(picturediv);


        const cart_item_content = document.createElement("div");
        cart_item_content.setAttribute("class", "cart__item__content");

        const cart_item_description = document.createElement("div");

        const titleElement = document.createElement("h2");
        titleElement.innerText = Article.find(Article => Article._id === `${cart_list[i]._id}`).name;
        cart_item_description.appendChild(titleElement);

        const colorElement = document.createElement("p");
        colorElement.innerText = cart_list[i].color;
        cart_item_description.appendChild(colorElement);

        const product_price_Element = document.createElement("p");
        product_price_Element.innerText = Article.find(Article => Article._id === `${cart_list[i]._id}`).price;
        cart_item_description.appendChild(product_price_Element);

        cart_item_content.appendChild(cart_item_description);
        

        const cart_item_settings = document.createElement("div");
        cart_item_settings.setAttribute("class", "cart__item__content__settings");

        const cart_item_quantity = document.createElement("div");
        cart_item_quantity.setAttribute("class", "cart__item__content__settings__quantity");

        const quantity_text = document.createElement("p");
        quantity_text.innerText = "Qté : ";
        cart_item_quantity.appendChild(quantity_text);

        const input_quantity = document.createElement("input");
        input_quantity.type = "number";
        input_quantity.setAttribute("class", "itemQuantity");
        input_quantity.setAttribute("name", "itemQuantity");
        input_quantity.setAttribute("min", "1");
        input_quantity.setAttribute("max", "100");
        input_quantity.setAttribute("value", cart_list[i].number);
        cart_item_quantity.appendChild(input_quantity);

        const delete_product = document.createElement("div");
        delete_product.setAttribute("class", "cart__item__content__settings__delete");

        const delete_btn = document.createElement("p");
        delete_btn.setAttribute("class", "deleteItem");
        delete_btn.innerText = "Supprimer";
        delete_btn.addEventListener("click", function() {
            cart_list.splice(i, 1);
            window.localStorage.removeItem("user_cart");
            window.localStorage.setItem("user_cart", JSON.stringify(cart_list));
            deleteChild()
            generate_cart(Article);
        });
        delete_product.appendChild(delete_btn);

        cart_item_settings.appendChild(cart_item_quantity);
        cart_item_settings.appendChild(delete_product);

        cart_item_content.appendChild(cart_item_settings);
        articleElement.appendChild(cart_item_content);
        display_cart.appendChild(articleElement);
    }
    refreshing_totcart(Article, cart_list);
}

//function to delete each element in the parent node

function deleteChild() {
    const e = document.getElementById("cart__items");

    let child = e.lastElementChild; 
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
}

//refresh nb of item and total price when editing quantity

function edit_value(Article) {
    const edit_btn = document.getElementsByClassName("itemQuantity");
    let cart_list = JSON.parse(window.localStorage.getItem("user_cart"));
    for (let i = 0; i < edit_btn.length; i++) {
        edit_btn[i].addEventListener("change", function() {
            if ( edit_btn[i].value < 1) {
                cart_list[i].number = 1;
                edit_btn[i].value = 1;
            } else
                cart_list[i].number = edit_btn[i].value;
            window.localStorage.removeItem("user_cart");
            window.localStorage.setItem("user_cart", JSON.stringify(cart_list));
            refreshing_totcart(Article, cart_list);
        });
    }
}

function refreshing_totcart(Article, cart_list) {
    let quantity_value = document.getElementById("totalQuantity");
    quantity_value.innerText = get_all_quantity(cart_list);
    let full_price = document.getElementById("totalPrice");
    full_price.innerText = get_full_price(Article ,cart_list);
}

//function that check each price for product and multiply it by the number of product in the cart

function get_full_price(Article, cart_list) {
    
    let add = 0;
    let res = 0;
    for (let i=0; i< cart_list.length; i++) {
        add = Number(Article.find(Article => Article._id === `${cart_list[i]._id}`).price) * cart_list[i].number;
        res = res + add;
    }
    return res;
}

//function to sum up all product in the cart list

function get_all_quantity(cart_list) {
    let res = 0;
    for (let i = 0; i < cart_list.length; i++) {
        res = res + Number(cart_list[i].number);
    }
    return res;
}

//function with regex to check good input in form

function handler_email() {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]*$/;
    let input = document.getElementById("email");
    if (input.value.match(validRegex)) {
        let alert_msg = document.getElementById("emailErrorMsg");
        alert_msg.innerText = "";
        return true;
    } else {
        let alert_msg = document.getElementById("emailErrorMsg");
        alert_msg.innerText = "Please enter a valid email";
        return false;
    }
}

document.getElementById("email").addEventListener('input', () => {
    handler_email();
})

function handler_fname() {
    let validRegex = /^([a-zA-Z])*$/;
    let input = document.getElementById("firstName");
    if (input.value.match(validRegex)) {
        let alert_msg = document.getElementById("firstNameErrorMsg");
        alert_msg.innerText = "";
        return true;
    } else {
        let alert_msg = document.getElementById("firstNameErrorMsg");
        alert_msg.innerText = "Please enter a valid first name";
        return false;
    }
}

document.getElementById("firstName").addEventListener('input', () => {
    handler_fname();
})

function handler_lname() {
    let validRegex = /^([a-zA-Z])*$/;
    let input = document.getElementById("lastName");
    if (input.value.match(validRegex)) {
        let alert_msg = document.getElementById("lastNameErrorMsg");
        alert_msg.innerText = "";
        return true;
    } else {
        let alert_msg = document.getElementById("lastNameErrorMsg");
        alert_msg.innerText = "Please enter a valid last name";
        return false;
    }
}

document.getElementById("lastName").addEventListener('input', () => {
    handler_lname();
})


function handler_address() {
    let validRegex = /^([a-zA-Z0-9.'-, ])*$/;
    let input = document.getElementById("address");
    if (input.value.match(validRegex)) {
        let alert_msg = document.getElementById("addressErrorMsg");
        alert_msg.innerText = "";
        return true;
    } else {
        let alert_msg = document.getElementById("addressErrorMsg");
        alert_msg.innerText = "Please enter a valid address";
        return false;
    }
}

document.getElementById("address").addEventListener('input', () => {
    handler_address();
})


function handler_city() {
    let validRegex = /^([a-zA-Z.'-, ])*$/;
    let input = document.getElementById("city");
    if (input.value.match(validRegex)) {
        let alert_msg = document.getElementById("cityErrorMsg");
        alert_msg.innerText = "";
        return true;
    } else {
        let alert_msg = document.getElementById("cityErrorMsg");
        alert_msg.innerText = "Please enter a valid city";
        return false;
    }
}

document.getElementById("city").addEventListener('input', () => {
    handler_city();
})

//insert all id in an array and create an object with good value before sending both as an object to add_comm

function set_data_form() {
    let products = [];
    let cart_list = JSON.parse(window.localStorage.getItem("user_cart"));

    for (let i=0; i<cart_list.length; i++) {
        products.push(cart_list[i]._id);
    }

    let contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
    }
    add_comm({products, contact});
}

//generating a post request and checking the json formated response  before save the id and sending to confirmation page

function add_comm(obj) {
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),

    }).then((response) => {
        return response.json();
    }).then((response) => {
        window.localStorage.removeItem("user_cart");
        let id = response.orderId;
        location.assign(`confirmation.html?id=${id}`);
    })
    .catch((error) => {
        alert("Une erreur est survenue", error);
    });
}

//function to check either form is empty or not conform with what is expected

function check_form() {
    let fname = document.getElementById("firstName").value;
    let lname = document.getElementById("lastName").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let email = document.getElementById("email").value;

    if ((fname === null || fname === "") || (lname === null || lname === "") || (address === null || address === "")
     ||(city === null || city === "") ||(email === null || email === "")) {
        return false;
    } else if (handler_email() === false || handler_fname() === false || handler_lname() === false || handler_address() === false ||
    handler_city() === false) {
        return false;
    } else
        return true;
}

//init the button to send the form

let cart_Form = document.getElementById("order");

cart_Form.addEventListener("click", (event) => {
    event.preventDefault();
    if (localStorage.getItem("user_cart") === null || JSON.parse(window.localStorage.getItem("user_cart")).length === 0) {
        alert("Erreur: Verifier d'avoir au moins 1 article dans votre panier");
        return;
    } else if (check_form() === false) {
        alert("Erreur please be sure to fill all required fields");
        return;
    } else {
        set_data_form();
    }
});

