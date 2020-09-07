import {removeBearerFromTokenHeader, doesPoemIncludeCollection} from "./utils";
import {
	poemWithOneCollection,
	poemWithThreeCollections,
	poemWithNoCollections,
	poemWithNoCollectionsField,
} from "./mockData";

describe("removeBearerFromTokenHeader", () => {
	test("it should remove bearer from x-token string", () => {
		const token =
			"Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM5LCJ1c2VybmFtZSI6IkRhd2lkIiwiZW1haWwiOiJkYXdpZGRhaGxAZ21haWwuY29tIiwiYWRtaW4iOjEsImlhdCI6MTU4NjcxODMwMSwiZXhwIjoxNTg2NzE4MzExfQ.kiYK7xP4rcctsv2IeSf0rAznY0D3u0sEs4zLg-IZuNZjJQ-Yfdk21zBdW2ealriwW_vrw4I8OirqAYRf5jSjXhE-jZsVuadO5UO4YRywyVUvNPrT-vZheo-hryBqFF3UdGNXVgxF3HrbtNLq9sQFV65h8_k6TGU-DsSu-qpoGbBBwocqhmgV2J6wL3qKHOiK6QYOOPq0flnNwIhoxRmRG4yZewXSLQ4Hxm3NosQkp9gFaxxpNrezWdGTtwYd6R01Zi1J1DRrlH9WOgBmvhfy5r5HLfIeo7p0WsjXQsz9YAUF78sbwJZG8gC251DGxk2zB3aBY3tntfwH6eCIZ8_yYTbGVElfZJ_dMGBF8aFjjW1wzeZooWW6lvYVLkoMd4ELJbSdkBYa7CbAIarCm2-koY1ulZFhfgk7XHjo4qhFSkigNVGHzIYx5uFvUa-xjD3pJQ_tFTrtVHNt2rOwptI4ivIVL9IK-QgsXyc-KwDSzdrH0GPASepO6kHczhiXvwHikxsq0JtuCzuEdpsrjw66hcHpHAzwG8qrRp3LZpTjNHfio5WyunaoWBqWwr2YKafRYXDyDUsNEXrGyQ8lv5nXMzCf1wGvjEfsO88-q7Rc8jWy7ePviSx1ewcFCjx6lWuuLMpzQaTsMutxqA6QJ_1XJynuHhbiceo2HHHSRTSnneo";
		const processedToken = removeBearerFromTokenHeader(token);
		expect(processedToken).not.toMatch(/Bearer|\s/gi);
	});
	test("it should return undefined if token is undefined", () => {
		const token = undefined;
		const processedToken = removeBearerFromTokenHeader(token);
		expect(processedToken).toEqual(undefined);
	});
});

describe("doesPoemIncludeCollection", () => {
	describe("happy path", () => {
		it("should return true if poem with one collection contains the input collection", () => {
			const mockPoem = poemWithOneCollection;
			const collectionId = 55;
			expect(doesPoemIncludeCollection(mockPoem, collectionId)).toBe(true);
		});
		it("should return false if poem with one collection does not contain the input collection", () => {
			const mockPoem = poemWithOneCollection;
			const collectionId = 666;
			expect(doesPoemIncludeCollection(mockPoem, collectionId)).toBe(false);
		});
		it("should return true if poem with more than one collection contains the input collection", () => {
			const mockPoem = poemWithThreeCollections;
			const collectionId = 55;
			expect(doesPoemIncludeCollection(mockPoem, collectionId)).toBe(true);
		});
		it("should return false if poem with more than one collection does not contain the input collection", () => {
			const mockPoem = poemWithThreeCollections;
			const collectionId = 666;
			expect(doesPoemIncludeCollection(mockPoem, collectionId)).toBe(false);
		});
		it("should return false if poem with no collections is passed", () => {
			const mockPoem = poemWithNoCollections;
			const collectionId = 55;
			expect(doesPoemIncludeCollection(mockPoem, collectionId)).toBe(false);
		});
	});
	describe("sad path", () => {
		it("should throw an error if undefined is passed as poem", () => {
			const mockPoem = undefined;
			const collectionId = 55;
			//@ts-ignore
			expect(() => doesPoemIncludeCollection(mockPoem, collectionId)).toThrow();
		});
		it("should throw an error if undefined is passed as collectionId", () => {
			const mockPoem = poemWithOneCollection;
			const collectionId = undefined;
			//@ts-ignore
			expect(() => doesPoemIncludeCollection(mockPoem, collectionId)).toThrow();
		});
		it("should throw an error if the poem does not contain a collection field", () => {
			const mockPoem = poemWithNoCollectionsField;
			const collectionId = undefined;
			//@ts-ignore
			expect(() => doesPoemIncludeCollection(mockPoem, collectionId)).toThrowError(
				"poem doesn't contain collection field"
			);
		});
	});
});
