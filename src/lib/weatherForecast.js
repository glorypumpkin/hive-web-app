export const weatherIcons = {
    sunny: "/sunny.png",
    partialcloud: "/partial-cloudy.png",
    overcast: "/mostly-cloudly.png",
    stormy: "/stormy.png",
    rainyday: "/rainy.png",
    snow: "/snowfell.png",
    heavywind: "/heavy-wind.png",
    hailstorm: "/hailstorm.png"
}

const weatherTypes = {
    "type_1": {
        description: "Foukající nebo snášející se sníh",
        icon: "/snowfell.png"
    },
    "type_2": {
        description: "Mrholení",
        icon: "/rainy.png"
    },
    "type_3": {
        description: "Silné mrholení",
        icon: "/rainy.png"
    },
    "type_4": {
        description: "Lehké mrholení",
        icon: "/rainy.png"
    },
    "type_5": {
        description: "Silné mrholení/dešť",
        icon: "/rainy.png"
    },
    "type_6": {
        description: "Lehké mrholení/dešť",
        icon: "/rainy.png"
    },
    "type_7": {
        description: "Prachová bouře",
        icon: "/hailstorm.png"
    },
    "type_8": {
        description: "Mlha",
        icon: "/partial-cloudy.png"
    },
    "type_9": {
        description: "Mrznoucí mrholení/mrznoucí déšť",
        icon: "/snowfell.png"
    },
    "type_10": {
        description: "Silné mrznoucí mrholení/mrznoucí déšť",
        icon: "/snowfell.png"
    },
    "type_11": {
        description: "Slabé mrznoucí mrholení/mrznoucí déšť",
        icon: "/snowfell.png"
    },
    "type_12": {
        description: "Mrznoucí mlha",
        icon: "/snowfell.png"
    },
    "type_13": {
        description: "Silný mrznoucí déšť",
        icon: "/snowfell.png"
    },
    "type_14": {
        description: "Lehký mrznoucí déšť",
        icon: "/snowfell.png"
    },
    "type_15": {
        description: "Trychtýřovitý mrak/tornádo",
        icon: "/stormy.png"
    },
    "type_16": {
        description: "Krupobití",
        icon: "/hailstorm.png"
    },
    "type_17": {
        description: "Led",
        icon: "/snowfell.png"
    },
    "type_18": {
        description: "Blesk bez hromu",
        icon: "/stormy.png"
    },
    "type_19": {
        description: "Mlha",
        icon: "/partial-cloudy.png"
    },
    "type_20": {
        description: "Srážky v okolí",
        icon: "/rainy.png"
    },
    "type_21": {
        description: "Déšť",
        icon: "/rainy.png"
    },
    "type_22": {
        description: "Silný déšť a sníh",
        icon: "/rainy.png"
    },
    "type_23": {
        description: "Slabý déšť a sníh",
        icon: "/rainy.png"
    },
    "type_24": {
        description: "Dešťové přeháňky",
        icon: "/rainy.png"
    },
    "type_25": {
        description: "Silný déšť",
        icon: "/rainy.png"
    },
    "type_26": {
        description: "Lehký déšť",
        icon: "/rainy.png"
    },
    "type_27": {
        description: "Klesající pokrytí oblohy",
        icon: "/partial-cloudy.png"
    },
    "type_28": {
        description: "Zvětšující se pokrytí oblohy",
        icon: "/mostly-cloudly.png"
    },
    "type_29": {
        description: "Obloha beze změny",
        icon: "/sunny.png"
    },
    "type_30": {
        description: "Kouř nebo opar",
        icon: "/partial-cloudy.png"
    },
    "type_31": {
        description: "Sníh",
        icon: "/snowfell.png"
    },
    "type_32": {
        description: "Sníh a dešťové přeháňky",
        icon: "/snowfell.png"
    },
    "type_33": {
        description: "Sněhové přeháňky",
        icon: "/snowfell.png"
    },
    "type_34": {
        description: "Silné sněžení",
        icon: "/snowfell.png"
    },
    "type_35": {
        description: "Lehký sníh",
        icon: "/snowfell.png"
    },
    "type_36": {
        description: "Vichřice",
        icon: "/heavy-wind.png"
    },
    "type_37": {
        description: "Bouřka",
        icon: "/stormy.png"
    },
    "type_38": {
        description: "Bouřka beze srážek",
        icon: "/stormy.png"
    },
    "type_39": {
        description: "Diamantový prach",
        icon: "/hailstorm.png"
    },
    "type_40": {
        description: "Kroupy",
        icon: "/hailstorm.png"
    },
    "type_41": {
        description: "Zataženo",
        icon: "/partial-cloudy.png"
    },
    "type_42": {
        description: "Částečně zataženo",
        icon: "/partial-cloudy.png"
    },
    "type_43": {
        description: "Jasno",
        icon: "/sunny.png"
    }
}

// if conditions have word "rain" (for example) in it, return "rainyday"
export function getShortWeatherDescription(conditions) {
    // split conditions into words "type_31, type_21, type_42" -> ["type_31", "type_21", "type_42"]
    const conditionsArray = conditions.split(', ');
    // find the first word that matches the weatherTypes object
    const shortWeatherDescription = conditionsArray.find(condition => weatherTypes[condition]);
    // if there is a match, return the value from the weatherTypes object
    if (shortWeatherDescription) {
        return weatherTypes[shortWeatherDescription];
    }
    // if there is no match, return the original conditions
    return conditions;
}
