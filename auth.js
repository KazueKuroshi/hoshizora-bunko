// Simpan data pengguna di localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];

// Fungsi untuk menangani login
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        alert('Login successful!');
        localStorage.setItem('loggedInUser', JSON.stringify(user)); // Simpan data pengguna yang login
        updateNavbar(); // Perbarui navbar
        window.location.href = 'index.html'; // Redirect ke halaman utama
    } else {
        alert('Invalid email or password.');
    }
}

// Fungsi untuk menangani registrasi
function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const paymentAccount = document.getElementById('payment-account').value;

    const userExists = users.some(u => u.email === email);
    if (userExists) {
        alert('User already exists.');
    } else {
        users.push({ name, email, password, paymentAccount });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful!');
        window.location.href = 'login.html'; // Redirect ke halaman login
    }
}

// Fungsi untuk logout
function handleLogout() {
    localStorage.removeItem('loggedInUser');
    updateNavbar(); // Perbarui navbar
    window.location.href = 'login.html'; // Redirect ke halaman login
}

// Fungsi untuk memperbarui navbar berdasarkan status login
function updateNavbar() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    const nav = document.querySelector('nav ul');
    if (nav) {
        if (user) {
            // Jika pengguna sudah login, tampilkan tombol Logout dan Profile
            nav.innerHTML = `
                <li><a href="index.html">Home</a></li>
                <li><a href="profile.html">Profile</a></li>
                <li><a href="#" onclick="handleLogout()">Logout</a></li>
            `;
        } else {
            // Jika pengguna belum login, tampilkan tombol Login dan Register
            nav.innerHTML = `
                <li><a href="index.html">Home</a></li>
                <li><a href="login.html">Login</a></li>
                <li><a href="register.html">Register</a></li>
            `;
        }
    }
}

// Panggil fungsi updateNavbar saat halaman dimuat
document.addEventListener('DOMContentLoaded', updateNavbar);
