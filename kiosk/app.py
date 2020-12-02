from flask import Flask,render_template

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('check.html')


@app.route('/change_to_checkpoint')
def checkpoint():
    return render_template('numberpad.html')

@app.route('/change_to_complete')
def complete():
    return render_template('complete.html')

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)