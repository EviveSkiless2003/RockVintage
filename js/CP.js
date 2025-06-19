const profileForm = document.getElementById('profileForm');
const logoutBtn = document.getElementById('logoutBtn');

profileForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const newEmail = document.getElementById('newEmail').value.trim();
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword && newPassword !== confirmPassword) {
        alert('New password and confirmation do not match.');
        return;
    }

    alert('Profile changes saved!');
});

logoutBtn.addEventListener('click', function() {
    alert('You have been logged out.');
    window.location.href = '../index.html';
});

const avatarInput = document.getElementById('avatarInput');
const profileAvatar = document.getElementById('profileAvatar');

avatarInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileAvatar.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});
