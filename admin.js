const loginView = document.getElementById('loginView');
const dashboardView = document.getElementById('dashboardView');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');

function showDashboard() {
  loginView.hidden = true;
  dashboardView.hidden = false;
  localStorage.setItem('pochoAdminDemo', '1');
}

function showLogin() {
  dashboardView.hidden = true;
  loginView.hidden = false;
  localStorage.removeItem('pochoAdminDemo');
}

if (localStorage.getItem('pochoAdminDemo') === '1') showDashboard();

loginForm.addEventListener('submit', event => {
  event.preventDefault();
  const user = document.getElementById('user').value.trim().toLowerCase();
  const pass = document.getElementById('pass').value.trim();
  if (user === 'admin' && pass === 'capital2027') {
    loginError.textContent = '';
    showDashboard();
  } else {
    loginError.textContent = 'Usuario o clave incorrectos para la demo.';
  }
});

logoutBtn.addEventListener('click', showLogin);
