<?php

$servername = "localhost";
$username = "vceban";
$password = "Qlusion2024!";
$database = "i9835819_nmzt1";

try {
  $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $table = "spread_sheet____original_clubs";
  $query = $conn->prepare("SELECT * FROM $table");
  $query->execute();
  $result = $query->fetchAll(PDO::FETCH_ASSOC);

  header('Content-Type: application/json');
  echo json_encode($result);
} catch (PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}
