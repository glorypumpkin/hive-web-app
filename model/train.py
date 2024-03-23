import torch 
import torch.nn as nn
import torch.optim as optim
import torch.utils.data as data
import numpy as np
import json
import matplotlib.pyplot as plt

#source: https://machinelearningmastery.com/lstm-for-time-series-prediction-in-pytorch/
def load_data():
    """Load data from a json file"""
    with open('hivedata.json', 'r') as file:
        data = json.load(file)
        # data is a list of dictionaries with keys: month, hour, weight, weightDiff, temperature
        # convert to a tensor of shape (n_samples, n_features)
        dataset = torch.tensor([[d['month'], d['hour'], d['weight'], d['temperature'], d['weightDiff']] for d in data])
    return dataset

def create_dataset(dataset, lookback):
    """Transform a time series into a prediction dataset
    
    Args:
        dataset: A numpy array of time series, first dimension is the time steps
        lookback: Size of window for prediction
    """
    # X: [month, hour, weight, temperature] for each time step
    # y: weightDiff for each time step
    X, y = [], []
    for i in range(len(dataset)-lookback):
        # feature is the first 4 columns
        feature = dataset[i:i+lookback][:,0:4]
        target = dataset[i+1:i+lookback+1][:,4]
        # target is of shape (lookback,)
        # we need to reshape it to (lookback, 1)
        target = target.view(-1, 1)
        # print(target)
        X.append(feature)
        y.append(target)
    # torch.stack() converts a list of tensors to a tensor
    return torch.stack(X), torch.stack(y)

class BeehiveModel(nn.Module):
    # LSTM model for predicting 
    def __init__(self):
        super().__init__()
        # input_size: number of features in the input
        # hidden_size: number of hidden units
        # num_layers: number of LSTM layers
        # batch_first: input and output tensors are provided as (batch, seq, feature)
        self.lstm = nn.LSTM(input_size=4, hidden_size=50, num_layers=1, batch_first=True)
        self.linear = nn.Linear(50, 1)
    def forward(self, x):
        x, _ = self.lstm(x)
        # Take the last from sequence of LSTM outputs and pass it through a linear layer
        # x = x[:, -1, :]
        x = self.linear(x)
        return x

def train_model(dataset, lookback):
    # split dataset into train and test sets
    train_size = int(len(dataset) * 0.67)
    test_size = len(dataset) - train_size
    train, test = dataset[:train_size], dataset[train_size:]
    X_train, y_train = create_dataset(train, lookback=lookback)
    print(X_train.shape, y_train.shape)
    X_test, y_test = create_dataset(test, lookback=lookback)
    # print(X_test.shape, y_test.shape)

    # create data loaders
    model = BeehiveModel()
    # Adam optimizer - a variant of gradient descent algorithm that is more efficient for training neural networks
    optimizer = optim.Adam(model.parameters())
    # Mean Squared Error loss function - a common loss function for regression problems
    loss_fn = nn.MSELoss()
    # create a data loader for training data with batch size 8 and shuffle the data at each epoch
    loader = data.DataLoader(data.TensorDataset(X_train, y_train), shuffle=True, batch_size=8)
    n_epochs = 1000
    for epoch in range(n_epochs):
        model.train()
        for X_batch, y_batch in loader:
            y_pred = model(X_batch)
            # print (y_pred.shape, y_batch.shape)
            loss = loss_fn(y_pred, y_batch)
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
        # Validation
        if epoch % 50 != 0:
            continue
        model.eval()
        with torch.no_grad():
            y_pred = model(X_train)
            train_rmse = np.sqrt(loss_fn(y_pred, y_train))
            y_pred = model(X_test)
            test_rmse = np.sqrt(loss_fn(y_pred, y_test))
        print("Epoch %d: train RMSE %.4f, test RMSE %.4f" % (epoch, train_rmse, test_rmse))

    # save the model
    torch.save(model.state_dict(), 'model.pth')


def main():
    dataset = load_data()
    # print(dataset)
    lookback = 5
    # X, y = create_dataset(dataset, lookback)
    train_model(dataset, lookback)
    

if __name__ == '__main__':
    main()