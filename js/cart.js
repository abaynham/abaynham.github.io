// Initialize the page with products from the cart.
document.addEventListener("DOMContentLoaded", loadItems);

function loadItems() {
  fetch("./products.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    const items = JSON.parse(localStorage.getItem("cart"))["items"];
    console.log(items);

    let delivery = 4.00;
    let total = 0.00;

    if (items.length === 0) {
      addCartEmptyNotifier();
      delivery = 0.00;

      document.getElementById("checkout-button").onclick = function() {
        alert("Can't checkout, cart is empty!");
      }

    } else {

      for (let i = 0; i < items.length; i++) {
        const productId = items[i];
        const product = data["products"][productId];
        addItemToGrid(product, i);
        total += product.price;
      }

      document.getElementById("checkout-button").onclick = function() {
        document.location.href = `/checkout.html?subtotal=${total}&delivery=${delivery}&total=${total + delivery}`;
      }
    }

    document.getElementById("subtotal").innerHTML = `£${total}`;
    document.getElementById("delivery").innerHTML = `£${delivery}`;
    document.getElementById("total").innerHTML    = `£${total + delivery}`;
  })
}

// Creates some text telling the user their cart is empty.
/*
<p class="flex text-center text-2xl mx-auto">
    Cart is empty!
</p>
*/
function addCartEmptyNotifier() {
  const node = document.createElement("p");
  node.classList.add("flex", "text-center", "text-2xl", "mx-auto");
  node.innerHTML = "Cart is empty!";
  document.getElementById("product-list").appendChild(node);
}

// Creates a div that looks like this:
/*
<div class="flex flex-row h-32 rounded overflow-hidden shadow-md bg-gray-50 hover:shadow-xl hover:bg-gray-200">
    <img class="h-32 w-32 pb-4" src="img/hoodie.png"/>
    <div class="font-bold text-xl mb-2 mx-4 text-center">Test</div>
</div>
*/
function addItemToGrid(item, index) {
  const nameDiv = document.createElement("p");
  nameDiv.classList.add("font-bold", "text-xl", "my-auto", "mx-4", "text-center");
  nameDiv.innerHTML = item.name;

  const priceDiv = document.createElement("p");
  priceDiv.classList.add("text-lg", "my-auto", "mx-4");
  priceDiv.innerHTML = `£${item.price}`;

  // Remove button
  const removeButton = document.createElement("button");
  removeButton.classList.add("text-md", "my-auto", "mx-4", "text-gray-500");
  removeButton.innerHTML = "Remove";
  removeButton.onclick = function() {
    // Get current items in cart
    const currentItems = JSON.parse(localStorage.getItem("cart"))["items"];

    // Clone the array of items
    const newItems = Array.from(currentItems);

    // Remove the item
    newItems.splice(index, 1);

    // Set the localStorage to the new array
    localStorage.setItem("cart", JSON.stringify({"items": newItems}));

    // Remove all the products from the list
    const list = document.getElementById("product-list");
    while (list.hasChildNodes()) {
      list.removeChild(list.lastChild);
    }

    // Repopulate the list with the new array
    loadItems();
  }

  const lineDiv = document.createElement("div");
  lineDiv.appendChild(nameDiv);
  lineDiv.appendChild(priceDiv);
  lineDiv.appendChild(removeButton);

  const img = document.createElement("img");
  img.classList.add("h-32", "w-32", "pb-4");
  img.src = item.img;

  const node = document.createElement("div");
  node.classList.add("flex", "flex-row", "h-28", "rounded", "overflow-hidden", "shadow-sm", "bg-gray-50", "hover:shadow-md");

  node.appendChild(img);
  node.appendChild(lineDiv);

  document.getElementById("product-list").appendChild(node);
}

// Clears localStorage and removes all products from the list.
function clearCart() {
  localStorage.setItem("cart", JSON.stringify({"items": []}));
  const list = document.getElementById("product-list");
  while (list.hasChildNodes()) {
    list.removeChild(list.lastChild);
  }
  loadItems();
}
