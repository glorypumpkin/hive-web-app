import torch
from train import BeehiveModel

def main():
    # load model
    model = BeehiveModel()
    model.load_state_dict(torch.load('model.pt'))
    model.eval()
    dummy_input = torch.zeros(5, 4)
    torch.onnx.export(model, dummy_input, 'model.onnx', verbose=True)

if __name__ == '__main__':
    main()
    