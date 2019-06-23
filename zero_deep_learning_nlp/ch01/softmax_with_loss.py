import numpy as np


class SoftmaxWithLoss:
    def __init__(self):
        self.params = []

    def forward(self, x):
        return 1 / (1 + np.exp(-x))

    def backward(self):
        pass
