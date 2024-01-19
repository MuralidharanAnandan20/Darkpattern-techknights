from flask import Flask, request, jsonify
from tensorflow import keras
import numpy as np

app = Flask(__name__)

# Load the Keras model
model_path = r'C:\Users\pramo\OneDrive\Desktop\lstm\lstm_model.h5'  # Update with the correct path
model = keras.models.load_model(model_path)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    emails = data.get('emails', [])

    # Preprocess emails if needed, then make predictions
    # Assuming a simple example where the model predicts a single class
    predictions = model.predict(np.array([emails]))[0]

    return jsonify({'predictions': predictions.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
