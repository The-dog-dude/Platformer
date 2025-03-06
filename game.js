// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a simple platform (a floor)
const geometry = new THREE.BoxGeometry(10, 1, 10); // Width, Height, Depth
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const platform = new THREE.Mesh(geometry, material);
scene.add(platform);

// Create a simple player (a cube)
const playerGeometry = new THREE.BoxGeometry(1, 1, 1); // Width, Height, Depth
const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.position.y = 1; // Lift player above the platform
scene.add(player);

// Set camera position
camera.position.z = 5;

// Movement variables
let velocity = new THREE.Vector3();
const speed = 0.1;
const jumpStrength = 0.2;
let isJumping = false;

// Keyboard input
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Game Loop
function animate() {
    requestAnimationFrame(animate);
    
    // Movement controls
    if (keys['w']) {
        player.position.z -= speed;
    }
    if (keys['s']) {
        player.position.z += speed;
    }
    if (keys['a']) {
        player.position.x -= speed;
    }
    if (keys['d']) {
        player.position.x += speed;
    }
    if (keys[' ']) { // Space for jumping
        if (!isJumping) {
            velocity.y = jumpStrength;
            isJumping = true;
        }
    }

    // Apply gravity
    velocity.y -= 0.01; // Simple gravity effect
    player.position.y += velocity.y;

    // Prevent player from falling through the floor
    if (player.position.y <= 1) {
        player.position.y = 1;
        isJumping = false;
        velocity.y = 0;
    }

    renderer.render(scene, camera);
}

// Resize canvas on window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Start game loop
animate();

