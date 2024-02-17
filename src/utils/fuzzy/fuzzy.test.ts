import { describe, it, expect } from "vitest";
import { fuzzy } from "./index";
describe('fuzzy', () => {
    it('should return an empty array when the search term is empty', () => {
        const result = fuzzy('', ['test']);
        expect(result).toEqual([]);
    });
    it('should return an empty array when the list is empty', () => {
        const result = fuzzy('test', []);
        expect(result).toEqual([]);
    });

    it('should return an array with one item when the list contains one matching item', () => {
        const result = fuzzy('test', ['test']);
        expect(result).toEqual(['test']);
    });

    it('should return an array with multiple items when the list contains multiple matching items', () => {
        const result = fuzzy('test', ['test', 'testing', 'tester']);
        expect(result).toEqual(['test', 'tester', 'testing']);
    });

    it('should return an array with items that match the search term', () => {
        const result = fuzzy('test', ['test', 'testing', 'tester', 'toast']);
        expect(result).toEqual(['test', 'tester', 'testing']);
    });

    it('should return an empty array when the list does not contain any matching items', () => {
        const result = fuzzy('test', ['toast', 'post', 'most']);
        expect(result).toEqual([]);
    });

    it('should return an array sorted by the number of matches', () => {
        const result = fuzzy('test', ['testing', 'tester', 'test']);
        expect(result).toEqual(['test', 'tester', 'testing']);
    });
    it('should return an array sorted by the number of matches and the length of the string', () => {
        const result = fuzzy('test', ['testing', 'tester', 'test', 'test1']);
        expect(result).toEqual(['test', 'test1', 'tester', 'testing']);
    });

    it('should prioritize matches with the search term closer to the start of the string', () => {
        const result = fuzzy('test', ['a test', 'test b']);
        expect(result).toEqual(['test b', 'a test']);
    });

    it('should sort matches of equal distance by length', () => {
        const result = fuzzy('test', ['testing', 'testify', 'test b']);
        // 'test b' should come first since it's a shorter match with the term at the start
        // 'testing' and 'testify' have the term at the start and are of equal distance, so they are sorted by length
        expect(result).toEqual(['test b', 'testing', 'testify']);
    });
});