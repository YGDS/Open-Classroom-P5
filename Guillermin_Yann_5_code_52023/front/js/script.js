fetch("http://localhost:3000/api/products").then(function(res) {
    return res.json();
}).then(function(Article) {
    generate_article(Article);
})


//Generating all article from the fetch of products and setting href attribute to send to each product page

function generate_article(Article) {
  const myItems = document.getElementById("items");

  if (!Object.keys(Article).length) {
    alert("Error unable to access the API");
    return;
  }
  for (let i = 0; i < Article.length; i++) {
    const aElement = document.createElement("a");

    aElement.setAttribute("href", `./product.html?id=${Article[i]._id}`);

    const articleElement = document.createElement("article");

    const imageElement = document.createElement("img");
    imageElement.src = Article[i].imageUrl;
    imageElement.setAttribute("alt", Article[i].altTxt);
    articleElement.appendChild(imageElement);

    const titleElement = document.createElement("h3");
    titleElement.setAttribute("class", "productName")
    titleElement.innerText = Article[i].name;
    articleElement.appendChild(titleElement);

    const descriptionElement = document.createElement("p");
    descriptionElement.setAttribute("class", "productDescription")
    descriptionElement.innerText = Article[i].description;
    articleElement.appendChild(descriptionElement);

    aElement.appendChild(articleElement);
    myItems.appendChild(aElement);
  }
}
