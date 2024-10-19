from flask import Flask, request, jsonify
import requests

app = Flask(__name__)


def send_sms(phone_number, message):
    response = requests.post('https://textbelt.com/text', {
        'phone': phone_number,
        'message': message,
        'key': 'textbelt',  
    })

    result = response.json()
    return result

@app.route('/send-emergency', methods=['POST'])
def send_emergency():
    emergency_info = request.json 

    phone_number = emergency_info['phone_number']
    message = emergency_info['message']

    
    result = send_sms(phone_number, message)

    if result['success']:
        return jsonify({'status': 'Message sent successfully'}), 200
    else:
        return jsonify({'status': f"Message failed: {result['error']}"}), 400

if __name__ == "__main__":
    app.run(debug=True)
