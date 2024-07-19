const products = [
    { id: 1, name: 'Product 1', price: 10.00 },
    { id: 2, name: 'Product 2', price: 15.00 },
    // Add more products as needed
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.product.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
    document.getElementById('cart-count').innerText = cartCount;
}

function viewCart() {
    const cartSection = document.getElementById('cart');
    const productListSection = document.getElementById('product-list');
    const cartItemsContainer = document.getElementById('cart-items');

    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const total = (item.product.price * item.quantity).toFixed(2);
        const row = `<tr>
            <td>${item.product.name}</td>
            <td>$${item.product.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>$${total}</td>
            <td>
                <button onclick="removeFromCart(${item.product.id})">Remove</button>
            </td>
        </tr>`;
        cartItemsContainer.insertAdjacentHTML('beforeend', row);
    });

    productListSection.style.display = 'none';
    cartSection.style.display = 'block';
    document.getElementById('checkout').style.display = 'none';
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.product.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    viewCart();
    updateCartCount();
}

function showCheckoutForm() {
    document.getElementById('cart').style.display = 'none';
    document.getElementById('checkout').style.display = 'block';
}

function processCheckout() {
    const form = document.getElementById('checkout-form');
    const name = form.name.value;
    const address = form.address.value;
    const email = form.email.value;

    if (name && address && email) {
        alert(`Order Summary:\nName: ${name}\nAddress: ${address}\nEmail: ${email}\n\nThank you for your purchase!`);

        // Clear the cart after checkout
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();

        // Redirect to the product list
        document.getElementById('product-list').style.display = 'block';
        document.getElementById('checkout').style.display = 'none';
    } else {
        alert('Please fill out all fields.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});
