<?php
header('Content-Type: application/json');
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $message = trim($_POST['message'] ?? '');

    if (!$name || !$email || !$message) {
        echo json_encode(['success' => false, 'message' => 'All fields are required.']);
        exit();
    }

    
    $stmt = $conn->prepare("INSERT INTO contacts (name, email, message, created_at) VALUES (?, ?, ?, NOW())");
    $stmt->bind_param("sss", $name, $email, $message);
    $dbSuccess = $stmt->execute();
    $stmt->close();
    $conn->close();

    
    $to = 'rockvintage2@gmail.com';
    $subject = 'New Contact Message from ' . $name;
    $body = "Name: $name\nEmail: $email\nMessage:\n$message";
    $headers = "From: $email\r\nReply-To: $email\r\n";
    $mailSuccess = mail($to, $subject, $body, $headers);

    if ($dbSuccess && $mailSuccess) {
        echo json_encode(['success' => true, 'message' => 'Message sent successfully.']);
    } else if ($dbSuccess) {
        echo json_encode(['success' => true, 'message' => 'Message saved, but email could not be sent.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to send message.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request.']);
}
?> 