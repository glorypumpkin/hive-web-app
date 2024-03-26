
import json

def convertor(fileContents):
    lines = fileContents.split('\n')
    relevant_data = []
    # Skip header
    for i in range(len(lines) - 2, 0, -1):
        line = lines[i]

        # Leverage parseLine to directly filter data
        parsed_data = parseLine(line)

        # Append only if parsed_data is not empty (avoids None or empty lists)
        if parsed_data:
            relevant_data.append(parsed_data)

    return relevant_data

def parseLine(line):
    stan, datum, cas, kg, rozdil, tepl = line.split()

    # datum: 15/10/23
    # cas: 18 (h)
    # datum: "2019-01-01T00:00:00.000Z"

    datum_parts = datum.split('/')
    # only april, may, june, july is relevant
    month = int(datum_parts[1])
    
    if not (4 <= month <= 7):  # Check for relevant months
        return []  # Return an empty list for irrelevant data

    hour_int = int(cas)
    rozdil_float = float(rozdil)

    if abs(rozdil_float) > 10:  # Check for relevant weight difference
        return []  # Return an empty list
    
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