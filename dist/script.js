const cartItemElements = window.document.querySelectorAll(
  ".cart__section--items .cart-item"
);
const cartItems = {};

cartItemElements.forEach((cartItemElement) => {
  const quantityElement = cartItemElement.querySelector(
    ".cart-item__quantity p"
  );
  const priceElement = cartItemElement.querySelector(".cart-item__price");

  const totalElement = cartItemElement.querySelector(".cart-item__total");

  const incrementButtonElement = cartItemElement.querySelector(".increment");
  const decrementButtonElement = cartItemElement.querySelector(".decrement");

  const cartItem = {
    incrementButtonElement,
    decrementButtonElement,

    quantityElement: quantityElement,
    quantity: Number(quantityElement.textContent),

    priceElement: priceElement,
    price: Number(priceElement.textContent.slice(1)),

    totalElement,
  };

  const aElement = cartItemElement.querySelector(".cart-item__label p a");

  const url = aElement.getAttribute("href");

  cartItems[url] = cartItem;
});

function adjustQuantity(cartItem, url, adjustment) {
  const quantity = cartItem.quantity;
  const newQuantity = Math.max(0, quantity + adjustment);

  const newItem = Object.assign({}, cartItem, {
    quantity: newQuantity,
  });

  cartItems[url] = newItem;
}

function updateCartItem(cartItem) {
  const price = cartItem.price;
  const quantity = cartItem.quantity;
  const newItemTotal = quantity * price;

  const quantityElement = cartItem.quantityElement;

  quantityElement.innerText = `${quantity}`;

  const totalElement = cartItem.totalElement;

  totalElement.innerText = `$${newItemTotal}`;
}

function updateCartTotals() {
  const cartSubtotalElement = document.querySelector("#cart-subtotal");

  const cartTotalElement = document.querySelector("#cart-total");

  let allItemsTotals = 0;

  for (const cartItemKey in cartItems) {
    const cartItem = cartItems[cartItemKey];
    const total = cartItem.quantity * cartItem.price;

    allItemsTotals = allItemsTotals + total;
  }

  cartSubtotalElement.innerText = `$${allItemsTotals}`;

  const totalWithShipping = allItemsTotals + 5;

  cartTotalElement.innerText = `$${totalWithShipping.toFixed(2)}`;
}

for (const cartItemKey in cartItems) {
  const { incrementButtonElement, decrementButtonElement } =
    cartItems[cartItemKey];

  decrementButtonElement.addEventListener("click", () => {
    adjustQuantity(cartItems[cartItemKey], cartItemKey, -1);
    updateCartItem(cartItems[cartItemKey]);
    updateCartTotals();
  });

  incrementButtonElement.addEventListener("click", () => {
    adjustQuantity(cartItems[cartItemKey], cartItemKey, 1);
    updateCartItem(cartItems[cartItemKey]);
    updateCartTotals();
  });
}
