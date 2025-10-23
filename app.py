from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np
import pandas as pd
import os

app = Flask(__name__)

# Load model and encoders
def load_model():
    try:
        model = joblib.load('model_drug_tree.pkl')
        encoders = joblib.load('encoders.pkl')
        return model, encoders
    except FileNotFoundError:
        return None, None

model, encoders = load_model()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get form data
        age = float(request.form['age'])
        sex = request.form['sex']
        bp = request.form['bp']
        cholesterol = request.form['cholesterol']
        na_to_k = float(request.form['na_to_k'])
        
        # Check if model is loaded
        if model is None or encoders is None:
            return jsonify({
                'error': 'Model tidak ditemukan. Silakan jalankan notebook terlebih dahulu untuk melatih model.'
            }), 500
        
        # Preprocess input data
        sex_encoded = encoders['le_sex'].transform([sex])[0]
        bp_encoded = encoders['le_bp'].transform([bp])[0]
        cholesterol_encoded = encoders['le_cholesterol'].transform([cholesterol])[0]
        
        # Create input array
        input_data = np.array([[age, sex_encoded, bp_encoded, cholesterol_encoded, na_to_k]])
        
        # Make prediction
        prediction_encoded = model.predict(input_data)[0]
        prediction = encoders['le_drug'].inverse_transform([prediction_encoded])[0]
        
        # Get prediction probabilities
        probabilities = model.predict_proba(input_data)[0]
        drug_classes = encoders['le_drug'].classes_
        
        # Create probability dictionary
        prob_dict = {}
        for i, drug in enumerate(drug_classes):
            prob_dict[drug] = round(probabilities[i] * 100, 2)
        
        # Get feature importance
        feature_names = ['Age', 'Sex', 'BP', 'Cholesterol', 'Na_to_K']
        feature_importance = model.feature_importances_
        importance_dict = {}
        for i, feature in enumerate(feature_names):
            importance_dict[feature] = round(feature_importance[i] * 100, 2)
        
        return jsonify({
            'prediction': prediction,
            'probabilities': prob_dict,
            'feature_importance': importance_dict,
            'input_data': {
                'age': age,
                'sex': sex,
                'bp': bp,
                'cholesterol': cholesterol,
                'na_to_k': na_to_k
            }
        })
        
    except Exception as e:
        return jsonify({'error': f'Terjadi kesalahan: {str(e)}'}), 500

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/model_info')
def model_info():
    if model is None:
        return jsonify({'error': 'Model tidak ditemukan'}), 404
    
    return jsonify({
        'model_type': str(type(model).__name__),
        'max_depth': model.max_depth,
        'n_features': model.n_features_in_,
        'feature_names': ['Age', 'Sex', 'BP', 'Cholesterol', 'Na_to_K'],
        'target_classes': encoders['le_drug'].classes_.tolist() if encoders else []
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
