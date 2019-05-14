# from two_layer_net import TwoLayerNet

import numpy as np
from two_layer_net import TwoLayerNet

X = np.random.rand(10, 2)

nn = TwoLayerNet(2, 4, 3)

print(nn.predict(X))

print(nn.params)

