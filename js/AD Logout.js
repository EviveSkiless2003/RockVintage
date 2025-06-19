document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const logoutBtn = document.getElementById('confirmLogout');
    logoutBtn.addEventListener('click', function() {
        alert('You have been logged out (demo only).');
        window.location.href = '../index.html';
    });
});
