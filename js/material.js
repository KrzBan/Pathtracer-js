
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