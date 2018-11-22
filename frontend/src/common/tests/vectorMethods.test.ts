import {
  createVector,
  inverseVector,
  isSameVector,
  translateVector
} from "../vectorMethods";

describe("Testing create Vector", () => {
  it("should return a vector with the supplied values", () => {
    expect(createVector(1, 2)).toEqual({ x: 1, y: 2 });
  });
});

describe("Testing translate vector method", () => {
  it("should translate a vector by another vector", () => {
    expect(translateVector({ x: 1, y: 2 }, { x: 5, y: -4 })).toEqual({
      x: 6,
      y: -2
    });
  });
});

describe("Testing inverse vector method", () => {
  it("should inverse a vector", () => {
    expect(inverseVector({ x: 1, y: 2 })).toEqual({ x: -1, y: -2 });
  });
});

describe("Testing is same vector method", () => {
  it("should return true if vectors are equal", () => {
    expect(isSameVector({ x: 1, y: 2 }, { x: 1, y: 2 })).toBe(true);
  });
  it("should return false if vectors are not equal", () => {
    expect(isSameVector({ x: 1, y: 2 }, { x: 1, y: 4 })).toBe(false);
  });
});
