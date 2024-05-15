import torch 
import torch.nn as nn
import torch.optim as optim
import torch.utils.data as data
import numpy as np
import json
import matplotlib.pyplot as plt
import datetime
import matplotlib.dates as mdates
import pandas

from train import load_data, create_dataset, BeehiveModel

# load model
model = BeehiveModel()
print('model loaded', model)
model.load_state_dict(torch.load('model.pt'))
model.eval()

# load data
datasetArray = load_data('eval.json')[0]
# cut the last column from the tensor
datasetArray = datasetArray[:, :-1]


with open('eval.json', 'r') as file:
    loaded = json.load(file)[0]
    

def show_graph(startdate, enddate, predictionStart, duration):
    weight_real = []
    for object in loaded:
        thisdate = datetime.datetime(2024, object['month'], object['day'])
        keep = thisdate >= startdate and thisdate <= enddate
        if keep:
            weight_real.append(object)

    df = pandas.DataFrame.from_records(weight_real)

    # add a time column using the hour, day and month columns
    df['timestamp'] = pandas.to_datetime(df[['year', 'month', 'day', 'hour']])
    print(df)

    # Make prediction

    prediction_start_row = df[df['timestamp'] == predictionStart]
    index_of_prediction_start = prediction_start_row.index[0]
    print(index_of_prediction_start)

    # tensor clone
    datasetArrayCopy = datasetArray.clone()

    weightDiffs = make_series_prediction(datasetArrayCopy, index_of_prediction_start, duration)

    # weightDiffs -> weight
    weights = []
    weight = df['weigth'][index_of_prediction_start - 1]
    for i in range(duration):
        weight = weight + weightDiffs[i]
        weights.append(weight)
    
    #plot the timeseries
    fig, ax = plt.subplots()
    ax.plot(df['timestamp'], df['weigth'], label='Real')
    # Plot prediction starting at index index_of_prediction_start
    ax.plot(df['timestamp'][index_of_prediction_start:index_of_prediction_start+duration], weights, label='Prediction')
    ax.xaxis.set_major_locator(mdates.DayLocator(interval=1))
    ax.xaxis.set_major_formatter(mdates.DateFormatter('%d-%m'))
    ax.set_xticks(ax.get_xticks()[::2])
    plt.xticks(rotation=45)
    # show legend
    ax.legend()
    plt.show()

def make_series_prediction(tensor, from_index, count):
    idx = from_index
    diffPredictions = []
    for i in range(count):
        lookback = 4
        inputtensor = datasetArray[idx - lookback:idx]
        with torch.no_grad():
            pred = model(inputtensor)
        weightDiff = pred[-1].item()
        diffPredictions.append(weightDiff)
        # Update the tensor for the next prediction
        # weigth is index 2
        tensor[idx][2] += weightDiff
        idx += 1
    return diffPredictions

startdate = datetime.datetime(2024, 4, 1)
enddate = datetime.datetime(2024, 4, 30)

startprediction = datetime.datetime(2024, 4, 3)

show_graph(startdate, enddate, startprediction, 70)

# outputData Float32Array(4) [
#   1.7219171524047852,
#   -0.4825262129306793,
#   -0.06085410714149475,
#   0.5797086358070374
# ]
