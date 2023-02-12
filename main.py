from flask import Flask
from flask_socketio import SocketIO
from decouple import config

app = Flask(__name__)
app.config['SECRET_KEY'] = config('SECRET_KEY', default='NOT_SAFE')
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
