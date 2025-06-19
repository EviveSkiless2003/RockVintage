const products = [
    { name: 'Classic White T-Shirt', price: 35 },
    { name: 'Blue Denim Jeans', price: 60 },
    { name: 'Black Leather Boots', price: 70 }
];

const quantities = [1, 1, 1];

const productImages = [
    'https://i.imgur.com/1GrakTl.jpg',
    'https://i.imgur.com/7qO6FQ2.jpg',
    'https://i.imgur.com/QlRphfQ.jpg'
];
const productSizes = ['Size M', 'Size 8', 'Size 7'];

function renderCart() {
    const cartItemsDiv = document.querySelector('.cart-items');
    cartItemsDiv.innerHTML = '';
    for (let i = 0; i < products.length; i++) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img src="${productImages[i]}" alt="${products[i].name}">
            <div class="item-details">
                <div class="item-title">${products[i].name}</div>
                <div class="item-size">${productSizes[i]}</div>
            </div>
            <div class="item-quantity">
                <button class="qty-btn" onclick="updateQuantity(${i}, -1)">-</button>
                <span class="qty-value" id="qty-${i}">${quantities[i]}</span>
                <button class="qty-btn" onclick="updateQuantity(${i}, 1)">+</button>
                <button class="remove-btn" onclick="removeItem(${i})">×</button>
            </div>
        `;
        cartItemsDiv.appendChild(itemDiv);
    }
    updateTotal();
}

function updateQuantity(index, change) {
    if (quantities[index] + change < 1) return;
    quantities[index] += change;
    renderCart();
}

function removeItem(index) {
    products.splice(index, 1);
    quantities.splice(index, 1);
    productImages.splice(index, 1);
    productSizes.splice(index, 1);
    renderCart();
}

document.addEventListener('DOMContentLoaded', renderCart);

function updateTotal() {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
        total += products[i].price * quantities[i];
    }
    document.getElementById('total-price').textContent = `$${total.toFixed(2)}`;
}
