
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
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
if (loginBtn) loginBtn.addEventListener('click', e => {
  e.preventDefault();
  openModal(loginModal);
});
if (loginClose) loginClose.addEventListener('click', () => closeModal(loginModal));
if (signupClose) signupClose.addEventListener('click', () => closeModal(signupModal));
if (loginModal) loginModal.addEventListener('click', e => { if (e.target === loginModal) closeModal(loginModal); });
if (signupModal) signupModal.addEventListener('click', e => { if (e.target === signupModal) closeModal(signupModal); });
if (showSignup) showSignup.addEventListener('click', e => {
  e.preventDefault();
  closeModal(loginModal);
  openModal(signupModal);
});
if (showLogin) showLogin.addEventListener('click', e => {
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
      window.location.href = 'AD Homepage.html';
    } else if (email === 'Fikadu191@gmail.com' && password === '1234') {
      window.location.href = 'Shop.html';
    } else {
      errorMsg.textContent = 'Invalid email or password.';
    }
  });
}
