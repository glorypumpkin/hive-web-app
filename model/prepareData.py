
import json
import time
import datetime

def convertor(fileContents, dataType):
    lines = fileContents.split('\n')
    relevant_data = []
    for i in range(1, len(lines) - 1):
        line = lines[i]
        # Leverage parseLine to directly filter data
        current_data = parseLine(line, dataType)
        if current_data is not None:
            relevant_data.append(current_data)
    return relevant_data

def dayDataIsValid(dayData):
    return abs(dayData[-1]['weigth'] - dayData[0]['weigth']) < 7

def filterData(data):
    filteredData = []
    temp = []
    day = None
    for measurement in data:
        thisDay = measurement['day']
        if day != thisDay:
            if len(temp) > 0 and dayDataIsValid(temp):
                filteredData.extend(temp)
            temp = []
            day = thisDay

        temp.append(measurement)

    return filteredData

def countWeightDiff(data):
    result = []
    for i in range(len(data)-1):
        now = data[i]['weigth']
        next = data[i+1]['weigth']
        diff = round(next - now, 2)
        if abs(diff) > 10:
            diff = 0
        data[i+1]['weightDiff'] = diff
        result.append(data[i])
    result[0]['weightDiff'] = 0
    return result



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
        return None  # Return an empty list for irrelevant data

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
            converted = convertor(fileContents, 'older')
            # print(f'converted: {converted}')
            filtered = filterData(converted)
            counted = countWeightDiff(filtered)
            # print(f'fileContents: {fileContents}')
            # data += convertor(fileContents, 'older')
            data.append(counted)
    with open('hivedata.txt', 'r') as file:
        print(f'Processing hivedata.txt')
        fileContents = file.read()
        converted = convertor(fileContents, 'newer')
        filtered = filterData(converted)
        # data += convertor(fileContents, 'newer')
        # reverse the order of the data
        data.append(filtered[::-1])

    
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