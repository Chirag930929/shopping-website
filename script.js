const products = [
  { id: 1, name: "Classic Navyblue Tee", price: 799, image: "tshirt1.jpeg", alt: "Classic Navyblue T-shirt" },
  { id: 2, name: "Vintage Black Tee", price: 899, image: "tshirt2.jpeg", alt: "Vintage Black T-shirt" },
  { id: 3, name: "Sporty Blue Tee", price: 699, image: "tshirt3.jpeg", alt: "Sporty Blue T-shirt" },
  { id: 4, name: "Urban Grey Tee", price: 649, image: "tshirt4.jpeg", alt: "Urban Grey T-shirt" },
  { id: 5, name: "Graphic Print Tee", price: 899, image: "tshirt5.jpeg", alt: "Graphic Print T-shirt" },
  { id: 6, name: "Striped Casual Tee", price: 799, image: "tshirt6.jpeg", alt: "Striped Casual T-shirt" },
  { id: 7, name: "Bold Red Tee", price: 749, image: "tshirt7.jpeg", alt: "Bold Red Tee" },
  { id: 8, name: "Cosmic White Tee", price: 829, image: "tshirt8.jpeg", alt: "Cosmic White Tee" }
];

let cart = [];

const renderSection = (productArray, containerId) => {
  const container = document.getElementById(containerId);
  productArray.forEach(product => {
    const card = document.createElement('article');
    card.className = 'bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 flex flex-col';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.alt}" class="rounded-lg object-cover h-48 w-full mb-4" loading="lazy" />
      <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
      <p class="text-red-600 font-bold mb-4">&#8377;${product.price}</p>
      <button class="mt-auto bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition add-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    container.appendChild(card);
  });
};

renderSection(products.slice(0, 4), 'products');
renderSection(products.slice(4, 8), 'new-arrivals');
renderSection(products.slice(0, 4), 'best-sellers');

const updateCartCount = () => {
  const count = cart.reduce((acc, item) => acc + item.qty, 0);
  document.getElementById('cart-count').textContent = count;
  document.getElementById('cart-count-mobile').textContent = count;
};

const renderCart = () => {
  const container = document.getElementById('cart-items');
  container.innerHTML = '';
  if (cart.length === 0) {
    container.innerHTML = '<p class="text-center text-gray-500">Your cart is empty.</p>';
    document.getElementById('cart-total').textContent = '₹0';
    return;
  }
  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    const div = document.createElement('div');
    div.className = 'flex items-center space-x-4';
    div.innerHTML = `
      <img src="${product.image}" alt="${product.alt}" class="w-16 h-16 rounded object-cover" />
      <div class="flex-grow">
        <h4 class="font-semibold">${product.name}</h4>
        <p class="text-red-600">&#8377;${product.price} x ${item.qty}</p>
      </div>
      <button class="text-red-600 hover:text-red-800 font-bold remove-btn" data-id="${item.id}">&times;</button>
    `;
    container.appendChild(div);
  });
  const total = cart.reduce((acc, item) => acc + products.find(p => p.id === item.id).price * item.qty, 0);
  document.getElementById('cart-total').textContent = `₹${total}`;
};

const addToCart = id => {
  const existing = cart.find(item => item.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ id, qty: 1 });
  updateCartCount();
  renderCart();
  openCartSidebar();
};

const removeFromCart = id => {
  cart = cart.filter(item => item.id !== id);
  updateCartCount();
  renderCart();
};

document.body.addEventListener('click', e => {
  if (e.target.classList.contains('add-cart-btn')) {
    const id = Number(e.target.dataset.id);
    addToCart(id);
  }
  if (e.target.classList.contains('remove-btn')) {
    const id = Number(e.target.dataset.id);
    removeFromCart(id);
  }
});

const cartSidebar = document.getElementById('cart-sidebar');
const cartBtn = document.getElementById('cart-btn');
const cartBtnMobile = document.getElementById('cart-btn-mobile');
const cartCloseBtn = document.getElementById('cart-close');

const openCartSidebar = () => cartSidebar.classList.remove('translate-x-full');
const closeCartSidebar = () => cartSidebar.classList.add('translate-x-full');

cartBtn.addEventListener('click', openCartSidebar);
cartBtnMobile.addEventListener('click', openCartSidebar);
cartCloseBtn.addEventListener('click', closeCartSidebar);

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('hidden');
});

const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('hidden', window.scrollY < 300);
});
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
