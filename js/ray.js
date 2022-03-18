function Ray(originVec, dirVec) {
    this.origin = originVec ?? new Vector();
    this.direction = dirVec ?? new Vector();
}

Ray.prototype = {
    at: function (t) {
        return this.origin.add(this.direction.multiply(t));
    }
}