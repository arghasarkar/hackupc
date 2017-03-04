#!/usr/bin/env python3


from datetime import datetime
import argparse
import logging
import random
from sklearn.svm import SVC
import bcolz
from sklearn import preprocessing
import collections


PATH = '/Users/krishna/MOOC/AD/'


def load_array(fname):
    return bcolz.open(fname)[:]

if __name__ == '__main__':
    X = load_array(PATH + 'data/train_X.bc/')
    y = load_array(PATH + 'data/train_y.bc/')
    print(X.shape)
    print(y.shape)
    num_ones = (y == 1).sum()
    num_two = (y == 2).sum()
    num_three = (y == 3).sum()
    print(num_ones)
    print(num_two)
    print(num_three)
    #print(y)
