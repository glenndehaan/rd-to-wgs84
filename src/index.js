/**
 * Converts the Dutch coordinate system to standard WGS84 (GPS) coordinates
 *
 * @param x
 * @param y
 * @return {{lon: *, error: null, lat: *}}
 */
const convert = (x, y) => {
    const x0 = 155000.000;
    const y0 = 463000.000;

    const f0 = 52.156160556;
    const l0 = 5.387638889;

    const a01 = 3236.0331637;
    const b10 = 5261.3028966;
    const a20 = -32.5915821;
    const b11 = 105.9780241;
    const a02 = -0.2472814;
    const b12 = 2.4576469;
    const a21 = -0.8501341;
    const b30 = -0.8192156;
    const a03 = -0.0655238;
    const b31 = -0.0560092;
    const a22 = -0.0171137;
    const b13 = 0.0560089;
    const a40 = 0.0052771;
    const b32 = -0.0025614;
    const a23 = -0.0003859;
    const b14 = 0.0012770;
    const a41 = 0.0003314;
    const b50 = 0.0002574;
    const a04 = 0.0000371;
    const b33 = -0.0000973;
    const a42 = 0.0000143;
    const b51 = 0.0000293;
    const a24 = -0.0000090;
    const b15 = 0.0000291;

    const dx = (x - x0) * Math.pow(10, -5);
    const dy = (y - y0) * Math.pow(10, -5);

    let df = a01 * dy + a20 * Math.pow(dx, 2) + a02 * Math.pow(dy, 2) + a21 * Math.pow(dx, 2) * dy + a03 * Math.pow(dy, 3);
    df += a40 * Math.pow(dx, 4) + a22 * Math.pow(dx, 2) * Math.pow(dy, 2) + a04 * Math.pow(dy, 4) + a41 * Math.pow(dx, 4) * dy;
    df += a23 * Math.pow(dx, 2) * Math.pow(dy, 3) + a42 * Math.pow(dx, 4) * Math.pow(dy, 2) + a24 * Math.pow(dx, 2) * Math.pow(dy, 4);

    const f = f0 + df / 3600;

    let dl = b10 * dx + b11 * dx * dy + b30 * Math.pow(dx, 3) + b12 * dx * Math.pow(dy, 2) + b31 * Math.pow(dx, 3) * dy;
    dl += b13 * dx * Math.pow(dy, 3) + b50 * Math.pow(dx, 5) + b32 * Math.pow(dx, 3) * Math.pow(dy, 2) + b14 * dx * Math.pow(dy, 4);
    dl += b51 * Math.pow(dx, 5) * dy + b33 * Math.pow(dx, 3) * Math.pow(dy, 3) + b15 * dx * Math.pow(dy, 5);

    const l = l0 + dl / 3600;

    const fWgs = f + (-96.862 - 11.714 * (f - 52) - 0.125 * (l - 5)) / 100000;
    const lWgs = l + (-37.902 + 0.329 * (f - 52) - 14.667 * (l - 5)) / 100000;

    return {
        error: null,
        lat: fWgs,
        lon: lWgs
    }
};

/**
 * Exports the converter module
 *
 * @param x
 * @param y
 * @return {{lon: *, error: null, lat: *}|{lon: null, error: string, lat: null}}
 */
module.exports = (x, y) => {
    x = parseFloat(x);
    y = parseFloat(y);
    if (x < 1000) x *= 1000;
    if (y < 1000) y *= 1000;

    if (x < 0 || x > 290000) {
        return {
            error: new Error("Value 'X' must be between 0 and 290(000)"),
            lat: null,
            lon: null
        }
    }

    if (y < 290000 || y > 630000) {
        return {
            error: new Error("Value 'Y' must be between 290(000) and 630(000)"),
            lat: null,
            lon: null
        }
    }

    return convert(x, y);
};
