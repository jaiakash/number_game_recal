from flask import Flask, render_template
from flask_socketio import SocketIO
from dotenv import load_dotenv, find_dotenv
import os


app = Flask(__name__)
load_dotenv(find_dotenv())
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
socketio = SocketIO(app)


@app.route('/')
def sessions():
    return render_template('home.html')


def messageReceived(methods=['GET', 'POST']):
    print('message was received!!!')


@socketio.on('message event')
def handle_message_event(json, methods=['GET', 'POST']):
    print('received message event: ' + str(json))
    socketio.emit('message response', json, callback=messageReceived)


if __name__ == '__main__':
    socketio.run(app, debug=True)
