<?php
// Handle CORS (Cross-Origin Resource Sharing)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle Preflight Request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method Not Allowed"]);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

$name = $input['name'] ?? 'Unknown';
$phone = $input['phone'] ?? 'No phone';
$business = $input['business'] ?? 'Not specified';
$message = $input['message'] ?? '';

// RESEND API CONFIGURATION
$resendApiKey = 're_Lw3yeg6E_EiUDeRodA7EdorEY7mREo8hp';
$toEmail = 'orenshamir5@gmail.com';

// Prepare Data for Resend API
$data = [
    'from' => 'Oren Shamir Lead <onboarding@resend.dev>',
    'to' => [$toEmail],
    'subject' => "ליד חדש מהאתר: $name",
    'html' => "
        <div dir='rtl' style='font-family: Arial, sans-serif; padding: 20px; background-color: #f9fafb;'>
          <h2 style='color: #22C55E;'>ליד חדש התקבל! 🚀</h2>
          <div style='background-color: white; padding: 20px; border-radius: 10px; border: 1px solid #e5e7eb;'>
            <p><strong>שם:</strong> $name</p>
            <p><strong>טלפון:</strong> <a href='tel:$phone'>$phone</a></p>
            <p><strong>סוג העסק:</strong> $business</p>
            <p><strong>הודעה:</strong></p>
            <p style='white-space: pre-wrap;'>" . ($message ? $message : 'לא צורפה הודעה.') . "</p>
          </div>
          <p style='font-size: 12px; color: #888; margin-top: 20px;'>נשלח מאתר orenshamirweb (via PHP)</p>
        </div>
    "
];

// Send Request to Resend API via cURL
$ch = curl_init('https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $resendApiKey,
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode >= 200 && $httpCode < 300) {
    http_response_code(200);
    echo json_encode(["success" => true, "data" => json_decode($response)]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to send email", "details" => json_decode($response)]);
}
?>
