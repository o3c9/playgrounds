import numpy as np
from affine import Affine
from sigmoid import Sigmoid


class TwoLayerNet:
    def __init__(self, input_size, hidden_size, output_size):
        I, H, O = input_size, hidden_size, output_size

        W1 = np.random.randn(I, H)
        b1 = np.random.randn(H)

        W2 = np.random.randn(H, O)
        b2 = np.random.randn(O)

        self.grads = []
        self.layers = [
            Affine(W1, b1),
            Sigmoid(),
            Affine(W2, b2)
        ]

        self.params = []
        for l in self.layers:
            self.params += l.params

    def predict(self, x):
        current = x
        for l in self.layers:
            current = l.forward(current)
        return current

    def train(self, x):
        pass
