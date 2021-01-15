<?php
use PHPMailer\PHPMailer\PHPMailer;
require_once __DIR__ . '/vendor/autoload.php';
$dotenv = \Dotenv\Dotenv::createMutable(__DIR__);
$dotenv->load();

if(isset($_POST["email"]) && isset($_POST["message"])){
    
    $email = $_POST["email"];
    $message = $_POST["message"];
    $to = "mednis.rihards@gmail.com";
    $subject = "Message from rihardsmednis.com";

    $body = "";
    $body .= "From: ".$email. "<br>";
    $body .= "Subject: ".$subject. "<br>";
    $body .= "Message: ".$message. "<br>";

    require_once "PHPMailer/PHPMailer.php";
    require_once "PHPMailer/SMTP.php";
    require_once "PHPMailer/Exception.php";

    $mail = new PHPMailer();

    $mail -> isSMTP();
    $mail -> Host = "smtp.gmail.com";
    $mail -> SMTPAuth = true;
    $mail -> Username = $_ENV['USERNAME'];
    $mail -> Password = $_ENV['PASSWORD'];
    $mail -> Port = 465;
    $mail -> SMTPSecure = "ssl";

    $mail -> isHTML(true);
    $mail -> setFrom($_ENV['USERNAME'], $email);
    $mail -> addAddress("mednis.rihards@gmail.com");
    $mail -> Subject = "Mail from rihardsmednis.com";
    $mail -> Body = $body;

    if ($mail -> send()){
        $response = "ok";
    } else {
        $response = "ERROR SENDING MAIL:  " . $mail -> ErrorInfo;
    }
}

echo $response;