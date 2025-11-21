







/* -------------------------------------
   QR Digital Menu & Ordering Platform
   Author: Project (Updated)
   ------------------------------------- */

// ✅ Example Menu Data with correct image URLs
const menuData = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic cheese pizza topped with tomato sauce and basil.",
    price: 299,
    image: "Margherita-Pizza-4.jpg"
  },
  {
    id: 2,
    name: "Veggie Burger",
    description: "Grilled plant-based patty with lettuce, tomato & cheese.",
    price: 199,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Pasta Alfredo",
    description: "Creamy white sauce pasta cooked with garlic and herbs.",
    price: 249,
    image: "pasta.jpeg"
  },
  {
    id: 4,
    name: "Cold Coffee",
    description: "Refreshing iced coffee topped with vanilla ice cream.",
    price: 149,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Cheese Sandwich",
    description: "Toasted sandwich with melting cheese and herbs.",
    price: 129,
    image: "chee.jpeg"
  },
  {
    id: 6,
    name: "French Fries",
    description: "Golden crispy fries served with tomato ketchup.",
    price: 99,
    image: "french.jpeg"
  },
  {
    id: 7,
    name: "Chicken Biryani",
    description: "Fragrant rice with tender chicken and Indian spices.",
    price: 349,
    image: "ckn.jpeg"
  },
  {
    id: 8,
    name: "Chocolate Cake",
    description: "Moist chocolate cake topped with rich frosting.",
    price: 179,
    image: "cake.jpeg"
  }
];

// ---------- Cart Setup ----------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ---------- Render Menu ----------
function renderMenu() {
  const menuContainer = document.querySelector(".menu");
  if (!menuContainer) return;
  menuContainer.innerHTML = "";

  menuData.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("menu-item");
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="menu-content">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p class="price">₹${item.price}</p>
        <button class="add-btn" onclick="addToCart(${item.id})">Add to Cart</button>
      </div>
    `;
    menuContainer.appendChild(div);
  });
}

// ---------- Add to Cart ----------
function addToCart(id) {
  const item = menuData.find(i => i.id === id);
  const existing = cart.find(i => i.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  saveCart();
  renderCart();
}

// ---------- Remove from Cart ----------
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

// ---------- Update Quantity ----------
function updateQuantity(id, change) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) removeFromCart(id);
    saveCart();
    renderCart();
  }
}

// ---------- Render Cart ----------
function renderCart() {
  const cartContainer = document.querySelector(".cart-items");
  const totalContainer = document.querySelector(".cart-total");
  if (!cartContainer) return;

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalContainer.textContent = "";
    return;
  }

  cart.forEach(item => {
    const li = document.createElement("li");
    li.classList.add("cart-item");
    li.innerHTML = `
      <span>${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}</span>
      <div>
        <button onclick="updateQuantity(${item.id}, 1)">+</button>
        <button onclick="updateQuantity(${item.id}, -1)">−</button>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
    cartContainer.appendChild(li);
  });

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  totalContainer.textContent = `Total: ₹${total}`;
}

// ---------- Save Cart ----------
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ---------- Checkout ----------
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert("✅ Order placed successfully!\nYour food will be served shortly.");
  cart = [];
  saveCart();
  renderCart();
}

// ---------- QR Code Generator ----------
function generateQR() {
  const tableInput = document.getElementById("tableNumber");
  const qrContainer = document.getElementById("qrCode");

  if (!tableInput || !qrContainer) return;

  const tableNumber = tableInput.value.trim();
  if (!tableNumber) {
    alert("Please enter a table number");
    return;
  }

  qrContainer.innerHTML = "";
  const qrData = `https://yourrestaurant.com/menu?table=${tableNumber}`;
  new QRCode(qrContainer, {
    text: qrData,
    width: 200,
    height: 200
  });
}

// ---------- Initialization ----------
document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
  renderCart();

  const checkoutBtn = document.querySelector(".checkout-btn");
  if (checkoutBtn) checkoutBtn.addEventListener("click", checkout);

  const qrBtn = document.getElementById("generateQRBtn");
  if (qrBtn) qrBtn.addEventListener("click", generateQR);
});
