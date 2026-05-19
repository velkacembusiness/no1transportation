<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
</head>
<body>
<h2>new reservation from the website {{ $contact['uuid'] }} </h2>
<p>Booking details:</p>
<ul>
    <li><strong>Patient name </strong>   : {{ $contact['patient_name'] }}</li>
    <li><strong>Email</strong>        : {{ $contact['email_address'] }}</li>
    <li><strong>Phone number</strong> : {{ $contact['phone_number'] }}</li>
    <li><strong>Patient weight</strong> : {{ $contact['patient_weight'] }}</li>
    <li><strong>Date of ride</strong> : {{ $contact['date_of_ride'] }}</li>
    <li><strong>Pick up time</strong> : {{ $contact['time_of_ride'] }}</li>
    <li><strong>Appointement time</strong> : {{ $contact['appointment_time'] }}</li>
    <li><strong>Return time</strong> : {{ $contact['return_time'] }}</li>
    <li><strong>Pick up location</strong> : {{ $contact['pick_up_location'] }}</li>
    <li><strong>Drop off location</strong> : {{ $contact['drop_off_location'] }}</li>
    <li><strong>Type of service</strong> : {{ $contact['type_of_service'] }}</li>
    <li><strong>Rider payer</strong> : {{ strtoupper($contact['rider_payer']) }}</li>
    <li><strong>Message</strong>      : {{ $contact['special_instructions'] }}</li>
</ul>
</body>
</html>
