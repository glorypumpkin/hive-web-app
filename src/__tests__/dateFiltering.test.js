import { getDateInterval } from "@/lib/dateFiltering";


test('getDateInterval today', () => {
    const today = new Date();
    const result = getDateInterval('This day');
    console.log(result);
    expect(result.from.getMonth()).toEqual(today.getMonth());
})

test('getDateInterval 1 kvartal', () => {
    const result = getDateInterval('1 kvartal');
    expect(result.from.getMonth()).toEqual(0);
    expect(result.to.getMonth()).toEqual(3);
})

test('getDateInterval month', () => {
    const today = new Date();
    const result = getDateInterval('Month');
    console.log(result.from);
    expect(result.from.getMonth()).toEqual(today.getMonth() - 1);
})

test('getDateInterval Year', () => {
    const today = new Date();
    const result = getDateInterval('Year');
    expect(result.from.getFullYear()).toEqual(today.getFullYear() - 1);
})