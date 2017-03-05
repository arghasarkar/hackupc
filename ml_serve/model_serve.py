#!/usr/bin/env python3

from flask import Flask
from flask import request
from flask.json import jsonify
from flask_cors import CORS, cross_origin
import subprocess
import os

app = Flask(__name__)
CORS(app)


@app.route("/test")
def test():
    return "Hello World"

@app.route("/model", methods=['GET'])
def r_sub():
    lat = request.args.get('lat', default=51.86215)
    long = request.args.get('long', default=-2.049923)
    lc = request.args.get('lc', default=1)
    weather = request.args.get('weather', default=1)
    day = request.args.get('day', default=6)


    p = subprocess.Popen(['Rscript', '/Users/krishna/MOOC/hackupc/ml_code/predict.r', lat, long], stdout=subprocess.PIPE)
    p.wait()
    data = p.stdout.read()
    return data


if __name__ == "__main__":
    app.run(host='0.0.0.0', port='8889')