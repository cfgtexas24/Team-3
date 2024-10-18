from flask import Flask, jsonify, request

# Initialize Flask app
app = Flask(__name__)

# Route for the home page
@app.route('/')
def home():
    return "Welcome to the Flask Backend!"

# Run the app on port 5000
if __name__ == "__main__":
    app.run(debug=True)
