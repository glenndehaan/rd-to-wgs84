/**
 * Import module
 */
const rdToWgs84 = require('../src');

/**
 * Convert dutch coordinates
 */
const test = rdToWgs84(93425, 439130);
console.log('test', test);
