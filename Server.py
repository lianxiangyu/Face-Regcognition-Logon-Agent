from flask import Flask, render_template, Response, jsonify, request, make_response
from camera import VideoCamera
from face_recognition import detect
from login_sac import login_sac

app = Flask(__name__)

video_camera = None
global_frame = None


@app.route('/')
def index():
    return render_template('Welcome.html')


@app.route('/face_check', methods=['POST'])
def face_check():
    global recognize_count
    global video_camera
    if video_camera is None:
        video_camera = VideoCamera()

    frame = video_camera.get_frame_frame()

    if frame is not None:

        result = detect(frame)
        print(result)
        if result != "":
            id = result['id']
            psw = result['psw']

            resp = make_response(jsonify({
                'id': id,
                'psw': psw
            }))

    # logon to any client with id/psw


def video_stream():
    global video_camera
    global global_frame

    if video_camera is None:
        video_camera = VideoCamera()

    while True:
        frame = video_camera.get_frame()

        if frame is not None:
            global_frame = frame
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + bytes(frame) + b'\r\n\r\n')
        if global_frame is not None:
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + bytes(global_frame) + b'\r\n\r\n')


@app.route('/video_viewer')
def video_viewer():
    return Response(video_stream(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':
    app.run(host='0.0.0.0', threaded=True)
