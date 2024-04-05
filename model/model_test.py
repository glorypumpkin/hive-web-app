import torch 
import torch.nn as nn
import torch.optim as optim
import torch.utils.data as data
import numpy as np
import json
import matplotlib.pyplot as plt

from train import load_data, create_dataset, BeehiveModel

# load model
model = BeehiveModel()
print('model loaded', model)
model.load_state_dict(torch.load('model.pt'))
model.eval()

test_data = np.array([ 4,                  20,
    17.549999237060547,   7.599999904632568,
     7.599999904632568, 0.30000001192092896,
     9.899999618530273,                   4,
                     2,  17.940000534057617,
                     7,                   7,
    1.7000000476837158,   2.700000047683716,
                     4,                   8,
    17.889999389648438,                   7,
                     7,  1.7000000476837158,
     2.700000047683716,                   4,
                    14,  17.200000762939453,
                     7,                   7,
    1.7000000476837158,   2.700000047683716])
test_data = test_data.reshape((4, 7))

torch_tensor = torch.tensor(test_data, dtype=torch.float32)

# outputData Float32Array(4) [
#   1.7219171524047852,
#   -0.4825262129306793,
#   -0.06085410714149475,
#   0.5797086358070374
# ]

result = model(torch_tensor)
print(result)