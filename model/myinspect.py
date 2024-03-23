import torch 
import torch.nn as nn
import torch.optim as optim
import torch.utils.data as data
import numpy as np
import json
import matplotlib.pyplot as plt

from train import load_data, create_dataset, BeehiveModel

# load model.pth', do prediction and plot

# load model
model = BeehiveModel()
model.load_state_dict(torch.load('model.pth'))
model.eval()

# load data
dataset = load_data()

# split dataset into train and test sets
lookback = 5
train_size = int(len(dataset) * 0.67)
test_size = len(dataset) - train_size
train, test = dataset[:train_size], dataset[train_size:]
X_train, y_train = create_dataset(train, lookback=lookback)
print(X_train.shape, y_train.shape)
X_test, y_test = create_dataset(test, lookback=lookback)
# print(X_test.shape, y_test.shape)

with torch.no_grad():
    # shift train predictions for plotting
    train_plot = np.ones_like(dataset) * np.nan
    y_pred = model(X_train)
    y_pred = y_pred[:, -1, :]
    # model(X_train) is a prediction for each time step
    train_plot[lookback:train_size] = model(X_train)[:, -1, :]
    # shift test predictions for plotting
    test_plot = np.ones_like(dataset) * np.nan
    test_plot[train_size+lookback:len(dataset)] = model(X_test)[:, -1, :]
# plot
# plot dataset (weight and weight diff)
plt.plot(dataset[:, 4], c='y')
# plot weight predictions
plt.plot(train_plot, c='r')
plt.plot(test_plot, c='g')

# legend
plt.legend(['dataset', 'train', 'test'], loc='upper left')

plt.show()