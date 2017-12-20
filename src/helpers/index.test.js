import { getUniqueID, getRandomColor } from './index';

describe('helpers.index.js getUniqueID function tested: ', () => {
    test('getUniqueID function should be a function', () => {
        expect(typeof getUniqueID).toBe('function');
    });

    test('getUniqueID function should be a string', () => {
        expect(typeof getUniqueID()).toBe('string');
    });

    test('getUniqueID function call result should have length of 15 elements', () => {
        expect(getUniqueID().length).toEqual(15);
    });

    test('getUniqueID function argument should be a number', () => {
        function getFullNameWithError () {
            getUniqueID(null, 1);
        }
        expect(getFullNameWithError).toThrowError(
            'The function argument should be a number!'
        );
    });
});

describe('helpers/ index.js getUniqueID getRandomColor tested: ', () => {
    test('getRandomColor function should be a function', () => {
        expect(typeof getRandomColor).toBe('function');
    });

    test('getRandomColor function should be a string', () => {
        expect(typeof getRandomColor()).toBe('string');
    });

    test('getRandomColor function call result should have length = 7', () => {
        expect(getRandomColor().length).toEqual(7);
    });

    test('getRandomColor function call result should started from # symbol', () => {
        expect(getRandomColor().charAt(0)).toBe('#');
    });
});
