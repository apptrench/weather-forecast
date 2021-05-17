const transformResult = require('../../lib/transform-result');

describe("Test transforming of results", () => {
  it("should return empty list if input object is undefined", () => {
    expect(transformResult(undefined)).toStrictEqual([]);
  })

  it("should return empty list if 'list' property is not present", () => {
    expect(() => transformResult({})).toThrow(TypeError)
    expect(() => transformResult({ list: "someList" })).toThrow(TypeError)
  });

  it("should transform result successfully", () => {
    const sampleRequest = require('../data/open-weather-forecast.json');
    const expectedResult = require('../data/transformed-result.json');
    expect(transformResult(sampleRequest, "asc")).toStrictEqual(expectedResult);
  });

  it("should sort in descending order", () => {
    const sampleRequest = require('../data/open-weather-forecast.json');
    const expectedResult = require('../data/transformed-result.json').sort((first, second) => second - first);
    expect(transformResult(sampleRequest, "asc")).toStrictEqual(expectedResult);
  });

})