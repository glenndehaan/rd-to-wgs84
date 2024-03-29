declare function defaultExport(x: number, y: number):
  { lon: number, error: null, lat: number } |
  { lon: null, error: string, lat: null };

export default defaultExport
