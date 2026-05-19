<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
</head>
<body>
<h2>Contact via the website</h2>
<p>Receipt of a contact with the following information:</p>
<ul>
    <li><strong>Full name </strong>   : {{ $contact['full_name'] }}</li>
    <li><strong>Email</strong>        : {{ $contact['email_address'] }}</li>
    <li><strong>Phone number</strong> : {{ $contact['phone_number'] }}</li>
    <li><strong>Message</strong>      : {{ $contact['message'] }}</li>
</ul>
</body>
</html>
