<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
</head>

<body style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.6;">

    <div style="text-align: center; margin-bottom: 20px;">
        <img src="{{ asset('images/mna-logo.png') }}"
            alt="MNA Transportation LLC"
            width="200"
            height="60"
            style="display: block; margin: 0 auto; max-width: 100%; height: auto;">
    </div>

    <p>
        Thank you for choosing MNA Transportation LLC for your patient transportation needs. We're pleased to confirm your booking details:
    </p>

    <p><strong>Patient Name:</strong> {{ $contact['patient_name'] }}</p>
    <p><strong>Type of service:</strong> {{ $contact['type_of_service'] }}</p>
    <p><strong>Pick-up Date & Time:</strong> {{ (new DateTime($contact['date_of_ride']))->format('l, M d Y') }} - {{ $contact['time_of_ride'] }}</p>
    <p><strong>Appointment Time:</strong> {{ $contact['appointment_time'] }}</p>
    <p><strong>Return time:</strong> {{ $contact['return_time'] }}</p>
    <p><strong>Pick-up Location:</strong> {{ $contact['pick_up_location'] }}</p>
    <p><strong>Drop-off Location:</strong> {{ $contact['drop_off_location'] }}</p>
    <p><strong>Rider payer:</strong> {{ strtoupper($contact['rider_payer']) }}</p>
    <p><strong>Your booking reference number is:</strong> {{ $contact['uuid'] }}</p>

    <p>
        Our driver will arrive at the specified pick-up location on time and will be equipped to provide a safe and comfortable journey for your patient. If you have any questions or need to make changes to your booking,
        please contact us at +1 857-333-2490 or reply to this email.
    </p>

    <p>
        Thank you for entrusting us with your patient's transportation. We look forward to providing a seamless and pleasant experience.
    </p>

    <br>

    <p>Best regards,</p>
    <p><strong>MNA Transportation LLC Team</strong></p>
</body>

</html>
