import { addHours } from "date-fns";

// Parametros: fileContents: string


// Retorno: Array<{}>
export function convertor(fileContents) {
    const lines = fileContents.split('\n');
    const data = [];
    // skip header
    for (let i = (lines.length - 2); i > 0; i--) {
        const line = lines[i];
        const parsed = parseLine(line);
        data.push(parsed);
    }
    return data;
}

export function parseLine(line) {
    const [stan, datum, cas, kg, rozdil, tepl] = line.split(/\s+/);

    // datum: 15/10/23
    // cas: 18 (h)
    // datum: "2019-01-01T00:00:00.000Z"

    const current = new Date(2000 + parseInt(datum.slice(6, 8)), parseInt(datum.slice(3, 5)) - 1, parseInt(datum.slice(0, 2)), parseInt(cas), 0, 0, 0);

    const localDateObject = addHours(current, -current.getTimezoneOffset() / 60);
    const timestamp = localDateObject.getTime();

    const rozdilFloat = parseFloat(rozdil);
    const kgFloat = parseFloat(kg);
    const teplFloat = parseFloat(tepl);

    return {
        datum,
        stan,
        timestamp,
        weight: kgFloat,
        rozdil: rozdilFloat,
        temperature: teplFloat
    };
}
