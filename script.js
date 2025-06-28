// Sample product data
const products = [
{
id: 1,
name: "Seasoned Oak Firewood",
price: 120,
category: "firewood",
image: "https://images.unsplash.com/photo-1511882150382-421056c89033",
description: "Premium seasoned oak firewood with low moisture content. Perfect for long-lasting, hot fires. Each cord contains approximately 128 cubic feet of premium wood."
},
{
id: 2,
name: "Kiln-Dried Birch Firewood",
price: 140,
category: "firewood",
image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25",
description: "Kiln-dried birch for efficient burning with minimal smoke and sparks. Ideal for indoor fireplaces. Each cord contains approximately 128 cubic feet of premium wood."
},
{
id: 3,
name: "Mixed Hardwood Bundle",
price: 100,
category: "firewood",
image: "https://images.unsplash.com/photo-1511882150382-421056c89033",
description: "A blend of premium hardwoods including maple, oak, and ash. Great value and performance. Each bundle contains approximately 0.75 cubic feet of wood."
},
{
id: 4,
name: "Wooden Coffee Table",
price: 350,
category: "furniture",
image: "https://images.unsplash.com/photo-1503602642458-232111445657",
description: "Handcrafted solid wood coffee table with a natural finish. Perfect for your living room. Dimensions: 48\"L x 24\"W x 18\"H."
},
{
id: 5,
name: "Rustic Bookshelf",
price: 450,
category: "furniture",
image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e",
description: "Beautiful rustic bookshelf made from reclaimed wood. Ample storage with a charming look. Dimensions: 60\"H x 36\"W x 12\"D."
},
{
id: 6,
name: "Oak Dining Table",
price: 850,
category: "furniture",
image: "https://images.unsplash.com/photo-1556911220-ef412aeaedf0",
description: "Sturdy oak dining table that seats 6-8 people. Built to last for generations. Dimensions: 72\"L x 40\"W x 30\"H."
},
{
id: 7,
name: "Firewood Storage Rack",
price: 89,
category: "accessories",
image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91",
description: "Durable metal rack for storing and organizing firewood. Keeps wood dry and accessible. Holds up to 1/2 cord of firewood."
},
{
id: 8,
name: "Fireplace Tool Set",
price: 75,
category: "accessories",
image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
description: "Complete 5-piece fireplace tool set with stand. Includes poker, shovel, brush, tongs, and stand."
},
{
id: 9,
name: "Fire Starter Kit",
price: 25,
category: "accessories",
image: "https://images.unsplash.com/photo-1575919988855-f727358015b1",
description: "Everything you need to start a perfect fire. Includes fire starters, kindling, and matches."
}
];
// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
// DOM Elements
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');
const featuredProductsContainer = document.getElementById('featuredProducts');
const allProductsContainer = document.getElementById('allProducts');
const placeOrderBtn = document.getElementById('placeOrder');
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const filterButtons = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contactForm');
// Initialize the page
function init() {
// Render products based on current page
if (featuredProductsContainer) {
renderFeaturedProducts();
}
if (allProductsContainer) {
renderAllProducts();
setupFilters();
}
updateCartCount();
// Event listeners
cartIcon.addEventListener('click', openCart);
if (closeCart) closeCart.addEventListener('click', closeCartModal);
if (placeOrderBtn) placeOrderBtn.addEventListener('click', placeOrder);
hamburger.addEventListener('click', toggleNav);
// Close cart when clicking outside
window.addEventListener('click', (e) => {
if (e.target === cartModal) {
closeCartModal();
}
});
// Contact form submission
if (contactForm) {
contactForm.addEventListener('submit', handleContactForm);
}
// Initialize testimonials if on homepage
if (document.querySelector('.testimonial-container')) {
initTestimonials();
}
}
// Render featured products to the homepage
function renderFeaturedProducts() {
featuredProductsContainer.innerHTML = '';
// Get 6 featured products
const featuredProducts = products.slice(0, 6);
featuredProducts.forEach(product => {
const productCard = document.createElement('div');
productCard.className = 'product-card';
productCard.innerHTML = `
<div class="product-img">
<img src="${product.image}" alt="${product.name}">
</div>
<div class="product-info">
<h3>${product.name}</h3>
<p>${product.description}</p>
<div class="product-price">$${product.price.toFixed(2)}</div>
<div class="product-actions">
<button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
</div>
</div>
`;
featuredProductsContainer.appendChild(productCard);
});
// Add event listeners to add-to-cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
button.addEventListener('click', (e) => {
const productId = parseInt(e.target.getAttribute('data-id'));
addToCart(productId);
});
});
}
// Render all products to the products page
function renderAllProducts() {
allProductsContainer.innerHTML = '';
products.forEach(product => {
const productCard = document.createElement('div');
productCard.className = 'product-card';
productCard.dataset.category = product.category;
productCard.innerHTML = `
<div class="product-img">
<img src="${product.image}" alt="${product.name}">
</div>
<div class="product-info">
<h3>${product.name}</h3>
<p>${product.description}</p>
<div class="product-price">$${product.price.toFixed(2)}</div>
<div class="product-actions">
<button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
</div>
</div>
`;
allProductsContainer.appendChild(productCard);
});
// Add event listeners to add-to-cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
button.addEventListener('click', (e) => {
const productId = parseInt(e.target.getAttribute('data-id'));
addToCart(productId);
});
});
}
// Setup product filters
function setupFilters() {
filterButtons.forEach(button => {
button.addEventListener('click', () => {
// Update active button
filterButtons.forEach(btn => btn.classList.remove('active'));
button.classList.add('active');
// Filter products
const filter = button.dataset.filter;
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
if (filter === 'all' || card.dataset.category === filter) {
card.style.display = 'block';
} else {
card.style.display = 'none';
}
});
});
});
}
// Initialize testimonials
function initTestimonials() {
const testimonialContainer = document.querySelector('.testimonial-container');
const testimonials = document.querySelectorAll('.testimonial-slide');
let currentIndex = 0;
// Show first testimonial
testimonials[currentIndex].classList.add('active');
// Rotate testimonials every 5 seconds
setInterval(() => {
testimonials[currentIndex].classList.remove('active');
currentIndex = (currentIndex + 1) % testimonials.length;
testimonials[currentIndex].classList.add('active');
}, 5000);
}
// Add product to cart
function addToCart(productId) {
const product = products.find(p => p.id === productId);
if (product) {
const existingItem = cart.find(item => item.id === productId);
if (existingItem) {
existingItem.quantity += 1;
} else {
cart.push({
id: product.id,
name: product.name,
price: product.price,
image: product.image,
quantity: 1
});
}
updateCart();
showAddedToCartMessage(product.name);
}
}
// Show "added to cart" message
function showAddedToCartMessage(productName) {
const message = document.createElement('div');
message.className = 'added-to-cart-message';
message.style.position = 'fixed';
message.style.bottom = '20px';
message.style.right = '20px';
message.style.backgroundColor = 'var(--secondary)';
message.style.color = 'white';
message.style.padding = '15px 25px';
message.style.borderRadius = '4px';
message.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
message.style.zIndex = '10000';
message.style.transition = 'all 0.3s ease';
message.innerHTML = `
<i class="fas fa-check-circle"></i> ${productName} added to cart!
`;
document.body.appendChild(message);
setTimeout(() => {
message.style.transform = 'translateX(100%)';
setTimeout(() => {
document.body.removeChild(message);
}, 300);
}, 2000);
}
// Update cart UI
function updateCart() {
// Save cart to localStorage
localStorage.setItem('cart', JSON.stringify(cart));
// Update cart count
updateCartCount();
// Update cart items if cart is open
if (cartModal.style.display === 'flex') {
renderCartItems();
}
}
// Update cart count
function updateCartCount() {
const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
cartCount.textContent = totalItems;
}
// Render cart items
function renderCartItems() {
cartItemsContainer.innerHTML = '';
if (cart.length === 0) {
cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
cartTotalElement.textContent = '$0.00';
return;
}
let total = 0;
cart.forEach(item => {
const itemTotal = item.price * item.quantity;
total += itemTotal;
const cartItemElement = document.createElement('div');
cartItemElement.className = 'cart-item';
cartItemElement.innerHTML = `
<div class="cart-item-img">
<img src="${item.image}" alt="${item.name}">
</div>
<div class="cart-item-details">
<div class="cart-item-title">${item.name}</div>
<div class="cart-item-price">$${item.price.toFixed(2)}</div>
</div>
<div class="cart-item-actions">
<div class="quantity-selector">
<button class="quantity-btn minus" data-id="${item.id}">-</button>
<input type="number" class="quantity-input" value="${item.quantity}" min="1"
data-id="${item.id}">
<button class="quantity-btn plus" data-id="${item.id}">+</button>
</div>
<button class="remove-item" data-id="${item.id}"><i class="fas
fa-trash"></i></button>
</div>
`;
cartItemsContainer.appendChild(cartItemElement);
});
cartTotalElement.textContent = `$${total.toFixed(2)}`;
// Add event listeners to cart controls
document.querySelectorAll('.quantity-btn.minus').forEach(button => {
button.addEventListener('click', (e) => {
const id = parseInt(e.target.getAttribute('data-id'));
updateQuantity(id, -1);
});
});
document.querySelectorAll('.quantity-btn.plus').forEach(button => {
button.addEventListener('click', (e) => {
const id = parseInt(e.target.getAttribute('data-id'));
updateQuantity(id, 1);
});
});
document.querySelectorAll('.quantity-input').forEach(input => {
input.addEventListener('change', (e) => {
const id = parseInt(e.target.getAttribute('data-id'));
const newQuantity = parseInt(e.target.value) || 1;
setQuantity(id, newQuantity);
});
});
document.querySelectorAll('.remove-item').forEach(button => {
button.addEventListener('click', (e) => {
const id = parseInt(e.target.closest('.remove-item').getAttribute('data-id'));
removeFromCart(id);
});
});
}
// Update item quantity
function updateQuantity(productId, change) {
const item = cart.find(item => item.id === productId);
if (item) {
item.quantity += change;
if (item.quantity < 1) {
removeFromCart(productId);
} else {
updateCart();
}
}
}
// Set item quantity
function setQuantity(productId, quantity) {
const item = cart.find(item => item.id === productId);
if (item) {
if (quantity < 1) {
removeFromCart(productId);
} else {
item.quantity = quantity;
updateCart();
}
}
}
// Remove item from cart
function removeFromCart(productId) {
cart = cart.filter(item => item.id !== productId);
updateCart();
}
// Open cart modal
function openCart() {
renderCartItems();
cartModal.style.display = 'flex';
document.body.style.overflow = 'hidden';
}
// Close cart modal
function closeCartModal() {
cartModal.style.display = 'none';
document.body.style.overflow = 'auto';
}
// Place order
function placeOrder(e) {
    if (e) e.preventDefault();

    const facebookPageId = '61575004317573'; // Your Facebook Page ID

    // Gather customer and order details
    const customerName = document.getElementById('customerName').value.trim();
    const customerPhone = document.getElementById('customerPhone').value.trim();
    const customerEmail = document.getElementById('customerEmail').value.trim();
    const customerAddress = document.getElementById('customerAddress').value.trim();
    const customerNotes = document.getElementById('customerNotes').value.trim();

    // Validate
    if (!customerName || !customerPhone || !customerEmail || !customerAddress) {
        alert('Please fill out all required fields.');
        return;
    }
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }

    // Compose order details
    let orderDetails = cart.map(item =>
        `${item.name} - ${item.quantity} x $${item.price.toFixed(2)}`
    ).join('\n');
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const message = 
`Order Details:
${orderDetails}
Total: $${totalPrice.toFixed(2)}

Name: ${customerName}
Phone: ${customerPhone}
Email: ${customerEmail}
Address: ${customerAddress}
Notes: ${customerNotes}`;

    // Send to Formspree
    fetch('https://formspree.io/f/xyzjlajv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: customerName,
            phone: customerPhone,
            email: customerEmail,
            address: customerAddress,
            notes: customerNotes,
            order: orderDetails,
            total: totalPrice
        })
    })
    .then(response => {
        // Open Messenger after successful submission
        const messengerUrl = `https://m.me/${facebookPageId}?text=${encodeURIComponent(message)}`;
        window.open(messengerUrl, '_blank');

        // Clear cart, reset form, notify user
        cart = [];
        updateCart();
        document.getElementById('cartModal').style.display = 'none';
        document.body.style.overflow = 'auto';
        alert('Order sent! Messenger has been opened for you to confirm.');
    })
    .catch(() => {
        alert('There was an error submitting your order. Please try again.');
    });
}
// Handle contact form submission
function handleContactForm(e) {
e.preventDefault();
const name = document.getElementById('contactName').value;
const email = document.getElementById('contactEmail').value;
const subject = document.getElementById('contactSubject').value;
const message = document.getElementById('contactMessage').value;
// Simple validation
if (!name || !email || !subject || !message) {
alert('Please fill in all fields');
return;
}
// In a real app, you would send this data to a server
alert('Thank you for your message! We will get back to you soon.');
// Reset form
contactForm.reset();
}
// Toggle mobile navigation
function toggleNav() {
nav.classList.toggle('active');
}
// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);