<?php
if( isset($_POST['name']) && isset($_POST['email']) && isset($_POST['subject'])  && isset($_POST['phone'])  && isset($_POST['address']) && isset($_POST['message']) ){
	$name = $_POST['name']; // HINT: use preg_replace() to filter the data
	$email = $_POST['email'];
	$subject = $_POST['subject'];
	$phone = $_POST['phone'];
	$address = $_POST['address'];
	$message = nl2br($_POST['message']);
	$to = "mdshifut@gmail.com";	
	$from = "shifuthossain.com";
	// $subject = $subject;
	$message =   '<p>'.$message.'</p><br><b>Name:</b> '.$name.' <br><b>Email:</b> '.$email.' <br><b>Phone:</b> '.$phone.' <br><b>Address:</b> '.$address;
	$headers = "From: $from\n";
	$headers .= "MIME-Version: 1.0\n";
	$headers .= "Content-type: text/html; charset=iso-8859-1\n";
	if( mail($to, $subject, $message, $headers) ){
		echo "success";
	} else {
		echo "The server failed to send the message. Please try again later.";
	}

//'<b>Name:</b> '.$name.' <br><b>Email:</b> '.$email.' <br><b>Skype:</b> ' .$skype.
}
?>