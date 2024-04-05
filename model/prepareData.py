
import json
import time
import datetime

def convertor(fileContents, dataType):
    lines = fileContents.split('\n')
    relevant_data = []
    if dataType == 'older':
        for i in range(1, len(lines) - 1):
            line = lines[i]
            # Leverage parseLine to directly filter data
            current_data = parseLine(line, dataType)
            next_data = parseLine(lines[i+1], dataType)

            # calculate weigth difference
            # Append only if parsed_data is not empty (avoids None or empty lists)
            if current_data:
                if next_data:
                    weigthDiff = current_data['weigth'] - next_data['weigth']
                    current_data['weightDiff'] = round(weigthDiff,2)
                else:
                    current_data['weightDiff'] = 0.0
                if abs(current_data['weightDiff']) < 7:
                    relevant_data.append(current_data)
    else:
        # skip first line
        for i in range(1, len(lines)):
            line = lines[i]
            # Leverage parseLine to directly filter data
            # print(f'line: {line}')
            parsed_data = parseLine(line, dataType)
            # Append only if parsed_data is not empty (avoids None or empty lists)
            if parsed_data:
                relevant_data.append(parsed_data)

    return relevant_data

def parseLine(line, dataType):
    if dataType == 'older':
        stan, datum, cas, kg, tepl, extra = line.split()
    else:
        stan, datum, cas, kg, rozdil, tepl = line.split()

    # datum: 15/10/23
    # cas: 18 (h)

    datum_parts = datum.split('/')
    # only april, may, june, july is relevant
    month = int(datum_parts[1])
    day = int(datum_parts[0])
    year = int(datum_parts[2])
    
    timestamp = int(datetime.datetime.strptime(datum, "%d/%m/%Y").timestamp())
    if not (4 <= month <= 7):  # Check for relevant months
        return []  # Return an empty list for irrelevant data

    kg_float = float(kg)
    tepl_float = float(tepl)

    if dataType == 'older':
        cas = cas.split(':')
        hour_int = int(cas[0])

        return {
            'timestamp': timestamp,
            'day': day,
            'month': month,
            'year': year,
            'hour': hour_int, 
            'weigth': kg_float,
            'tempWeigth': tepl_float
        }
    else:
        hour_int = int(cas)
        rozdil_float = float(rozdil)

        if abs(rozdil_float) > 10:
            return []
        return {
            'timestamp': timestamp,
            'day': day,
            'month': month,
            'year': year,
            'hour': hour_int, 
            'weigth': kg_float,
            'weightDiff': rozdil_float,
            'tempWeigth': tepl_float
        }
        
def addWeatherData(data, weatherData):
    for i in range(len(data)):
        current_array = data[i]
        # print(f'current_array: {current_array}\n')
        for j in range(len(current_array)):
            current_data = current_array[j]
            day = current_data['day']
            month = current_data['month']
            year = current_data['year']
            for k in range(len(weatherData)):
                currentWeatherData = weatherData[k]
                # print(f'currentWeatherData: {currentWeatherData}\n')
                if currentWeatherData['day'] == day and currentWeatherData['month'] == month and currentWeatherData['year'] == year:
                    current_data['tempWeather'] = currentWeatherData['tempWeather']
                    current_data['precipitation'] = currentWeatherData['precipitation']
                    current_data['solarenergy'] = currentWeatherData['solarenergy']
                    break

def parseWeatherData(weatherData):
    parsedData = []
    for i in range(len(weatherData)):
        currentData = weatherData[i]
        datum = currentData['datetime']
        datum_parts = datum.split('-')
        month = int(datum_parts[1])
        day = int(datum_parts[2])
        year = int(datum_parts[0])
        tempWeather = currentData['temp']
        precipitation = currentData['precip']
        solarenergy = currentData['solarenergy']
        parsedData.append({
            'day': day,
            'month': month,
            'year': year,
            'tempWeather': tempWeather,
            'precipitation': precipitation,
            'solarenergy': solarenergy
        })
    return parsedData

def main ():
    filesArray = ['zaznam2018.txt', 'zaznam2019.txt', 'zaznam2020.txt', 'zaznam2021.txt']
    data = []
    for file in filesArray:
        with open(file, 'r') as f:
            print(f'Processing {file}')
            fileContents = f.read()
            # print(f'fileContents: {fileContents}')
            # data += convertor(fileContents, 'older')
            data.append(convertor(fileContents, 'older'))
    with open('hivedata.txt', 'r') as file:
        print(f'Processing hivedata.txt')
        fileContents = file.read()
        # data += convertor(fileContents, 'newer')
        # reverse the order of the data
        convertedData = convertor(fileContents, 'newer')
        data.append(convertedData[::-1])

    
    weatherFilesArray = ['weather2018.json', 'weather2019.json', 'weather2020.json', 'weather2021.json', 'weather2022.json', 'weather2023.json']

    for file in weatherFilesArray:
        with open(file, 'r') as f:
            print(f'Processing {file}')
            fileContents = f.read()
            loaded = json.loads(fileContents)
            weatherData = loaded['days']
            parsedWeatherData = parseWeatherData(weatherData)
            mergedData = addWeatherData(data, parsedWeatherData)
            # print(f'Merged data: {mergedData}')

    with open('hivedata.json', 'w') as file:
        json.dump(data, file, indent=2) 
    

if __name__ == '__main__':
    main()