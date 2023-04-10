const vertex = new Float32Array([
  // float3 position, float3 normal, float2 uv
  1, 1, 1, 1, 0, 0, 0, 1, 1, 1, -1, 1, 0, 0, 1, 1, 1, -1, 1, 1, 0, 0, 0, 0, 1, -1, -1, 1, 0, 0, 1, 0, -1, 1, -1, -1, 0,
  0, 0, 1, -1, 1, 1, -1, 0, 0, 1, 1, -1, -1, -1, -1, 0, 0, 0, 0, -1, -1, 1, -1, 0, 0, 1, 0, -1, 1, -1, 0, 1, 0, 0, 1, 1,
  1, -1, 0, 1, 0, 1, 1, -1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, -1, -1, 1, 0, -1, 0, 0, 1, 1, -1, 1, 0, -1, 0,
  1, 1, -1, -1, -1, 0, -1, 0, 0, 0, 1, -1, -1, 0, -1, 0, 1, 0, -1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, -1, -1,
  1, 0, 0, 1, 0, 0, 1, -1, 1, 0, 0, 1, 1, 0, 1, 1, -1, 0, 0, -1, 0, 1, -1, 1, -1, 0, 0, -1, 1, 1, 1, -1, -1, 0, 0, -1,
  0, 0, -1, -1, -1, 0, 0, -1, 1, 0,
]);

const index = new Uint16Array(
  [
    0, 2, 1, 2, 3, 1, 4, 6, 5, 6, 7, 5, 8, 10, 9, 10, 11, 9, 12, 14, 13, 14, 15, 13, 16, 18, 17, 18, 19, 17, 20, 22, 21,
    22, 23, 21,
  ].reverse(),
);
const vertexCount = 24;
const indexCount = 36;

export { vertex, index, vertexCount, indexCount };
