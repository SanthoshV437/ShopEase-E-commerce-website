let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartBody = document.getElementById("cart-body");

function loadCart() {
  cartBody.innerHTML = "";

  let subtotal = 0;

  cart.forEach((item, index) => {
    let total = item.price * item.quantity;
    subtotal += total;

    cartBody.innerHTML += `
      <tr>
        <td><img src="${item.image}" width="60"></td>
        <td>${item.name}</td>
        <td>₹${item.price}</td>
        <td>
          <button onclick="changeQty(${index}, -1)">-</button>
          ${item.quantity}
          <button onclick="changeQty(${index}, 1)">+</button>
        </td>
        <td>₹${total}</td>
        <td><button onclick="removeItem(${index})">X</button></td>
      </tr>
    `;
  });

  document.getElementById("subtotal").innerText = "₹" + subtotal;
  let delivery = 2;
  document.getElementById("delivery").innerText = "₹" + delivery;

  document.getElementById("grand-total").innerText =
    "₹" + (subtotal + delivery);
}

function changeQty(index, value) {
  cart[index].quantity += value;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

loadCart();
