<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Autoload PHPMailer

$mail = new PHPMailer(true);

try {
    // Konfigurasi SMTP
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'muhamadfathuladitya15@gmail.com';       // Ganti dengan email Anda
    $mail->Password   = 'mrpv mkte fovl doqd';           // Gunakan App Password, BUKAN password Gmail biasa
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    // Data dari form
    $name    = $_POST['name'];
    $email   = $_POST['email'];
    $message = $_POST['message'];

    // Email pengirim & penerima
    $mail->setFrom($email, $name);                 // dari pengisi form
    $mail->addAddress('muhamadfathuladitya15@gmail.com');      // ke Anda

    // Konten email
    $mail->isHTML(true);
    $mail->Subject = 'New Message from Contact Form';
    $mail->Body    = "
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Message:</strong><br>$message</p>
    ";

    $mail->send();
    // echo "Message has been sent successfully!";
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
