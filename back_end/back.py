import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS

from io import BytesIO
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)
# Configurar CORS para permitir requisições do seu front-end
# CORS(app, resources={
#     r"/api/*": {
#         "origins": [
#             "https://snack-web-player.s3.us-west-1.amazonaws.com",
#             'https://38.23.46.54'
#         ]
#     }
# })
# CORS(app, resources={r"/api/*": {"origins": "https://snack-web-player.s3.us-west-1.amazonaws.com"}})

# Pasta onde as imagens serão salvas
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({'message': 'pong'}), 200

@app.route('/api', methods=['POST'])
def api():
    data = request.get_json()
    message = data.get('message')
    return jsonify({'response': f'Recebido: {message}'})
# @app.route('/upload', methods=['POST'])
# def upload_file():
#     if 'image' not in request.files:
#         return jsonify({'error': 'No file part'}), 400

#     file = request.files['image']
#     if file.filename == '':
#         return jsonify({'error': 'No selected file'}), 400

#     if file:
#         filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
#         file.save(filepath)
#         return jsonify({'message': 'File successfully uploaded', 'filepath': filepath}), 200

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/upload', methods=['POST'])
def upload_file():
    print(request.files)
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['image']
    print(file)

    filename = 'temp.jpeg'
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)
    return jsonify({'error': 'No file part'}), 200

   
   
if __name__ == '__main__':
    app.run(debug=True)