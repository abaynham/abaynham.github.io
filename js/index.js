
document.addEventListener("DOMContentLoaded", function() {
  if (localStorage.length === 0) {
    localStorage.setItem("cart", JSON.stringify({
      "items": []
    }));
  }

  fetch("./products.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    data["products"].forEach(product => {
      makeGridItem(product.img, `product.html?id=${product.id}`, product.name, product.old_price, product.price);
    });
  })
});

// Construct a grid item div
// It will look something like this:
/*
    <div class="flex justify-center flex-col mx-auto">
    <img class="w-64 h-64 pb-6" src="img/product.png">

    <a href="./product.html?product=0">
        <p class="text-4xl hover:text-red-500">Product name</p>
    </a>
    
    <p>
        <span class="text-1xl line-through text-gray-500/90">£0.00</span>
        <span class="text-2xl">£0.00</span>
    </p>
    </div>
*/
function makeGridItem(img_src, a_href, name, old_price, price) {
  // Image tag
  let img = document.createElement("img");
  img.setAttribute("src", img_src);
  img.classList.add("w-64", "h-64", "pb-6", "mx-auto");

  // Name tag
  let name_link = document.createElement("a");
  let name_p = document.createElement("p");
  name_p.classList.add("text-4xl", "hover:text-red-500");
  name_p.innerHTML = name;
  name_link.setAttribute("href", a_href);
  name_link.appendChild(name_p);

  // Non-discount price, this will just get discarded if the item isn't on sale.
  let discounted_span = document.createElement("span");
  discounted_span.classList.add("text-1xl", "line-through", "text-gray-500/90", "mr-2");
  discounted_span.innerHTML = `£${old_price}`;

  // Current price, this always gets shown.
  let price_span = document.createElement("span");
  price_span.classList.add("text-2xl");
  price_span.innerHTML = `£${price}`;

  // Container for price texts
  let price_p = document.createElement("p");

  // This is where we decide whether or not to show the non-discount price.
  // Bascially if the old price is non-zero show it, otherwise ignore it.
  if (old_price !== 0) {
    price_p.appendChild(discounted_span);
  }
  price_p.appendChild(price_span);

  // Add all the elements we just made to the div
  let item = document.createElement("div");
  item.classList.add("flex", "justify-center", "flex-col", "mx-auto");
  item.appendChild(img);
  item.appendChild(name_link);
  item.appendChild(price_p);

  // Finally, add the div to the grid
  let grid = document.getElementById("product-grid");
  grid.appendChild(item);
}
