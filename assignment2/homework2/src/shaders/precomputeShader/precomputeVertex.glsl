attribute vec3 aVertexPosition;
attribute mat3 aPrecomputeLT;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

uniform mat3 EnvLightR;
uniform mat3 EnvLightG;
uniform mat3 EnvLightB;


varying highp vec3 vColor;


void main(void) {
  gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix *
                vec4(aVertexPosition, 1.0);
  float x=0.0,y=0.0,z=0.0;
  for (int i = 0; i < 3; i++)
    for (int j = 0; j < 3; j++)
    {x += EnvLightR[i][j]*aPrecomputeLT[i][j];
    y += EnvLightG[i][j]*aPrecomputeLT[i][j];
    z += EnvLightB[i][j]*aPrecomputeLT[i][j];
    }
  vColor = vec3(x,y,z);
}