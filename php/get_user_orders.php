<?php
header('Content-Type: application/json');
session_start();
require 'db.php';


if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized. Please log in.']);
    exit();
}

$user_id = $_SESSION['user_id'];
$sql = "SELECT o.id AS order_id, o.created_at, o.status, oi.product_id, oi.quantity, p.name AS product_name, p.price, p.image FROM orders o JOIN order_items oi ON o.id = oi.order_id JOIN products p ON oi.product_id = p.id WHERE o.user_id = ? ORDER BY o.created_at DESC, oi.id ASC";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$orders = [];
while ($row = $result->fetch_assoc()) {
    $oid = $row['order_id'];
    if (!isset($orders[$oid])) {
        $orders[$oid] = [
            'order_id' => $oid,
            'created_at' => $row['created_at'],
            'status' => $row['status'],
            'items' => []
        ];
    }
    $orders[$oid]['items'][] = [
        'product_id' => $row['product_id'],
        'product_name' => $row['product_name'],
        'quantity' => $row['quantity'],
        'price' => $row['price'],
        'image' => $row['image']
    ];
}
$stmt->close();
$conn->close();
echo json_encode(['success' => true, 'orders' => array_values($orders)]);
?> 