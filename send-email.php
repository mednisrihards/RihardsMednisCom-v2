<?php
use PHPMailer\PHPMailer\PHPMailer;

// For local .env files use
// require_once __DIR__ . '/vendor/autoload.php';
// $dotenv = \Dotenv\Dotenv::createMutable(__DIR__);
// $dotenv->load();

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

    // For own .env file
    // $mail -> Username = $_ENV['USERNAME'];
    // $mail -> Password = $_ENV['PASSWORD'];

    // For HEROKU
    $mail -> Username = getenv('USERNAME');
    $mail -> Password = getenv('PASSWORD');
    $mail -> Port = 465;
    $mail -> SMTPSecure = "ssl";
    
    $mail -> isHTML(true);
    $mail -> setFrom("mednisrihardscom@gmail.com", $email);
    $mail -> addAddress("mednis.rihards@gmail.com");
    $mail -> Subject = "Mail from rihardsmednis.com";
    $mail -> Body = $body;

    if ($mail -> send()){
        $response = "ok";
    } else {
        $response = getenv('USERNAME') . "ERROR SENDING MAIL:  " . $mail -> ErrorInfo;
    }
}

echo $response;