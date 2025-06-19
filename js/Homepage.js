document.addEventListener('DOMContentLoaded', function() {
  const shopNowBtn = document.getElementById('shopNowBtn');
  const newArrivalsSection = document.querySelector('.new-arrivals');

  if (shopNowBtn && newArrivalsSection) {
    shopNowBtn.addEventListener('click', function() {
      newArrivalsSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
});

const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');
const loginBtn = document.getElementById('loginSignupBtn');
const loginClose = document.getElementById('login-modal-close');
const signupClose = document.getElementById('signup-modal-close');
const showSignup = document.getElementById('show-signup');
const showLogin = document.getElementById('show-login');

function openModal(modal) {
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function closeModal(modal) {
  modal.style.display = 'none';
  document.body.style.overflow = '';
}
loginBtn.addEventListener('click', e => {
  e.preventDefault();
  openModal(loginModal);
});
loginClose.addEventListener('click', () => closeModal(loginModal));
signupClose.addEventListener('click', () => closeModal(signupModal));
loginModal.addEventListener('click', e => { if (e.target === loginModal) closeModal(loginModal); });
signupModal.addEventListener('click', e => { if (e.target === signupModal) closeModal(signupModal); });
showSignup.addEventListener('click', e => {
  e.preventDefault();
  closeModal(loginModal);
  openModal(signupModal);
});
showLogin.addEventListener('click', e => {
  e.preventDefault();
  closeModal(signupModal);
  openModal(loginModal);
});
['loginForm','signupForm'].forEach(id => {
  const form = document.getElementById(id);
  if(form) form.addEventListener('submit', e => e.preventDefault());
});

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const errorMsg = document.getElementById('login-error') || (() => {
      const err = document.createElement('div');
      err.id = 'login-error';
      err.style.color = '#e53935';
      err.style.marginTop = '10px';
      err.style.textAlign = 'center';
      loginForm.appendChild(err);
      return err;
    })();
    if (email === 'mikias191@gmail.com' && password === '1234') {
      window.location.href = 'pages/AD Homepage.html';
    } else if (email === 'Fikadu191@gmail.com' && password === '1234') {
      window.location.href = 'pages/Shop.html';
    } else {
      errorMsg.textContent = 'Invalid email or password.';
    }
  });
}
