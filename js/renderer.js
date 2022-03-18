
const backgroundGlobal = new Vector(0.70, 0.8, 1.0);
const maxDepthGlobal = 30;

function renderPass(width, height) {

    const imageData = [];

    for (let j = 0; j < height; ++j) {
        for (let i = 0; i < width; ++i) {

            const u = (i + Math.random()) / (width - 1);
            const v = (j + Math.random()) / (height - 1);

            const ray = mainCamera.getRay(u, v);
            const color = rayColor(ray, backgroundGlobal, sceneProps, lights, maxDepthGlobal);

            imageData.push(new Vector(color.x, color.y, color.z));
        }
    }

    return imageData;
}

function rayColor(ray, background, world, lights, depth) {

    if (depth <= 0) return new Vector(0, 0, 0);

    let lastHitRec = null;
    let closestHit = Infinity;
    for (const prop of world) {
        const hitRec = prop.hit(ray, 0.001, closestHit);

        if (hitRec.hit) {
            lastHitRec = hitRec;
            closestHit = hitRec.t;
        }
    }
    if (lastHitRec === null) return background;

    const emitted = lastHitRec.material.emitted(ray, lastHitRec,
        lastHitRec.u, lastHitRec.v, lastHitRec.p);

    const scatterRec = lastHitRec.material.scatter(ray, lastHitRec);
    if (scatterRec.scatter === false) {
        return emitted;
    }

    const nextCol = rayColor(scatterRec.ray, background, world, lights, depth - 1);

    return nextCol.multiply(scatterRec.attenuation);
}

