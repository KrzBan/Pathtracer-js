
class Sphere {

    constructor(centerVec, radius, material) {
        this.center = centerVec;
        this.radius = radius;
        this.material = material;
    }

    hit(ray, tMin, tMax) {
        const oc = ray.origin.subtract(this.center);
        const a = ray.direction.lengthSquared();
        const halfB = oc.dot(ray.direction);
        const c = oc.lengthSquared() - this.radius * this.radius;

        const discriminant = halfB * halfB - a * c;
        if (discriminant < 0) return new HitRecord(false);

        const sqrtd = Math.sqrt(discriminant);

        let root = (-halfB - sqrtd) / a;
        if (root < tMin || tMax < root) {
            root = (-halfB + sqrtd) / a;
            if (root < tMin || tMax < root) {
                return new HitRecord(false);
            }
        }

        const p = ray.at(root);
        const outwardNormal = p.subtract(this.center).divide(this.radius);

        const hitRec = new HitRecord(true, root, p, this.material);
        hitRec.setFaceNormal(ray, outwardNormal);

        return hitRec;
    }
}