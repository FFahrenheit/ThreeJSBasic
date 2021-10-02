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
let  geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshStandardMaterial({ color: 0x4d2674, flatSshading: true, metalness: 0, roughness: 1 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//Outside cube
geometry = new THREE.BoxGeometry(10,10,10);
material = new THREE.MeshBasicMaterial({
    color: "#dadada", wireframe: true, transparent: true
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

    cube.rotation.x += 0.04;
    cube.rotation.y += 0.04;
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