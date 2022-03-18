const aspectRatio = 1280 / 720;

const mainCamera = new Camera(
    new Vector(0, -10, 50),
    new Vector(0, -10, 0),
    new Vector(0, 1, 0),
    40.0,
    aspectRatio,
    0.0,
    10.0
);

const redLamb = new Lambertian(new Vector(0.9, 0.1, 0.15));
const blueLamb = new Lambertian(new Vector(0.05, 0.15, 0.85));
const greenLamb = new Lambertian(new Vector(0.05, 0.85, 0.05));

//flipped vertically :///
const sceneProps = [
    new Sphere(new Vector(5, -10, -10), 10, redLamb),
    new Sphere(new Vector(-5, -4, 0), 4, blueLamb),
    new Sphere(new Vector(0, 1000, 0), 1000, greenLamb)
];

const lights = [
    new Sphere(new Vector(190, 90, 190), 90, new Material())
];