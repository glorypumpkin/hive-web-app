import { convertor, parseLine } from '../lib/convertor';

test('positive', () => {
    const input = `STAN/CIS  DATUM CAS   [kg] ROZDIL TEPL
1221601 15/10/23 18   43.6   0.0   4.9
1221601 15/10/23 12   43.6   0.0  10.4
`;
    expect(convertor(input)).toEqual([
        {
            stan: '1221601',
            timestamp: 1697385600000,
            kg: 43.6,
            rozdil: 0,
            tepl: 4.9
        },
        {
            stan: '1221601',
            timestamp: 1697364000000,
            kg: 43.6,
            rozdil: 0,
            tepl: 10.4
        }
    ]);
});

test('negativeEmptyLine', () => {
    const input = `STAN/CIS  DATUM CAS   [kg] ROZDIL TEPL
1221601 15/10/23 18   43.6   0.0   -4.9
1221601 15/10/23 12   43.6   0.0  10.4
`;
    expect(convertor(input)).toEqual([
        {
            stan: '1221601',
            timestamp: 1697385600000,
            kg: 43.6,
            rozdil: 0,
            tepl: -4.9
        },
        {
            stan: '1221601',
            timestamp: 1697364000000,
            kg: 43.6,
            rozdil: 0,
            tepl: 10.4
        }
    ]);
});

test('parseLine', () => {
    const input = `1221601 15/10/23 18   43.6   0.0   4.9`;
    const parsed = parseLine(input);
    expect(parsed.kg).toBe(43.6);
    expect(parsed.rozdil).toBe(0);
    expect(parsed.tepl).toBe(4.9);

    const date = new Date(parsed.timestamp);
    expect(date.getFullYear()).toBe(2023);
    expect(date.getMonth()).toBe(9);
    expect(date.getDate()).toBe(15);
    expect(date.getHours()).toBe(18);
})