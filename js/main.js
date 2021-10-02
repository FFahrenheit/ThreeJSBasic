let clicked = false;
// Scene + Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('#111111')
document.body.appendChild(renderer.domElement);
camera.position.z = 5;

const listener = new THREE.AudioListener();
camera.add( listener );
// create a global audio source
const sound = new THREE.Audio(listener);

renderer.domElement.addEventListener('click', () => {
    if(!clicked){
        console.log('Audio');
        // load a sound and set it as the Audio object's buffer
        const audioLoader = new THREE.AudioLoader();
        audioLoader.load( 'assets/audio.mp3', ( buffer ) => {
            sound.autoplay = true;
            sound.setBuffer(buffer);
            sound.setLoop(true);
            sound.setVolume(0.4);
            sound.play();
        });   
        clicked = true;
    }
}, true)

//Inside spphere
let sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1.3, 24, 12),
    new THREE.MeshNormalMaterial({ 
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
        flatShading: true,
        normalMapType: THREE.ObjectSpaceNormalMap,
        normalScale: new THREE.Vector2(0.1, 0.8),
    })
);
scene.add(sphere);

sphere.add( new THREE.LineSegments(
    new THREE.EdgesGeometry( sphere.geometry ),
    new THREE.LineBasicMaterial({
            color: 0x7A7A7A,
            linewidth: 0.5,
            linecap: 'round',
            linejoin: 'round'
        }
    )
));

let toroids = [];

let n = 10;
let colors = [0, 0.2, 0.4, 0.6, 0.8, 1, 0.8, 0.6, 0.4, 0.2];
for(let i = 0; i < n; i++){
    let c = colors[i];
    toroids.push(new THREE.Mesh(
        new THREE.TorusGeometry(4.5, 0.08, 20, 150),
        new THREE.MeshPhongMaterial({
            color: new THREE.Color(c,c,c)
        })
    ));

    scene.add(toroids[i]);
    // toroids[i].position.set(0, 0, i / n * 3 );
    // toroids[i].rotation.y = (Math.PI * 2)/(n - i);
    // toroids[i].rotation.x = (Math.PI)/(n / (i+1));
    toroids[i].rotation.y = (Math.PI)/(n / (i+1));
}

let wireframeCube = new THREE.Mesh(
    // new THREE.BoxGeometry(10,10,10, 10, 15, 20),
    new THREE.SphereGeometry(5, 25, 40),

    new THREE.MeshBasicMaterial({
        color: 0xFFFFFF, 
        wireframe: true, 
        transparent: true
    })
);
scene.add(wireframeCube);

// ambient light
let ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

// point light
let pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(25, 50, 25);
scene.add(pointLight);

const animate = function () {
    requestAnimationFrame(animate);

    sphere.rotation.x += 0.025;
    sphere.rotation.y += 0.025;
    toroids.forEach( (t,i) => {
        t.rotation.y += 0.02;
        t.rotation.x += 0.02;
    });
    wireframeCube.rotation.x -= 0.01;
    wireframeCube.rotation.y -= 0.01;

    renderer.render(scene, camera);
};

animate();

//Resizer!
window.addEventListener('resize', () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});