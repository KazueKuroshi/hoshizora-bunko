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

    const userExists = users.some(u => u.email === email);
    if (userExists) {
        alert('User already exists.');
    } else {
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful!');
        window.location.href = 'login.html'; // Redirect ke halaman login
    }
}
