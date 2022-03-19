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

function reflect(v, n) {
    return v.subtract(n.multiply(v.dot(n)).multiply(2));
}

function refract(uv, n, etaiOverEtat) {
    const cosTheta = Math.min(uv.negative().dot(n), 1.0);

    const rOutPerp = n.multiply(cosTheta).add(uv).multiply(etaiOverEtat);
    const rOutParallel = n.multiply(-Math.sqrt(Math.abs(1.0 - rOutPerp.lengthSquared())));

    return rOutPerp.add(rOutParallel);
}