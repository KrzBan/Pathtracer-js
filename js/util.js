function deegresToRadians(deg) {
    return deg * Math.PI / 180.0;
}

function clamp(x, min, max) {
    if (x < min) return min;
    if (x > max) return max;
    return x;
}

function randomDouble(min, max) {
    return min + (max - min) * Math.random();
}