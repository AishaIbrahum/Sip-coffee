document.addEventListener("DOMContentLoaded", () => {
  const cartItems = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty ☕</p>";
    return;
  }

  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <p>${item.price} SAR × ${item.qty}</p>
      </div>
      <button onclick="removeItem(${index})">✖</button>
    `;
    cartItems.appendChild(div);
  });

  totalEl.textContent = total;
});

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}
