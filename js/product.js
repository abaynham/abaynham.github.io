// When the page is ready, load the mock DB file containing the products.
document.addEventListener("DOMContentLoaded", function() {
    fetch("./products.json")
    .then(response => {
      return response.json();
    })
    .then(data => {
      const id = getProductId();
      setProduct(data["products"][id]);
    })
});

function setProduct(product) {
    document.getElementById("product-img").src = product.img;
    document.getElementById("product-name").innerHTML = product.name;
    document.getElementById("product-price").innerHTML = product.price;

    if (product.old_price !== 0) {
        document.getElementById("product-og-price").innerHTML = `£${product.old_price}`;
    }
    document.getElementById("product-price").innerHTML = `£${product.price}`;
}

function addItem(id) {
    const currentCart = JSON.parse(localStorage.getItem("cart"));
    const newItems = Array.from(currentCart["items"]);
    newItems.push(id);

    localStorage.setItem("cart", JSON.stringify({
        "items": newItems
    }));

    console.log(JSON.parse(localStorage.getItem("cart")));

    alert("Item added to cart!");
}

function getProductId() {
    const params = new URLSearchParams(document.location.search);
    return params.get("id");
}
