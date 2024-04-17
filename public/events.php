<?php

$servername = "localhost";
$username = "vceban";
$password = "Qlusion2024!";
$database = "Clubs_SCU";
$clubs = [];

if (isset($_GET["day"])) {
  $day = $_GET["day"];
} else {
  $day = date("l");
}

try {
  // Database connection
  $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // Database query
  $table = "spread_sheet____original_clubs";
  $query = $conn->prepare("SELECT * FROM $table WHERE TRIM(event_date) = :day");
  $query->bindParam(':day', $day);
  $query->execute();
  $result = $query->fetchAll(PDO::FETCH_ASSOC);

  // Data cleaning and JSON encoding
  $clubs = [];
  foreach ($result as $club) {
    if (!empty($club["event_date"]) && !empty($club["event_time"])) {
      $cleanedClub = [];
      foreach ($club as $key => $value) {
        $cleanedClub[$key] = mb_convert_encoding($value, 'UTF-8', 'UTF-8');
      }
      $clubs[] = $cleanedClub;
    }
  }

  // Return JSON data
  $json = json_encode($clubs, JSON_UNESCAPED_UNICODE);
  if ($json === false) {
    throw new Exception("Error encoding JSON: " . json_last_error_msg());
  }
  echo $json;
} catch (PDOException $e) {
  echo "Database connection failed: " . $e->getMessage();
} catch (Exception $e) {
  echo "Error: " . $e->getMessage();
}
