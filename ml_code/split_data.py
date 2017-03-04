#!/usr/bin/env python3

import numpy as np
import pandas as pd
from geohash import encode
from sklearn.model_selection import train_test_split
import bcolz
np.random.seed(1337)

PATH = '/Users/krishna/MOOC/AD/'


def encode_wrap(x):
    return encode(x[1], x[0], precision=4)


def save_np(arr, file_name):
    c = bcolz.carray(arr, rootdir=file_name, mode='w')
    c.flush()

data = pd.read_csv('/Users/krishna/Downloads/dft-accident-data/accident_process.csv', sep=",")
data['geocode'] = data[['Longitude', 'Latitude']].apply(encode_wrap, axis=1)
y = data[['Accident_Severity']]
X = data[['geocode']]
X_train, X_test, y_train, y_test = train_test_split(X, y, train_size=2000, test_size=500, random_state=1337, stratify=y)

print(data['Accident_Severity'].value_counts())

save_np(X_train.as_matrix(), PATH + 'data/train_X.bc')
save_np(y_train.as_matrix(), PATH + 'data/train_y.bc')
save_np(X_test.as_matrix(), PATH + 'data/test_X.bc')
save_np(y_test.as_matrix(), PATH + 'data/test_y.bc')
