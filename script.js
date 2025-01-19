const cart = [];
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('#cart-items');
const cartTotal = document.querySelector('#cart-total');
const cartTax = document.querySelector('#cart-tax');
const cartGrandTotal = document.querySelector('#cart-grand-total');
const cartToggle = document.querySelector('.cart-toggle');
const closeCartBtn = document.querySelector('#close-cart');

// Add item to cart
document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    
    // Add item to cart or update quantity
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    updateCart();
  });
});

// Update cart content
function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</span>
      <div class="quantity-adjust">
        <button class="decrease">-</button>
        <input type="number" value="${item.quantity}" readonly />
        <button class="increase">+</button>
        <button class="remove">Remove</button>
      </div>
    `;
    cartItems.appendChild(li);

    // Decrease Quantity
    li.querySelector('.decrease').addEventListener('click', () => {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cart.splice(cart.indexOf(item), 1);
      }
      updateCart();
    });

    // Increase Quantity
    li.querySelector('.increase').addEventListener('click', () => {
      item.quantity++;
      updateCart();
    });

    // Remove Item
    li.querySelector('.remove').addEventListener('click', () => {
      cart.splice(cart.indexOf(item), 1);
      updateCart();
    });
  });

  // Calculate total and GST
  const gst = total * 0.18; // Assuming GST is 18%
  const grandTotal = total + gst;

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  cartTax.textContent = `GST (18%): $${gst.toFixed(2)}`;
  cartGrandTotal.textContent = `Grand Total: $${grandTotal.toFixed(2)}`;

  // Update Cart Count
  document.querySelector('#cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Toggle Cart Overlay
cartToggle.addEventListener('click', () => {
  cartOverlay.style.display = 'flex';
});

closeCartBtn.addEventListener('click', () => {
  cartOverlay.style.display = 'none';
});
