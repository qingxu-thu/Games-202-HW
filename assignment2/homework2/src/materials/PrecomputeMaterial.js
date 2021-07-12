class PrecomputeMaterial extends Material {
    constructor(vertexShader, fragmentShader) {
        super({
            'EnvLightR': { type: 'updatedInRealTime', value: null },
            'EnvLightG': { type: 'updatedInRealTime', value: null },
            'EnvLightB': { type: 'updatedInRealTime', value: null },
        }, ['aPrecomputeLT'], vertexShader, fragmentShader, null);
    }
}

async function buildPrecomputeMaterial(vertexPath, fragmentPath) {


    let vertexShader = await getShaderString(vertexPath);
    let fragmentShader = await getShaderString(fragmentPath);

    return new PrecomputeMaterial(vertexShader, fragmentShader);

}