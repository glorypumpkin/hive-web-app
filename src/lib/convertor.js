
// Parametros: fileContents: string

import { parse } from "date-fns";

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
    const now = new Date();
    now.setFullYear(2000 + parseInt(datum.slice(6, 8)));
    now.setMonth(parseInt(datum.slice(3, 5)) - 1);
    now.setDate(parseInt(datum.slice(0, 2)));
    now.setHours(parseInt(cas));
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);

    // const now = parse(datum, 'dd/MM/yy', new Date());
    // console.log('now', now);
    // console.log('timezone', now.getTimezoneOffset() / 60);

    // // convert to utc
    // now.setHours(parseInt(cas) - 1);

    const timestamp = now.getTime();

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