<?php
header('Content-Type: application/json');
session_start();
require 'db.php';


if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized. Please log in.']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $cart = [];
    if (isset($_POST['cart'])) {
        $cart = json_decode($_POST['cart'], true);
    } else {
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        if (isset($data['cart'])) {
            $cart = $data['cart'];
        }
    }

    if (!$cart || !is_array($cart) || count($cart) === 0) {
        echo json_encode(['success' => false, 'message' => 'Cart is empty or invalid.']);
        exit();
    }

    $user_id = $_SESSION['user_id'];
    $success = true;
    $errors = [];

    
    $stmt = $conn->prepare("INSERT INTO orders (user_id, status, created_at) VALUES (?, 'ordered', NOW())");
    $stmt->bind_param("i", $user_id);
    if ($stmt->execute()) {
        $order_id = $stmt->insert_id;
        $stmt->close();
        
        foreach ($cart as $item) {
            $product_id = $item['product_id'] ?? null;
            $quantity = $item['quantity'] ?? 1;
            if (!$product_id || $quantity < 1) {
                $errors[] = 'Invalid product or quantity.';
                $success = false;
                continue;
            }
            $stmt_item = $conn->prepare("INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)");
            $stmt_item->bind_param("iii", $order_id, $product_id, $quantity);
            if (!$stmt_item->execute()) {
                $errors[] = 'Failed to add product ID ' . $product_id . ' to order.';
                $success = false;
            }
            $stmt_item->close();
        }
    } else {
        $errors[] = 'Failed to create order.';
        $success = false;
    }
    $conn->close();
    if ($success) {
        echo json_encode(['success' => true, 'message' => 'Order placed successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Some items could not be ordered.', 'errors' => $errors]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request.']);
}
?> 