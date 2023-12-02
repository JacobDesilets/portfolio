// ===================
//   Jacob Desilets
//   Adapted from DA250 Project 2
//   original source at https://github.com/JacobDesilets/WebGL_Metaballs/blob/main/script.js
// ===================

const NUM_PARTICLES = 10;

let myShader;

let vertex_shader, fragment_shader;

let particles = [];

let hue = 1;

function preload() {
    // Shaders adapted from https://stackoverflow.com/questions/76123710/improving-performance-p5-js-metaballs
    vertex_shader = `
    attribute vec3 aPosition;
    uniform float w;
    uniform float h;

    varying mediump vec2 vPixelPos;

    void main() {
        gl_Position = vec4(aPosition, 1.0);
        vPixelPos = vec2((gl_Position.x + 1.0) / 2.0 * w, (gl_Position.y + 1.0) / 2.0 * h);
    }
    `;

    fragment_shader = `
    precision mediump float;
    varying mediump vec2 vPixelPos;

    const int NUM_PARTICLES = ${NUM_PARTICLES};

    uniform float particle_x_coords[NUM_PARTICLES];
    uniform float particle_y_coords[NUM_PARTICLES];
    uniform float diameter;
    uniform float hue;
    uniform float steps;

    // credit to https://stackoverflow.com/questions/15095909/from-rgb-to-hsv-in-opengl-glsl
    // All components are in the range [0…1], including hue.
    vec3 hsv2rgb(vec3 c)
    {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }

    // Fragment shader is called once per pixel
    void main() {
        float sum = 0.0;
        for(int i = 0; i < NUM_PARTICLES; i++) {
            float dist_x = vPixelPos.x - particle_x_coords[i];
            float dist_y = vPixelPos.y - particle_y_coords[i];
            float dist = length(vec2(dist_x, dist_y));

            sum += (15.0 * diameter) / dist;
        }

        //sum = ceil((sum + 1.0) / steps) * steps;
        
        //vec3 hsv = vec3(hue / 360.0, sum/100.0, sum/100.0);
        vec3 hsv = vec3(hue / 360.0, .01, sum/100.0);
        vec3 rgb = hsv2rgb(hsv);

        vec4 myColor = vec4(rgb, 1.0);
        gl_FragColor = myColor;
    }
    `;

    
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL).parent("canvas");
    
    
    myShader = createShader(vertex_shader, fragment_shader);
    shader(myShader);
    myShader.setUniform('w', width);
    myShader.setUniform('h', height);
    myShader.setUniform('diameter', 200);
    myShader.setUniform('steps', 10);
    

    for (let i = 0; i < NUM_PARTICLES; i++) {
        particles[i] = new Particle(
            random(50, width - 50),
            random(50, height - 50),
            50,
            i
        );
        particles[i].applyRandomForce();
    }
}

function draw() {
    background(0);
    myShader.setUniform('hue', hue);
    myShader.setUniform('particle_x_coords', particles.map(p => p.pos.x));
    myShader.setUniform('particle_y_coords', particles.map(p => p.pos.y));

    quad(-1, -1, 1, -1, 1, 1, -1, 1);

    hue = (hue + 1) % 360;

    for (const p of particles) {
        p.update();
    }
}

class Particle {
    constructor(x, y, d, id) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.d = d;
        this.r = this.d / 2;
        this.id = id;
        this.collideTimer = 5;
    }

    applyRandomForce(force) {
        this.vel.add(
            p5.Vector.fromAngle(random(2 * Math.PI)).setMag(random(.5, 2))
        );
    }

    bounceOffWalls() {
        if (this.pos.x - this.r < 0 || this.pos.x + this.r > width) {
            this.vel.x *= -1;
        } else if (this.pos.y - this.r < 0 || this.pos.y + this.r > height) {
            this.vel.y *= -1;
        }
    }

    update(others) {
        this.pos.add(this.vel);
        this.bounceOffWalls();
    }
}