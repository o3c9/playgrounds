import numpy as np


class Affine:
    def __init__(self, w, b):
        self.params = [w, b]

    def forward(self, x):
        w, b = self.params
        return np.dot(x, w) + b

    def backward(self):
        pass
