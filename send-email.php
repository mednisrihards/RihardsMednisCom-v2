<?php
use PHPMailer\PHPMailer\PHPMailer;

if(isset($_POST["email"]) && isset($_POST["message"])){
    
    $email = $_POST["email"];
    $message = $_POST["message"];
    $to = "mednis.rihards@gmail.com";
    $subject = "Message from rihardsmednis.com";

    $body = "";
    $body .= "From: ".$email. "<br>";
    $body .= "Subject: ".$subject. "<br>";
    $body .= "Message: ".$message. "<br>";

    $credentials = parse_ini_file("../RihardsMednis_key/FBvtPMMnQ7cWVwR4hQG5pGTHg.ini");

    require_once "PHPMailer/PHPMailer.php";
    require_once "PHPMailer/SMTP.php";
    require_once "PHPMailer/Exception.php";

    $mail = new PHPMailer();

    $mail -> isSMTP();
    $mail -> Host = "smtp.gmail.com";
    $mail -> SMTPAuth = true;
    $mail -> Username = $credentials['username'];
    $mail -> Password = $credentials['password'];
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
        $response = "ERROR SENDING MAIL:  " . $mail -> ErrorInfo;
    }
}

echo $response;