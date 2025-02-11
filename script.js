let cart = [];
let total = 0;
let selectedPaymentMethod = null;
let selectedAccountName = null;
let selectedAccountNumber = null;

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
    });

    cartTotal.textContent = total.toFixed(2);
}

function openPaymentModal() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    document.getElementById('payment-modal').style.display = 'flex';
    document.getElementById('payment-total').textContent = total.toFixed(2);
}

function closePaymentModal() {
    document.getElementById('payment-modal').style.display = 'none';
    selectedPaymentMethod = null;
    selectedAccountName = null;
    selectedAccountNumber = null;
    document.getElementById('payment-details').classList.add('hidden');
}

function selectPaymentMethod(method, accountNumber, accountName) {
    selectedPaymentMethod = method;
    selectedAccountName = accountName;
    selectedAccountNumber = accountNumber;

    // Tampilkan informasi pembayaran
    document.getElementById('selected-method').textContent = method;
    document.getElementById('account-name').textContent = accountName;
    document.getElementById('account-number').textContent = accountNumber;
    document.getElementById('payment-details').classList.remove('hidden');
}

function handleConfirmation(event) {
    event.preventDefault();
    const proof = document.getElementById('proof').files[0];
    const contact = document.getElementById('contact').value;

    if (!selectedPaymentMethod || !proof || !contact) {
        alert('Please fill all fields!');
        return;
    }

    const confirmationData = {
        paymentMethod: selectedPaymentMethod,
        accountName: selectedAccountName,
        accountNumber: selectedAccountNumber,
        total: total.toFixed(2),
        contact: contact,
        proof: proof.name,
    };

    sendConfirmation(confirmationData);

    cart = [];
    total = 0;
    updateCart();
    closePaymentModal();
    alert('Payment confirmation sent! We will contact you shortly.');
}

function sendConfirmation(data) {
    const message = `Payment Confirmation:\nMethod: ${data.paymentMethod}\nAccount Name: ${data.accountName}\nAccount Number: ${data.accountNumber}\nTotal: $${data.total}\nContact: ${data.contact}\nProof: ${data.proof}`;
    console.log('Sending confirmation:', message);
    // Integrate with WhatsApp/Telegram/Email API here.
}

// Fungsi untuk membuka modal deskripsi produk
function openProductModal(name, image, description, price) {
    document.getElementById('modal-product-name').textContent = name;
    document.getElementById('modal-product-image').src = image;
    document.getElementById('modal-product-description').textContent = description;
    document.getElementById('modal-product-price').textContent = price.toFixed(2);
    document.getElementById('product-modal').style.display = 'flex';
}

// Fungsi untuk menutup modal deskripsi produk
function closeProductModal() {
    document.getElementById('product-modal').style.display = 'none';
}
