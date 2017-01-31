var renderer = PIXI.autoDetectRenderer(800, 600);
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();


var geometry = new PIXI.mesh.Geometry()
.addAttribute('aVertexPosition',  // the attribute name
              [-100, -100,   // x, y
                100, -100,   // x, y
                100 , 100], // x, y
               2)           // the size of the attribute

.addAttribute('aUvs',  // the attribute name
              [0, 0,  // u, v
               1, 0,  // u, v
               1, 1], // u, v
               2)        // the size of the attribute

var program = new PIXI.Program.from(`

    precision mediump float;

    attribute vec2 aVertexPosition;
    attribute vec2 aUvs;

    uniform mat3 translationMatrix;
    uniform mat3 projectionMatrix;

    varying vec2 vUvs;

    void main() {

        vUvs = aUvs;
        gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    }`,

    `precision mediump float;

    varying vec2 vUvs;

    uniform sampler2D uSamplerTexture;

    void main() {

        gl_FragColor = texture2D(uSamplerTexture, vUvs);
    }

`)

var triangle = new PIXI.mesh.RawMesh(geometry, new PIXI.Shader(program, {
  uSamplerTexture:PIXI.Texture.from('required/assets/SceneRotate.jpg')
}));

var triangle2 = new PIXI.mesh.RawMesh(geometry, new PIXI.Shader(program, {
  uSamplerTexture:PIXI.Texture.from('required/assets/BGrotate.jpg')
}));

var triangle3 = new PIXI.mesh.RawMesh(geometry, new PIXI.Shader(program, {
  uSamplerTexture:PIXI.Texture.from('required/assets/displacement_BG.jpg')
}));

triangle.position.set(400, 300);
triangle.scale.set(2);

triangle2.position.set(200, 100);

triangle3.position.set(500, 400);
triangle3.scale.set(3);

stage.addChild(triangle3, triangle2, triangle);

// start the animation..
requestAnimationFrame(animate);

function animate()
{
    requestAnimationFrame(animate);
    renderer.render(stage);
    triangle.rotation += 0.01;
    triangle2.rotation -= 0.01;
    triangle3.rotation -= 0.005;
}
