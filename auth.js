// Общий скрипт авторизации BurmalPedia
const API = 'https://reloquent-001-site1.site4future.com';
let currentUser = JSON.parse(localStorage.getItem('burmal_user') || 'null');

function updateUI() {
    const userInfo = document.getElementById('userInfo');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const adminBtn = document.getElementById('adminBtn');
    
    if (currentUser) {
        if (userInfo) userInfo.textContent = '👤 ' + currentUser.username;
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'inline-block';
        if (adminBtn) adminBtn.style.display = currentUser.role === 'Admin' ? 'inline-block' : 'none';
    } else {
        if (userInfo) userInfo.textContent = '';
        if (loginBtn) loginBtn.style.display = 'inline-block';
        if (registerBtn) registerBtn.style.display = 'inline-block';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (adminBtn) adminBtn.style.display = 'none';
    }
}

async function login() {
    const u = document.getElementById('loginUsername').value;
    const p = document.getElementById('loginPassword').value;
    const form = new URLSearchParams();
    form.append('username', u); form.append('password', p); form.append('action', 'login');
    const res = await fetch(API + '/auth.ashx', { method: 'POST', body: form, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
    const data = await res.json();
    if (data.success) {
        currentUser = data;
        localStorage.setItem('burmal_user', JSON.stringify(data));
        updateUI(); closeModals(); location.reload();
    }
}

async function register() {
    const u = document.getElementById('regUsername').value;
    const e = document.getElementById('regEmail').value;
    const p = document.getElementById('regPassword').value;
    const form = new URLSearchParams();
    form.append('username', u); form.append('email', e); form.append('password', p); form.append('action', 'register');
    const res = await fetch(API + '/auth.ashx', { method: 'POST', body: form, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
    const data = await res.json();
    if (data.success) { alert('Регистрация успешна!'); closeModals(); }
}

function logout() { currentUser = null; localStorage.removeItem('burmal_user'); updateUI(); location.reload(); }
function closeModals() { document.querySelectorAll('.modal').forEach(m => m.style.display = 'none'); }