
import json

def convertor(fileContents):
    lines = fileContents.split('\n')
    data = []
    # skip header
    for i in range(len(lines) - 2, 0, -1):
        line = lines[i]
        parsed = parseLine(line)
        data.append(parsed)
    return data

def parseLine(line):
    stan, datum, cas, kg, rozdil, tepl = line.split()

    # datum: 15/10/23
    # cas: 18 (h)
    # datum: "2019-01-01T00:00:00.000Z"

    datum_parts = datum.split('/')
    month = int(datum_parts[1])
    hour_int = int(cas)

    rozdil_float = float(rozdil)
    kg_float = float(kg)
    tepl_float = float(tepl)

    return {
        'month': month,
        'hour': hour_int, 
        'weight': kg_float,
        'weightDiff': rozdil_float,
        'temperature': tepl_float
    }

def main ():
    with open('hivedata.txt', 'r') as file:
        fileContents = file.read()
        data = convertor(fileContents)
    with open('hivedata.json', 'w') as file:
        json.dump(data, file, indent=2) 
    

if __name__ == '__main__':
    main()