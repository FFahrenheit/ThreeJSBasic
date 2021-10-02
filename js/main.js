// Scene + Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('#111111')
document.body.appendChild(renderer.domElement);
camera.position.z = 5;

//Inside cube
let sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 24, 12),
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
for(let i = 0; i < n; i++){
    let color = Math.random()
    toroids.push(new THREE.Mesh(
        new THREE.TorusGeometry(3, 0.05, 20, 150),
        new THREE.MeshPhongMaterial({
            color: 0xFFFFFF
        })
    ));

    scene.add(toroids[i]);
    // toroids[i].position.set(0, 0, i / n * 3 );
    // toroids[i].rotation.y = (Math.PI * 2)/(n - i);
    // toroids[i].rotation.x = (Math.PI)/(n / (i+1));
    // toroids[i].rotation.y = (Math.PI)/(n / (i+1));
}

//Outside cube
geometry = new THREE.BoxGeometry(10,10,10, 10, 15, 20);
material = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF, wireframe: true, transparent: true
});
let wireframeCube = new THREE.Mesh(geometry, material);
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
        // t.rotation.x += 0.005 * (i+1);
        t.rotation.y += 0.02 * ((i/10)+1);
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