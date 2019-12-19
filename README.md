# RD To WGS84

A simple converter for the dutch coordinate system to the generic WGS84 GPS coordinates

[![npm](https://img.shields.io/npm/v/rd-to-wgs84.svg)](https://www.npmjs.com/package/rd-to-wgs84) ![node](https://img.shields.io/node/v/rd-to-wgs84.svg)

## Setup
Install the util:
```
npm install rd-to-wgs84
```
Require the util somewhere in your code:
```
const rdToWgs84 = require('rd-to-wgs84');
```

## Usage
```
const data = rdToWgs84(93425, 439130); // Place in Rotterdam
console.log('data', data);
```

## License

MIT
