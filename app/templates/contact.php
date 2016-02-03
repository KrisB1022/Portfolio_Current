<section ng-controller="ContactController">
	<form name="contactForm" method="POST" action="" required>
		<label>First Name:</label>
		<input type="text" name="firstName" ng-model="firstName" required />
		<div ng-messages="contactForm.firstName.$error"
			ng-if="contactForm.firstName.$dirty">
			<div ng-message="required">This field is required</div>
		</div>

		<label>Last Name:</label>
		<input type="text" name="lastName" ng-model="lastName" required />
		<div ng-messages="contactForm.lastName.$error"
			ng-if="contactForm.lastName.$dirty">
			<div ng-message="required">This field is required</div>
		</div>

		<label>Email:</label>
		<input type="email" name="email" ng-model="email" required />
		<div ng-messages="contactForm.email.$error"
			ng-if="contactForm.email.$dirty">
			<div ng-message="required">This field is required</div>
			<div ng-message="email">Your email address is invalid</div>
		</div>

		<label for="winnie_the_pooh">If you're a homo sapien, leave this for Winnie the Pooh. Meaning leave it blank.</label>
		<input type="text" name="winnie_the_pooh" value="">

		<label>Phone:</label>
		<input type="text" name="phoneNumber" ng-model="phoneNumber"
			ng-pattern="/^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/" required/>
		<div ng-messages="contactForm.phoneNumber.$error"
			ng-if="contactForm.phoneNumber.$dirty">
			<div ng-message="required">This field is required</div>
			<div ng-message="pattern">Must be a valid 10 digit phone number</div>
		</div>
			
		<label>Message:</label>
		<textarea type="text" name="message" ng-model="message" ng-minlength="50"
			ng-maxlength="1000" required></textarea>
		<div ng-messages="contactForm.message.$error"
			ng-if="contactForm.message.$dirty">
			<div ng-message="required">This field is required</div>
			<div ng-message="minlength">Message must be over 50 characters</div>
			<div ng-message="maxlength">Message must not exceed 1000 characters</div>
		</div>

		<button type="submit">Submit</button>
	</form>
</section>


<?php

if($_POST["winnie_the_pooh"] == '') {
	if( !empty($_POST["firstName"]) && !empty($_POST["lastName"]) && !empty($_POST["email"]) && !empty($_POST["message"]) ) {
		$firstName = input_validation($_POST['firstName']);
		$lastName = input_validation($_POST['lastName']);
		$email = input_validation($_POST['email']);
		$phone = input_validation($_POST['phoneNumber']);
		$message = input_validation($_POST['message']);

		$to = "krisb@tengundesign.com";
		$subject = "Email from portfolio site.";
		$message = "From: " . $_POST["firstName"] . " " . $_POST['lastName'] . "\r\n message: " . $_POST["message"];
		
		$headers = "MIME-Version: 1.0" . "\r\n";
		$headers .= "Content-type:text;charset=UTF-8" . "\r\n";
		$headers = "From: " . $_POST["email"] . "\r\n";

		if (mail($to, $subject, $message, $headers)) {
			echo "Email sent.";
		}
	} else {
		echo "Please fill in all the fields";
	}
} else {
	echo "Spam detected!!!";
}


function input_validation($formData) {
	$formData = trim($formData);
	$formData = stripslashes($formData);
	$formData = htmlspecialchars($formData);
	return $formData;
}

?>