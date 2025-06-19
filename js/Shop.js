let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCount = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.textContent = count;
    if (count > 0) {
        cartCount.classList.add('visible');
    } else {
        cartCount.classList.remove('visible');
    }
}

function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach((item, idx) => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <div class="item-details">
                <div class="item-title">${item.title}</div>
            </div>
            <div class="item-quantity">
                <button class="qty-btn" data-idx="${idx}" data-delta="-1">-</button>
                <span class="qty-value">${item.qty}</span>
                <button class="qty-btn" data-idx="${idx}" data-delta="1">+</button>
                <button class="remove-btn" data-idx="${idx}">×</button>
            </div>
        `;
        cartItemsContainer.appendChild(div);
        total += item.qty * item.price;
    });
    totalPriceEl.textContent = `$${total.toFixed(2)}`;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(title, img, price) {
    const idx = cart.findIndex(item => item.title === title);
    if (idx > -1) {
        cart[idx].qty += 1;
    } else {
        cart.push({ title, img, price, qty: 1 });
    }
    saveCart();
    updateCartCount();
    renderCart();
}

document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = btn.closest('.product-card');
        const title = card.querySelector('.product-title').textContent;
        const img = card.querySelector('img').getAttribute('src');
        const price = parseFloat(card.querySelector('.product-price').textContent.replace('$',''));
        addToCart(title, img, price);
    });
});

const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const cartModalClose = document.getElementById('cart-modal-close');

cartBtn.addEventListener('click', function(e) {
    e.preventDefault();
    cartModal.style.display = 'flex';
    renderCart();
});
cartModalClose.addEventListener('click', function() {
    cartModal.style.display = 'none';
});
cartModal.addEventListener('click', function(e) {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

cartItemsContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('qty-btn')) {
        const idx = +e.target.getAttribute('data-idx');
        const delta = +e.target.getAttribute('data-delta');
        cart[idx].qty += delta;
        if (cart[idx].qty < 1) cart[idx].qty = 1;
        saveCart();
        updateCartCount();
        renderCart();
    } else if (e.target.classList.contains('remove-btn')) {
        const idx = +e.target.getAttribute('data-idx');
        cart.splice(idx, 1);
        saveCart();
        updateCartCount();
        renderCart();
    }
});

const pages = document.querySelectorAll('.pagination-page');
pages.forEach(page => {
    page.addEventListener('click', function() {
        pages.forEach(p => p.classList.remove('active'));
        this.classList.add('active');
    });
});

const leftArrow = document.querySelector('.pagination-arrow[disabled], .pagination-arrow:first-child');
const rightArrow = document.querySelector('.pagination-arrow:last-child');
if (leftArrow && rightArrow) {
    leftArrow.addEventListener('click', () => {});
    rightArrow.addEventListener('click', () => {});
}

updateCartCount();
