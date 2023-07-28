<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Database connection
    $conn = new mysqli("localhost", "root", "", "login_system");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    if (isset($_POST["action"]) && $_POST["action"] === "login") {
        $name = $_POST["name"];
        $password = $_POST["password"];

        // Use prepared statement for login
        $stmt = $conn->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
        $stmt->bind_param("ss", $name, $password);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // User login is successful
            $response = array("status" => "success", "message" => "Login successful");
        } else {
            // User login failed
            $response = array("status" => "failure", "message" => "Invalid credentials");
        }

        echo json_encode($response);
    } elseif (isset($_POST["action"]) && $_POST["action"] === "signup") {
        $name = $_POST["name"];
        $password = $_POST["password"];

        // Use prepared statement for signup
        $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        $stmt->bind_param("ss", $name, $password);

        if ($stmt->execute()) {
            // Signup is successful
            $response = array("status" => "success", "message" => "Signup successful");
        } else {
            // Signup failed
            $response = array("status" => "failure", "message" => "Signup failed");
        }

        echo json_encode($response);
    }

    $conn->close();
}
?>
