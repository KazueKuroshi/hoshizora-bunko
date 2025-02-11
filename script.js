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

// Fungsi untuk mengirim pesan WhatsApp
function sendWhatsAppMessage(contact, message) {
    const phoneNumber = '6281234567890'; // Ganti dengan nomor WhatsApp Anda (tanpa tanda + atau 0)
    const encodedMessage = encodeURIComponent(message); // Encode pesan agar aman untuk URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Buka WhatsApp di tab baru
    window.open(whatsappUrl, '_blank');
}

// Fungsi untuk menangani konfirmasi pembayaran
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

    // Kirim pesan WhatsApp
    const message = `Payment Confirmation:\nMethod: ${confirmationData.paymentMethod}\nAccount Name: ${confirmationData.accountName}\nAccount Number: ${confirmationData.accountNumber}\nTotal: $${confirmationData.total}\nContact: ${confirmationData.contact}\nProof: ${confirmationData.proof}`;
    sendWhatsAppMessage(confirmationData.contact, message);

    // Reset keranjang dan tutup modal
    cart = [];
    total = 0;
    updateCart();
    closePaymentModal();
    alert('Payment confirmation sent! Please check WhatsApp.');
}

// Fungsi untuk menampilkan/menyembunyikan deskripsi produk
function toggleDescription(id) {
    const description = document.getElementById(id);
    if (description.style.display === 'none' || description.style.display === '') {
        description.style.display = 'block';
    } else {
        description.style.display = 'none';
    }
}
