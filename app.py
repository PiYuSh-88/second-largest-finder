from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/find-second-largest', methods=['POST'])
def find_second_largest():
    data = request.get_json()
    numbers_str = data.get('numbers', '')
    try:
        # Split, strip, and filter out empty strings
        numbers = [int(x) for x in numbers_str.split(',') if x.strip() != '']
    except ValueError:
        return jsonify({'error': 'Invalid input. Please enter only numbers separated by commas.'}), 400
    unique_numbers = list(set(numbers))
    if len(unique_numbers) < 2:
        return jsonify({'error': 'Need at least two unique numbers.'}), 400
    unique_numbers.sort(reverse=True)
    return jsonify({'second_largest': unique_numbers[1]})

if __name__ == '__main__':
    app.run(debug=True) 