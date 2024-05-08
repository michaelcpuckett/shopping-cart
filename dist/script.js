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

  console.log(quantityElement.textContent, priceElement.textContent);

  const cartItem = {
    incrementButtonElement,
    decrementButtonElement,

    quantityElement: quantityElement,
    quantity: Number(quantityElement.textContent),

    priceElement: priceElement,
    price: Number(priceElement.textContent.slice(1)),

    totalElement,
  };

  console.table(cartItem);

  const aElement = cartItemElement.querySelector(".cart-item__label p a");

  const url = aElement.getAttribute("href");

  cartItems[url] = cartItem;
});

function adjustQuantity(cartItem, url, adjustment) {
  const quantity = cartItem.quantity;
  const newQuantity = quantity + adjustment;

  cartItems[url] = {
    ...cartItem,
    quantity: newQuantity,
  };
}

/**
 * {newTotal: 0}
 * {newTotal: 21.98}
 *
 * value 10.99
 */

function updateCartItem(cartItem) {
  const price = cartItem.price;
  const quantity = cartItem.quantity;
  const newTotal = quantity * price;

  console.log({
    quantity,
    price,
    newTotal,
  });

  const quantityElement = cartItem.quantityElement;

  quantityElement.innerText = `${quantity}`;

  const totalElement = cartItem.totalElement;

  totalElement.innerText = `$${newTotal}`;
}

for (const cartItemKey in cartItems) {
  const cartItem = cartItems[cartItemKey];
  const { incrementButtonElement, decrementButtonElement } =
    cartItems[cartItemKey];

  decrementButtonElement.addEventListener("click", () => {
    adjustQuantity(cartItems[cartItemKey], cartItemKey, -1);
    updateCartItem(cartItems[cartItemKey]);
  });

  incrementButtonElement.addEventListener("click", () => {
    adjustQuantity(cartItems[cartItemKey], cartItemKey, 1);
    updateCartItem(cartItems[cartItemKey]);
  });
}
