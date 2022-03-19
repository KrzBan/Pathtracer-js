
class Material {

    emitted(ray, hitRecord, u, v, p) {
        return new Vector(0, 0, 0);
    }

    scatter(rayIn, hitRecord) {
        return new ScatterRecord(false);
    }

    scatteringPdf(rayIn, hitRecord, rayScattered) {
        return 0;
    }
}

class Lambertian extends Material {

    constructor(colorVec) {
        super();
        this.albedo = colorVec;
    }

    scatter(rayIn, hitRecord) {
        const scatterRec = new ScatterRecord(true);

        let scatterDir = hitRecord.normal.add(Vector.randomUnitVector());
        if (scatterDir.length() < 1e-8) {
            scatterDir = hitRecord.normal;
        }

        scatterRec.ray = new Ray(hitRecord.p, scatterDir);
        scatterRec.isSpecular = false;
        scatterRec.attenuation = this.albedo;
        scatterRec.pdf = new CosinePdf(hitRecord.normal);

        return scatterRec;
    }

    scatteringPdf(rayIn, hitRecord, rayScattered) {
        const cosine = hitRecord.normal.dot(rayScattered.ray.unit());

        return cosine < 0 ? 0 : cosine / Math.PI;
    }
}

class Metal extends Material {

    constructor(colorVec, f) {
        super();
        this.albedo = colorVec;
        this.fuzz = f < 1 ? f : 1;
    }

    scatter(rayIn, hitRecord) {
        const reflected = reflect(rayIn.direction.unit(), hitRecord.normal);
        const scattered = new Ray(hitRecord.p, Vector.randomInUnitSphere().multiply(this.fuzz).add(reflected));

        const scatterRec = new ScatterRecord(true);
        scatterRec.ray = scattered;
        scatterRec.isSpecular = false;
        scatterRec.attenuation = this.albedo;
        scatterRec.pdf = new CosinePdf(hitRecord.normal);

        scatterRec.scatter = scattered.direction.dot(hitRecord.normal) > 0;

        return scatterRec;
    }

    scatteringPdf(rayIn, hitRecord, rayScattered) {
        const cosine = hitRecord.normal.dot(rayScattered.ray.unit());

        return cosine < 0 ? 0 : cosine / Math.PI;
    }
}

class Dielectric extends Material {

    constructor(indexOfRefraction) {
        super();
        this.ir = indexOfRefraction;
    }

    scatter(rayIn, hitRecord) {

        const attenuation = new Vector(1.0, 1.0, 1.0)
        const refRatio = hitRecord.frontFace ? (1.0 / this.ir) : this.ir;

        const unitDir = rayIn.direction.unit();
        const cosTheta = Math.min(unitDir.negative().dot(hitRecord.normal), 1.0);
        const sinTheta = Math.sqrt(1.0 - cosTheta * cosTheta);

        const cannotRefract = refRatio * sinTheta > 1.0;

        let direction;
        if (cannotRefract || Dielectric.reflectance(cosTheta, refRatio) > Math.random()) {
            direction = reflect(unitDir, hitRecord.normal);
        }
        else {
            direction = refract(unitDir, hitRecord.normal, refRatio);
        }

        const scattered = new Ray(hitRecord.p, direction);

        const scatterRec = new ScatterRecord(true);
        scatterRec.ray = scattered;
        scatterRec.isSpecular = false;
        scatterRec.attenuation = attenuation;
        scatterRec.pdf = new CosinePdf(hitRecord.normal);

        return scatterRec;
    }

    static reflectance(cosine, refIdx) {
        // Schlick's approximation
        let r0 = (1 - refIdx) / (1 + refIdx);
        r0 = r0 * r0;

        return r0 + (1 - r0) * (1 - cosine) ** 5;
    }
}