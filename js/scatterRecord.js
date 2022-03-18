
function ScatterRecord(doesScatter, ray, isSpecular, attenuation, pdf) {
    this.scatter = doesScatter;
    this.ray = ray;
    this.isSpecular = isSpecular;
    this.attenuation = attenuation;
    this.pdf = pdf;
}