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

    
    async function loadStats() {
        try {
           
            const prodRes = await fetch('../php/get_products.php');
            const prodData = await prodRes.json();
            if (prodData.success) {
                document.querySelectorAll('.stat-card .stat-value')[0].textContent = prodData.products.length;
            }
            
            const orderRes = await fetch('../php/get_orders.php');
            const orderData = await orderRes.json();
            if (orderData.success) {
                document.querySelectorAll('.stat-card .stat-value')[1].textContent = orderData.orders.length;
            }
        } catch (err) {
           
        }
    }
    loadStats();
});
