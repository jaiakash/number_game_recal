from flask import Flask, render_template
from flask_socketio import SocketIO
from dotenv import load_dotenv, find_dotenv
import os
from playsound import playsound

# for playing note.wav file
playsound('static/background.mp3')


app = Flask(__name__)
load_dotenv(find_dotenv())
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
socketio = SocketIO(app)


@app.route('/one')
def one():
    return render_template('home.html')


@app.route('/two')
def two():
    return render_template('home.html')


@app.route('/three')
def three():
    return render_template('home.html')


@socketio.on('message event')
def handle_message_event(json, methods=['GET', 'POST']):
    print('Python: received message event from one: ' + str(json))
    socketio.emit('message response', json)


if __name__ == '__main__':
    socketio.run(app)
    # socketio.run(app, debug=True)
