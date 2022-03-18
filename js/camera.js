class Camera {

    constructor(
        lookFromVec,
        lookAtVec,
        upVec,
        vFov,
        aspectRatio,
        aperture,
        focusDist
    ) {
        const theta = deegresToRadians(vFov);
        const h = Math.tan(theta / 2);
        const viewportHeight = 2.0 * h;
        const viewportWidth = aspectRatio * viewportHeight;

        this.w = lookFromVec.subtract(lookAtVec).unit();
        this.u = upVec.cross(this.w).unit();
        this.v = this.w.cross(this.u);

        this.origin = lookFromVec;
        this.horizontal = this.u.multiply(focusDist * viewportWidth);
        this.vertical = this.v.multiply(focusDist * viewportHeight);

        this.lowerLeftCorner =
            this.origin.subtract(this.horizontal.divide(2))
                .subtract(this.vertical.divide(2))
                .subtract(this.w.multiply(focusDist));

        this.lensRadius = aperture / 2;
    }

    getRay(s, t) {

        const rd = Vector.randomInUnitDisk().multiply(this.lensRadius);
        const offset = this.u.multiply(rd.x).add(this.v.multiply(rd.y));

        return new Ray(this.origin.add(offset),
            this.lowerLeftCorner.add(this.horizontal.multiply(s))
                .add(this.vertical.multiply(t))
                .subtract(this.origin).subtract(offset)
        )
    }

}