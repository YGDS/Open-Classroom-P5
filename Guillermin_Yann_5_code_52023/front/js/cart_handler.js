
//main function to add to cart, check if empty local-storage and create new object after checking value or sending 
//info to non-empty storage function

export function send_to_cart(product_id, product_color, product_number) {
    
    if (localStorage.getItem("user_cart") === null) {
        check_value(product_id, product_color);
        let array = [];
        let new_obj= new newobj(product_id, product_color, product_number);
        array.push(new_obj);
        window.localStorage.setItem("user_cart", JSON.stringify(array));
    } else {
        check_value(product_id, product_color);
        check_product(product_id, product_color, product_number);
    }
}

//handler for non-empty local storage by patern matching id then color, add number if perfect match or add new object if not

export function check_product(product_id, product_color, product_number) {
    let cart_list = JSON.parse(window.localStorage.getItem("user_cart"));
    if (search_id(cart_list, product_id) === true) {
        if (cart_list.find(cart_list => cart_list.color === `${product_color}`)) {
            let res = Number(cart_list.find(cart_list => cart_list.color === `${product_color}`).number);
            if (res + Number(product_number) > 100) {
                //lock the max input of product to 100
                res = 100;
            } else
                res = res + Number(product_number);
            cart_list.find(cart_list => cart_list.color === `${product_color}`).number = res;
            window.localStorage.removeItem("user_cart");
            window.localStorage.setItem("user_cart", JSON.stringify(cart_list))
        } else {
            let new_obj = new newobj(product_id, product_color, product_number);
            cart_list.push(new_obj);
            window.localStorage.removeItem("user_cart");
            window.localStorage.setItem("user_cart", JSON.stringify(cart_list))
        }
    } else {
        let new_obj = new newobj(product_id, product_color, product_number);
        cart_list.push(new_obj);
        window.localStorage.removeItem("user_cart");
        window.localStorage.setItem("user_cart", JSON.stringify(cart_list));
    }
}


//main function to check a product authentification and status

async function check_value(product_id, product_color) {
    const reponse = await fetch("http://localhost:3000/api/products");
    const all_value = await reponse.json();
    if (search_id(all_value, product_id) === false || !product_id) {
        alert("The product id is/are non existent or undefined");
        throw new Error("The product id is non existent or undefined");
    }
    if (search_colors(all_value, product_color) === false || !product_color) {
        alert("The product color(s) is/are non existent or undefined");
        throw new Error("The product color(s) is/are non existent or undefined");
    }
    return true;
}


//init new object by sending good value

function newobj(product_id, product_color, product_number) {
    this._id = product_id;
    this.color = product_color;
    this.number = product_number;
}

//search for valide id in a list of data sent

function search_id(value_list, product_id) {
    for (let i = 0; i < value_list.length; i++) {
        if (value_list[i]._id === product_id)
            return true;
    }
    return false;
}

//check for valid color so it work BUT it check every item color i might need to add smthg to only check one color but for now it work

function search_colors(all_value, product_color) {

    if (!product_color)
        return false;

    for (let i = 0; i < all_value.length; i++) {
        for (let j = 0; j < all_value[i].colors.length; j++) {
            if (all_value[i].colors[j] === product_color)
                return true;
        }
    }
    return false;
}