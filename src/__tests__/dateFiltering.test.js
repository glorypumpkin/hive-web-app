import { getDateInterval } from "@/lib/dateFiltering";


test('getDateInterval today', () => {
    const today = new Date();
    const result = getDateInterval('This day');
    console.log(result);
    expect(result.startDate.getMonth()).toEqual(today.getMonth());
})

test('getDateInterval 1 cvartal', () => {
    const result = getDateInterval('1 cvartal');
    expect(result.startDate.getMonth()).toEqual(0);
    expect(result.endDate.getMonth()).toEqual(2);
})

test('getDateInterval month', () => {
    const today = new Date();
    const result = getDateInterval('Month');
    console.log(result.startDate);
    expect(result.startDate.getMonth()).toEqual(today.getMonth() - 1);
})

test('getDateInterval Year', () => {
    const today = new Date();
    const result = getDateInterval('Year');
    expect(result.startDate.getFullYear()).toEqual(today.getFullYear() - 1);
})