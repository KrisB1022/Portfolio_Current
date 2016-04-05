<?php

date_default_timezone_set('Etc/UTC');

/***
* Cleans email input to prevent spam, etc.
* @param 	$formData 	input date from HTML form
* @return 	trimed, stripped and html special chars removed
*/
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
$message = wordwrap(
	"Email from: " . $firstName . " " . $lastName . "<" . $email . ">\r\n" 
	. "Phone: " . $phone . "\r\nMessage:\r\n" . 
	input_validation($request->message
), 70, "\r\n");

// $headers = "MIME-Version: 1.0" . "\r\n";
// $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers = "From: <" . $email . ">" . "\r\n";
$headers .= "Reply-to: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();


if(mail("krisjbyrum@gmail.com", "Message from Portfolio Website", $message)) {
	echo "Successful sending";
} else {
	echo "Sorry. Something went wrong.";
}
return;

?>