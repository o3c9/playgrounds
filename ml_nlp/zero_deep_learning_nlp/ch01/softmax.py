import numpy as np


class Softmax:
    def __init__(self):
        self.params = []

    def forward(self, x):
        return 1 / (1 + np.exp(-x))

    def backward(self):
        pass
