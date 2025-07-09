<?php
header('Content-Type: application/json');
session_start();
require 'db.php';


if (!isset($_SESSION['user_id']) || !isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
    echo json_encode(['success' => false, 'message' => 'Unauthorized. Admins only.']);
    exit();
}

$sql = "SELECT o.id AS order_id, o.user_id, o.status, o.created_at, u.name AS customer_name, u.email AS user_email, oi.product_id, oi.quantity, p.name AS product_name, p.price FROM orders o JOIN users u ON o.user_id = u.id JOIN order_items oi ON o.id = oi.order_id JOIN products p ON oi.product_id = p.id ORDER BY o.created_at DESC, oi.id ASC";
$result = $conn->query($sql);
$orders = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $oid = $row['order_id'];
        if (!isset($orders[$oid])) {
            $orders[$oid] = [
                'order_id' => $oid,
                'user_id' => $row['user_id'],
                'status' => $row['status'],
                'created_at' => $row['created_at'],
                'customer_name' => $row['customer_name'],
                'user_email' => $row['user_email'],
                'items' => []
            ];
        }
        $orders[$oid]['items'][] = [
            'product_id' => $row['product_id'],
            'product_name' => $row['product_name'],
            'quantity' => $row['quantity'],
            'price' => $row['price']
        ];
    }
}
$conn->close();
echo json_encode(['success' => true, 'orders' => array_values($orders)]);
?> 