
function HitRecord(isHit, t, p, material) {
    this.hit = isHit;
    this.t = t;
    this.p = p;
    this.material = material;

    this.frontFace = false;
    this.normal = p;
}

HitRecord.prototype = {
    setFaceNormal: function (ray, outwardNormal) {
        this.frontFace = ray.direction.dot(outwardNormal) < 0;
        this.normal = this.frontFace ? outwardNormal : outwardNormal.negative();
    }
}