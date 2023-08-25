
//function to catch the reponse of the post request and displaying the order id in the right place

const id = new URLSearchParams(window.location.search);

function displayID() {
    document.getElementById("orderId").textContent = id.get("id");
}


displayID();