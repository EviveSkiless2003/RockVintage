document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            menuItems.forEach(i => i.removeAttribute('aria-current'));
            this.setAttribute('aria-current', 'page');
        });
    });
});