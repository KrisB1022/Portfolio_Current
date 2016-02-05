<?php
error_reporting(-1);
ini_set('display_errors', 'On');
set_error_handler("var_dump");

	function input_validation($formData) {
		$formData = trim($formData);
		$formData = stripslashes($formData);
		$formData = htmlspecialchars($formData);
		return $formData;
	}
	
	$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	$firstName = input_validation($request->firstName);
	$lastName = input_validation($request->lastName);
	$email = input_validation($request->email);
	$phone = input_validation($request->phoneNumber);
	$message = wordwrap(input_validation($request->message), 70, "\r\n");

	$completed = wordwrap(
		("Email from: " . $firstName . " " . $lastName . "\r\n"
		. "phone: " . $phone . "\r\n" . "email: " . $email . "\r\n"
		. "message: " . $message), 70, "\r\n");

	$subject = "Mail from portfolio website.";

$headers = array("From: from@example.com",
    "Reply-To: replyto@example.com",
    "X-Mailer: PHP/" . PHP_VERSION
);
$headers = implode("\r\n", $headers);


	if( mail("krisb@tengundesign.com", $subject, $completed) ) {
		echo "Mail successful!";
		return;
	} else {
		echo "Mail failed to send";
		return;
	}



?>