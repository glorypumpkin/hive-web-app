
import torch

from train import BeehiveModel

# https://www.youtube.com/watch?v=Vs730jsRgO8

def main():
  pytorch_model = BeehiveModel()
  pytorch_model.load_state_dict(torch.load('model.pth'))
  pytorch_model.eval()
  dummy_input = torch.zeros(280 * 280 * 4)
  torch.onnx.export(pytorch_model, dummy_input, 'onnx_model.onnx', verbose=True)


if __name__ == '__main__':
  main()
