import * as THREE from  'three';
import {initRenderer,
        SecondaryBox, 
        onWindowResize
        } from "../libs/util/util.js";
import KeyboardState from '../libs/util/KeyboardState.js';
import {CSG} from  "../libs/other/CSGMesh.js";
import {GLTFLoader} from '../build/jsm/loaders/GLTFLoader.js';
import Grid from '../libs/util/grid.js';
import {FontLoader} from './assets/FontLoader.js';
import {TextGeometry} from './assets/TextGeometry.js';

let scene, renderer, light, camera, keyboard;
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // View function in util/utils

//light = initDefaultSpotlight(scene, new THREE.Vector3(25.0, 25.0, 25.0)); // Use default light    
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );
const oldPosition = new THREE.Vector3();
let forward = new THREE.Vector3(1, 1, 1);

let redKey = false;
let yellowKey = false;
let blueKey = false;

const portaYellow = new THREE.PlaneGeometry( 8, 12 );
const matportaYellow = new THREE.MeshPhongMaterial( {color: 0xF1C40F, side: THREE.DoubleSide} );
const porta1 = new THREE.Mesh(portaYellow, matportaYellow);
porta1.rotateY(Math.PI / 2);
porta1.position.set(-56,-5,0);
scene.add(porta1);

const portaRed = new THREE.PlaneGeometry( 8, 12 );
const matportaRed = new THREE.MeshPhongMaterial( {color: 0xC0392B , side: THREE.DoubleSide} );
const porta2 = new THREE.Mesh(portaRed, matportaRed);
porta2.rotateY(Math.PI / 2);
porta2.position.set(77.25,-15,0.75);
scene.add(porta2);

const portaBlue = new THREE.PlaneGeometry( 8, 12 );
const matportaBlue = new THREE.MeshPhongMaterial( {color: 0x154360 , side: THREE.DoubleSide} );
const porta3 = new THREE.Mesh(portaBlue, matportaBlue);
porta3.position.set(1,16,55.75);
scene.add(porta3);

const portaCinza1 = new THREE.PlaneGeometry( 5, 12 );
const matportaC1 = new THREE.MeshPhongMaterial( {color: 0x707B7C  , side: THREE.DoubleSide} );
const portaC1 = new THREE.Mesh(portaCinza1, matportaC1);
portaC1.rotateY(Math.PI / 2);
portaC1.position.set(145.85,-15,-0.5);
scene.add(portaC1);

const portaCinza2 = new THREE.PlaneGeometry( 5, 12 );
const matportaC2 = new THREE.MeshPhongMaterial( {color: 0x707B7C  , side: THREE.DoubleSide} );
const portaC2 = new THREE.Mesh(portaCinza2, matportaC2);
portaC2.position.set(-0.25,14,125);
scene.add(portaC2);

const rampa1 = new THREE.PlaneGeometry( 5, 10 );
const rampa2 = new THREE.PlaneGeometry( 5, 5 );
const matrampa1 = new THREE.MeshBasicMaterial( {color: 0x581845, side: THREE.DoubleSide} );
const plane1 = new THREE.Mesh( rampa1, matrampa1 );
const plane2 = new THREE.Mesh( rampa2, matrampa1 );
plane1.rotateY(Math.PI / 2);
plane1.rotateX(Math.PI / -3.5);
plane1.position.set(-65.6,-7.2,5);
plane2.position.set(-72,-4.1,5);
plane2.rotateX(Math.PI / 2);
scene.add( plane1, plane2 );

let text = 'GAME';
let text2 = 'OVER';
let textMesh, textMesh2; 

const loader = new FontLoader();

loader.load( '../T3/assets/fonts/helvetiker_regular.typeface.json', function ( font ) {

	const texto = new TextGeometry( text, {
		font: font,
		size: 5,
		height: 2,
    
		steps: 2,
	depth: 16,
	bevelEnabled: true,
	bevelThickness: 1,
	bevelSize: 0,
	bevelOffset: 0,
	bevelSegments: 1
	} );

  textMesh = new THREE.Mesh(texto, [new THREE.MeshPhongMaterial({emissive: 0x55fa55, emissiveIntensity: 0.5}),new THREE.MeshPhongMaterial({color: 0x145226})]);

  textMesh.rotateY(Math.PI /2);
  textMesh.position.set(-81.85,-10.29,11);
  
  
} );

loader.load( '../assets/fonts/helvetiker_regular.typeface.json', function ( font ) {

	const texto2 = new TextGeometry( text2, {
		font: font,
		size: 5,
		height: 2,
		steps: 2,
	  depth: 16,
	  bevelEnabled: true,
	  bevelThickness: 1,
	  bevelSize: 0,
	  bevelOffset: 0,
	  bevelSegments: 1
	} );

  textMesh2 = new THREE.Mesh(texto2, [new THREE.MeshPhongMaterial({emissive: 0x55fa55, emissiveIntensity: 0.5}),new THREE.MeshPhongMaterial({color: 0x145226})]);

  
  textMesh2.position.set(-76,-10.29,10);
  
  
} );
let moveCaixaVerde1 = 0;
let moveCaixaVerde2 = 0;
let moveCaixaVerde3 = 0;
let moveCaixaVermelha1 = 0;
let moveCaixaVermelha2 = 0;
let moveCaixaAmarela1 = 0;
let moveCaixaAmarela2 = 0;
let clicouCA1 = false;
let clicouCA2 = false;

const blockMesh1 = new THREE.Mesh(new THREE.BoxGeometry( 15, 15, 3 ));
blockMesh1.position.set(0,8,0);
blockMesh1.matrixAutoUpdate = false;
blockMesh1.updateMatrix();

let cylinderMesh2 = new THREE.Mesh(new THREE.CylinderGeometry(4,4,5,32));
cylinderMesh2.position.set(0,10,0);
cylinderMesh2.rotateX(Math.PI /2);
cylinderMesh2.matrixAutoUpdate = false;
cylinderMesh2.updateMatrix();

const blockMesh2 = new THREE.Mesh(new THREE.BoxGeometry( 8, 10, 3 ));
blockMesh2.position.set(0,5,0);
blockMesh2.matrixAutoUpdate = false;
blockMesh2.updateMatrix();

let blockCSG1 = CSG.fromMesh(blockMesh1);
let cylCSG = CSG.fromMesh(cylinderMesh2);
let blockCSG2 = CSG.fromMesh(blockMesh2);

let CSGobj4 = blockCSG1.subtract(cylCSG);
let CSGobj5 = CSGobj4.subtract(blockCSG2);
let CSGFin1 = CSG.toMesh(CSGobj5, new THREE.Matrix4());

let CSGFin2 = CSG.toMesh(CSGobj5, new THREE.Matrix4());
let CSGFin3 = CSG.toMesh(CSGobj5, new THREE.Matrix4());
CSGFin1.material = new THREE.MeshPhongMaterial({color: 'blue'});
CSGFin2.material = new THREE.MeshPhongMaterial({color: 'red'});
CSGFin3.material = new THREE.MeshPhongMaterial({color: 'yellow'});
CSGFin1.position.set(1,10.5,55.75);
CSGFin2.position.set(77.25,-21,0.75);
CSGFin2.rotateY(Math.PI/2);
CSGFin3.position.set(-56,-11,1);
CSGFin3.rotateY(Math.PI/2);
scene.add(CSGFin1,CSGFin2,CSGFin3);

const material5 = new THREE.MeshPhongMaterial( {color: 0x00ff00} );

let torusMesh = new THREE.Mesh(new THREE.TorusGeometry( 0.4, 0.2, 16, 100 ));
torusMesh.position.y += 2.5;
torusMesh.matrixAutoUpdate = false;
torusMesh.updateMatrix();
let cylinderMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.2,1,32));
cylinderMesh.rotation.z = Math.PI / 2;
cylinderMesh.position.y += 2.5;
cylinderMesh.position.x += 1;
cylinderMesh.matrixAutoUpdate = false;
cylinderMesh.updateMatrix();
let capsule1 = new THREE.Mesh(new THREE.CapsuleGeometry( 0.1, 0.3, 4, 8 ));
capsule1.position.set(1,2.2,0);
capsule1.matrixAutoUpdate = false;
capsule1.updateMatrix();
let capsule2 = new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.3, 4, 8 ));
capsule2.position.set(1.4,2.2,0);
capsule2.matrixAutoUpdate = false;
capsule2.updateMatrix();

let ringCSG = CSG.fromMesh(torusMesh);
let cylinderCSG = CSG.fromMesh(cylinderMesh);
let caps1CSG = CSG.fromMesh(capsule1);
let caps2CSG = CSG.fromMesh(capsule2);

let CSGobj1 = ringCSG.union(cylinderCSG);
let CSGobj2 = CSGobj1.union(caps1CSG);
let CSGobj3 = CSGobj2.union(caps2CSG);

let CSGFinal1 = CSG.toMesh(CSGobj3, new THREE.Matrix4());
  CSGFinal1.material = new THREE.MeshPhongMaterial({color: 'blue'});
  let CSGFinal2 = CSG.toMesh(CSGobj3, new THREE.Matrix4());
  CSGFinal2.material = new THREE.MeshPhongMaterial({color: 'yellow'});
  let CSGFinal3 = CSG.toMesh(CSGobj3, new THREE.Matrix4());
  CSGFinal3.material = new THREE.MeshPhongMaterial({color: 'red'});
CSGFinal1.position.set(0.85,-11,-141);
CSGFinal2.position.set(152,-20,-0.5);
CSGFinal3.position.set(-1.5,9,131.6);
scene.add(CSGFinal1, CSGFinal2, CSGFinal3);

keyboard = new KeyboardState();
var dirLight = new THREE.DirectionalLight(0xffffff);
  dirLight.position.copy(new THREE.Vector3(25.0, 25.0, 25.0));
  dirLight.shadow.mapSize.width = 1000;
  dirLight.shadow.mapSize.height = 1000;
  dirLight.castShadow = true;
  dirLight.shadow.camera.left = -100;
  dirLight.shadow.camera.right = 100;
  dirLight.shadow.camera.top = 50;
  dirLight.shadow.camera.bottom = -200;
  scene.add(dirLight);
var mixer = new Array();

let spotLight1 = new THREE.SpotLight("rgb(255,255,255)");
let spotLight2 = new THREE.SpotLight("rgb(255,255,255)");
let spotLight3 = new THREE.SpotLight("rgb(255,255,255)");
let spotLight4 = new THREE.SpotLight("rgb(255,255,255)");
let spotLight5 = new THREE.SpotLight("rgb(255,255,255)");
let spotLight6 = new THREE.SpotLight("rgb(255,255,255)");
let spotLight7 = new THREE.SpotLight("rgb(255,255,255)");
let spotLight8 = new THREE.SpotLight("rgb(255,255,255)");

spotLight1.distance = 0;
spotLight1.uuid = "NA";
spotLight1.castShadow = true;
spotLight1.decay = 2;
spotLight1.penumbra = 0.5;
spotLight1.angle= THREE.MathUtils.degToRad(20);
spotLight1.target.updateMatrixWorld();
spotLight1.shadow.mapSize.width = 512;
spotLight1.shadow.mapSize.height = 512;
spotLight1.shadow.camera.near = .2;    
spotLight1.shadow.camera.far = 20.0;

spotLight2.distance = 0;
spotLight2.uuid = "NA";
spotLight2.castShadow = true;
spotLight2.decay = 2;
spotLight2.penumbra = 0.5;
spotLight2.angle= THREE.MathUtils.degToRad(20);
spotLight2.target.updateMatrixWorld();
spotLight2.shadow.mapSize.width = 512;
spotLight2.shadow.mapSize.height = 512;
spotLight2.shadow.camera.near = .2;    
spotLight2.shadow.camera.far = 20.0;

spotLight3.distance = 0;
spotLight3.uuid = "NA";
spotLight3.castShadow = true;
spotLight3.decay = 2;
spotLight3.penumbra = 0.5;
spotLight3.angle= THREE.MathUtils.degToRad(20);
spotLight3.target.updateMatrixWorld();
spotLight3.shadow.mapSize.width = 512;
spotLight3.shadow.mapSize.height = 512;
spotLight3.shadow.camera.near = .2;    
spotLight3.shadow.camera.far = 20.0;

spotLight4.distance = 0;
spotLight4.uuid = "NA";
spotLight4.castShadow = true;
spotLight4.decay = 2;
spotLight4.penumbra = 0.5;
spotLight4.angle= THREE.MathUtils.degToRad(20);
spotLight4.target.updateMatrixWorld();
spotLight4.shadow.mapSize.width = 512;
spotLight4.shadow.mapSize.height = 512;
spotLight4.shadow.camera.near = .2;    
spotLight4.shadow.camera.far = 20.0;

spotLight5.distance = 0;
spotLight5.uuid = "NA";
spotLight5.castShadow = true;
spotLight5.decay = 2;
spotLight5.penumbra = 0.5;
spotLight5.angle= THREE.MathUtils.degToRad(20);
spotLight5.target.updateMatrixWorld();
spotLight5.shadow.mapSize.width = 512;
spotLight5.shadow.mapSize.height = 512;
spotLight5.shadow.camera.near = .2;    
spotLight5.shadow.camera.far = 20.0;

spotLight6.distance = 0;
spotLight6.uuid = "NA";
spotLight6.castShadow = true;
spotLight6.decay = 2;
spotLight6.penumbra = 0.5;
spotLight6.angle= THREE.MathUtils.degToRad(20);
spotLight6.target.updateMatrixWorld();
spotLight6.shadow.mapSize.width = 512;
spotLight6.shadow.mapSize.height = 512;
spotLight6.shadow.camera.near = .2;    
spotLight6.shadow.camera.far = 20.0;

spotLight7.distance = 0;
spotLight7.uuid = "NA";
spotLight7.castShadow = true;
spotLight7.decay = 2;
spotLight7.penumbra = 0.5;
spotLight7.angle= THREE.MathUtils.degToRad(20);
spotLight7.target.updateMatrixWorld();
spotLight7.shadow.mapSize.width = 512;
spotLight7.shadow.mapSize.height = 512;
spotLight7.shadow.camera.near = .2;    
spotLight7.shadow.camera.far = 20.0;

spotLight8.distance = 0;
spotLight8.uuid = "NA";
spotLight8.castShadow = true;
spotLight8.decay = 2;
spotLight8.penumbra = 0.5;
spotLight8.angle= THREE.MathUtils.degToRad(20);
spotLight8.target.updateMatrixWorld();
spotLight8.shadow.mapSize.width = 512;
spotLight8.shadow.mapSize.height = 512;
spotLight8.shadow.camera.near = .2;    
spotLight8.shadow.camera.far = 20.0;


var geometry = new THREE.CylinderGeometry(10/3.5, 10/2.5, 10*1.3, 8);
                var material = new THREE.MeshToonMaterial({color: 0x664422});
                var trunk = new THREE.Mesh(geometry, material);
var outline_geo = new THREE.CylinderGeometry(50/3.5 + 0.025, 50/2.5 + 0.025, 50 * 1.3 + 0.025, 8);
                var outline_mat = new THREE.MeshBasicMaterial({
                    color: 0x0000000,
                    side: THREE.BackSide
                });
                var outlineTrunk = new THREE.Mesh(outline_geo, outline_mat);
                trunk.add(outlineTrunk);

//var groundPlane = createGroundPlaneXZ(70, 70, 10, 10); // width, height, resolutionW, resolutionH
var groundPlane = createGroundPlaneWired(70,70);
var cenario1 = createGroundCenario1(70,70);
var cenario2 = createGroundCenario2(70,70);
var cenario3 = createGroundCenario3(70,70);
var cenarioFinal = createGroundCenarioFinal(30,30);
var planoChaveAzul = createGroundKeyBlue(15,15);
var planoChaveVermelha = createGroundKeyRed(15,15);
var planoChaveAmarela = createGroundKeyYellow(15,15);

document.addEventListener('mousedown', onDocMouseDown);
document.addEventListener('mousemove', onDocMouseMove);

scene.add(groundPlane, cenario1, cenario2, cenario3, cenarioFinal, planoChaveAzul, planoChaveVermelha, planoChaveAmarela);

var collisions = [];
var select = false;
var objectSel;

//***********************************************************************/
// AQUI SÃO CRIADAS AS BORDAS USADAS EM CADA CENÁRIO

//************************************************************************* BORDAS DO CENÁRIO INICIAL */
//****************** BORDAS DO SENTIDO NEGATIVO DO EIXO Z */
//parte 1
  const borda1 = new THREE.Mesh(
  new THREE.BoxGeometry(30,4,1),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda1.position.set(20, 0.38, -35);
borda1.castShadow = true;
borda1.receiveShadow = true;

//borda 1 bounding box
let borda1BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda1BB.setFromObject(borda1);

//parte 2
const borda1a = new THREE.Mesh
(
  new THREE.BoxGeometry(30,4,1),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda1a.position.set(-20, 0.38, -35);
borda1a.castShadow = true;
borda1a.receiveShadow = true;

//borda 1a bounding box
let borda1aBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda1aBB.setFromObject(borda1a);

//******************* BORDAS DO SENTIDO POSITIVO DO EIXO Z */

//borda 1
const borda2 = new THREE.Mesh(
  new THREE.BoxGeometry(32,4,1),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda2.position.set(19, 0.38, 35);
borda2.castShadow = true;
borda2.receiveShadow = true;

let borda2BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda2BB.setFromObject(borda2);

//borda 2
const borda2a = new THREE.Mesh(
  new THREE.BoxGeometry(32,4,1),
  new THREE.MeshPhongMaterial({color: 0xE6C585}),
);
borda2a.position.set(-19, 0.38, 35);
borda2a.castShadow = true;
borda2a.receiveShadow = true;

let borda2aBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda2aBB.setFromObject(borda2a);

//******************* BORDAS DO SENTIDO NEGATIVO DO EIXO X */

//borda 1
const borda3 = new THREE.Mesh(
  new THREE.BoxGeometry(1,4,32),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda3.position.set(-35, 0.38, 19);
borda3.castShadow = true;
borda3.receiveShadow = true;

//borda 3 bounding box
let borda3BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda3BB.setFromObject(borda3);

//borda 2
const borda3a = new THREE.Mesh(
  new THREE.BoxGeometry(1,4,32),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda3a.position.set(-35, 0.38, -19);
borda3a.castShadow = true;
borda3a.receiveShadow = true;

//borda 3 bounding box
let borda3aBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda3aBB.setFromObject(borda3a);

//******************* BORDAS DO SENTIDO POSITIVO DO EIXO X */

//borda 1
const borda4 = new THREE.Mesh(
  new THREE.BoxGeometry(1,4,32),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda4.position.set(35, 0.38, 19);
borda4.castShadow = true;
borda4.receiveShadow = true;

//borda 4 bounding box
let borda4BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda4BB.setFromObject(borda4); 

const borda4a = new THREE.Mesh(
  new THREE.BoxGeometry(1,4,32),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda4a.position.set(35, 0.38, -19);
borda4a.castShadow = true;
borda4a.receiveShadow = true;

//borda 4 bounding box
let borda4aBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda4aBB.setFromObject(borda4a);

scene.add(borda1, borda1a, borda2, borda2a, borda3, borda3a, borda4, borda4a);

//********************************************************************************** BORDAS DO CENÁRIO 1 */

//****************** BORDAS DO SENTIDO NEGATIVO DO EIXO Z */
//parte 1
const borda1ACenario1 = new THREE.Mesh(
  new THREE.BoxGeometry(30,4,1),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda1ACenario1.position.set(20, -10, -125);
borda1ACenario1.castShadow = true;
borda1ACenario1.receiveShadow = true;

let borda1ACenario1BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda1ACenario1BB.setFromObject(borda1ACenario1);

//parte 2
const borda1BCenario1 = new THREE.Mesh
(
  new THREE.BoxGeometry(30,4,1),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda1BCenario1.position.set(-20, -10, -125);
borda1BCenario1.castShadow = true;
borda1BCenario1.receiveShadow = true;

let borda1BCenario1BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda1BCenario1BB.setFromObject(borda1BCenario1);

//****************** BORDAS DO SENTIDO POSITIVO DO EIXO Z */
//parte 1
const borda2ACenario1 = new THREE.Mesh(
  new THREE.BoxGeometry(30,4,1),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda2ACenario1.position.set(20, -10, -55);
borda2ACenario1.castShadow = true;
borda2ACenario1.receiveShadow = true;

//borda 1 bounding box
let borda2ACenario1BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda2ACenario1BB.setFromObject(borda2ACenario1);

//parte 2
const borda2BCenario1 = new THREE.Mesh
(
  new THREE.BoxGeometry(30,4,1),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda2BCenario1.position.set(-20, -10, -55);
borda2BCenario1.castShadow = true;
borda2BCenario1.receiveShadow = true;

//borda 1a bounding box
let borda2BCenario1BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda2BCenario1BB.setFromObject(borda2BCenario1);

//****************** BORDA DO SENTIDO NEGATIVO DO EIXO X */
//borda 1
const borda3ACenario1 = new THREE.Mesh(
  new THREE.BoxGeometry(1,4,70),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda3ACenario1.position.set(-35, -10, -90);
borda3ACenario1.castShadow = true;
borda3ACenario1.receiveShadow = true;

let borda3ACenario1BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda3ACenario1BB.setFromObject(borda3ACenario1);

//****************** BORDA DO SENTIDO POSITIVO DO EIXO X */
//borda 1
const borda4ACenario1 = new THREE.Mesh(
  new THREE.BoxGeometry(1,4,70),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda4ACenario1.position.set(35, -10, -90);
borda4ACenario1.castShadow = true;
borda4ACenario1.receiveShadow = true;

let borda4ACenario1BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda4ACenario1BB.setFromObject(borda4ACenario1);


scene.add(borda1ACenario1, borda1BCenario1, borda2ACenario1, borda2BCenario1, borda3ACenario1, borda4ACenario1);

//********************************************************************************** BORDAS DO CENÁRIO 2 */

//****************** BORDAS DO SENTIDO NEGATIVO DO EIXO Z */
//parte 1
const borda1ACenario2 = new THREE.Mesh(
  new THREE.BoxGeometry(32,4,1),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda1ACenario2.position.set(19, 11, 55);
borda1ACenario2.castShadow = true;
borda1ACenario2.receiveShadow = true;

let borda1ACenario2BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda1ACenario2BB.setFromObject(borda1ACenario2);

//parte 2
const borda1BCenario2 = new THREE.Mesh
(
  new THREE.BoxGeometry(32,4,1),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda1BCenario2.position.set(-19, 11, 55);
borda1BCenario2.castShadow = true;
borda1BCenario2.receiveShadow = true;

let borda1BCenario2BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda1BCenario2BB.setFromObject(borda1BCenario2);

//****************** BORDAS DO SENTIDO POSITIVO DO EIXO Z */
//parte 1
const borda2ACenario2 = new THREE.Mesh(
  new THREE.BoxGeometry(32,4,1),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda2ACenario2.position.set(19, 11, 125);
borda2ACenario2.castShadow = true;
borda2ACenario2.receiveShadow = true;

let borda2ACenario2BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda2ACenario2BB.setFromObject(borda2ACenario2);

//parte 2
const borda2BCenario2 = new THREE.Mesh
(
  new THREE.BoxGeometry(32,4,1),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda2BCenario2.position.set(-19, 11, 125);
borda2BCenario2.castShadow = true;
borda2BCenario2.receiveShadow = true;

let borda2BCenario2BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda2BCenario2BB.setFromObject(borda2BCenario2);

//****************** BORDA DO SENTIDO NEGATIVO DO EIXO X */
//borda 1
const borda3ACenario2 = new THREE.Mesh(
  new THREE.BoxGeometry(1,4,70),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda3ACenario2.position.set(-35, 11, 90);
borda3ACenario2.castShadow = true;
borda3ACenario2.receiveShadow = true;

let borda3ACenario2BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda3ACenario2BB.setFromObject(borda3ACenario2);

//****************** BORDA DO SENTIDO POSITIVO DO EIXO X */
//borda 1
const borda4ACenario2 = new THREE.Mesh(
  new THREE.BoxGeometry(1,4,70),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda4ACenario2.position.set(35, 11, 90);
borda4ACenario2.castShadow = true;
borda4ACenario2.receiveShadow = true;

let borda4ACenario2BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda4ACenario2BB.setFromObject(borda4ACenario2);

scene.add(borda1ACenario2, borda1BCenario2, borda2ACenario2, borda2BCenario2, borda3ACenario2, borda4ACenario2);

//********************************************************************************** BORDAS DO CENÁRIO 3 */
//****************** BORDA DO SENTIDO NEGATIVO DO EIXO Z */
//parte 1
const borda1ACenario3 = new THREE.Mesh(
  new THREE.BoxGeometry(70,4,1),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda1ACenario3.position.set(111.5, -20, -35);
borda1ACenario3.castShadow = true;
borda1ACenario3.receiveShadow = true;

let borda1ACenario3BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda1ACenario3BB.setFromObject(borda1ACenario3);

//****************** BORDA DO SENTIDO POSITIVO DO EIXO Z */
//parte 1
const borda2ACenario3 = new THREE.Mesh(
  new THREE.BoxGeometry(70,4,1),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda2ACenario3.position.set(111.5, -20, 35);
borda2ACenario3.castShadow = true;
borda2ACenario3.receiveShadow = true;

let borda2ACenario3BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda2ACenario3BB.setFromObject(borda2ACenario3);

//****************** BORDAS DO SENTIDO NEGATIVO DO EIXO X */
//parte 1
const borda3ACenario3 = new THREE.Mesh(
  new THREE.BoxGeometry(1,4,32),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda3ACenario3.position.set(76.5, -20, 19);
borda3ACenario3.castShadow = true;
borda3ACenario3.receiveShadow = true;

let borda3ACenario3BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda3ACenario3BB.setFromObject(borda3ACenario3);

//parte 2
const borda3BCenario3 = new THREE.Mesh(
  new THREE.BoxGeometry(1,4,32),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda3BCenario3.position.set(76.5, -20, -19);
borda3BCenario3.castShadow = true;
borda3BCenario3.receiveShadow = true;

let borda3BCenario3BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda3BCenario3BB.setFromObject(borda3BCenario3);

//****************** BORDAS DO SENTIDO POSITIVO DO EIXO X */
//parte 1
const borda4ACenario3 = new THREE.Mesh(
  new THREE.BoxGeometry(1,4,32),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda4ACenario3.position.set(146.5, -20, 19);
borda4ACenario3.castShadow = true;
borda4ACenario3.receiveShadow = true;

let borda4ACenario3BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda4ACenario3BB.setFromObject(borda4ACenario3);

//parte 2
const borda4BCenario3 = new THREE.Mesh(
  new THREE.BoxGeometry(1,4,32),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda4BCenario3.position.set(146.5, -20, -19);
borda4BCenario3.castShadow = true;
borda4BCenario3.receiveShadow = true;

let borda4BCenario3BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda4BCenario3BB.setFromObject(borda4BCenario3);

scene.add(borda1ACenario3, borda2ACenario3, borda3ACenario3, borda3BCenario3, borda4ACenario3, borda4BCenario3);

//********************************************************************************** BORDAS DO CENÁRIO FINAL */

//****************** BORDA DO SENTIDO NEGATIVO DO EIXO Z */
//parte 1
const borda1ACenario4 = new THREE.Mesh(
  new THREE.BoxGeometry(30,4,1),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda1ACenario4.position.set(-72, -10, -15);
borda1ACenario4.castShadow = true;
borda1ACenario4.receiveShadow = true;

let borda1ACenario4BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda1ACenario4BB.setFromObject(borda1ACenario4);

//****************** BORDA DO SENTIDO POSITIVO DO EIXO Z */
//parte 1
const borda2ACenario4 = new THREE.Mesh(
  new THREE.BoxGeometry(30,4,1),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda2ACenario4.position.set(-72, -10, 15);
borda2ACenario4.castShadow = true;
borda2ACenario4.receiveShadow = true;

let borda2ACenario4BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda2ACenario4BB.setFromObject(borda2ACenario4);

//****************** BORDAS DO SENTIDO POSITIVO DO EIXO X */
//parte 1
const borda3ACenario4 = new THREE.Mesh(
  new THREE.BoxGeometry(1,4,12),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda3ACenario4.position.set(-56.5, -10, -9);
borda3ACenario4.castShadow = true;
borda3ACenario4.receiveShadow = true;

let borda3ACenario4BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda3ACenario4BB.setFromObject(borda3ACenario4);

//parte 2
const borda3BCenario4 = new THREE.Mesh(
  new THREE.BoxGeometry(1,4,12),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda3BCenario4.position.set(-56.5, -10, 9);
borda3BCenario4.castShadow = true;
borda3BCenario4.receiveShadow = true;

let borda3BCenario4BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda3BCenario4BB.setFromObject(borda3BCenario4);

//****************** BORDA DO SENTIDO NEGATIVO DO EIXO X */
//parte 1
const borda4ACenario4 = new THREE.Mesh(
  new THREE.BoxGeometry(1,4,30),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda4ACenario4.position.set(-87, -10, 0);
borda4ACenario4.castShadow = true;
borda4ACenario4.receiveShadow = true;

let borda4ACenario4BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda4ACenario4BB.setFromObject(borda4ACenario4);

scene.add(borda1ACenario4, borda2ACenario4, borda3ACenario4, borda3BCenario4, borda4ACenario4);

//********************************************************************************** BORDAS DO CENÁRIO CHAVE AZUL */
//borda 1 - eixo x+
const borda1CenarioChaveA = new THREE.Mesh(
  new THREE.BoxGeometry(1,4,15),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda1CenarioChaveA.position.set(7.5, -10, -141.5);
borda1CenarioChaveA.castShadow = true;
borda1CenarioChaveA.receiveShadow = true;

let borda1CenarioChaveABB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda1CenarioChaveABB.setFromObject(borda1CenarioChaveA);

//borda 2 - eixo x-
const borda2CenarioChaveA = new THREE.Mesh(
  new THREE.BoxGeometry(1,4,15),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda2CenarioChaveA.position.set(-7.5, -10, -141.5);
borda2CenarioChaveA.castShadow = true;
borda2CenarioChaveA.receiveShadow = true;

let borda2CenarioChaveABB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda2CenarioChaveABB.setFromObject(borda2CenarioChaveA);

//borda 3 - eixo z-
const borda3CenarioChaveA = new THREE.Mesh(
  new THREE.BoxGeometry(15,4,1),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda3CenarioChaveA.position.set(0, -10, -149);
borda3CenarioChaveA.castShadow = true;
borda3CenarioChaveA.receiveShadow = true;

let borda3CenarioChaveABB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda3CenarioChaveABB.setFromObject(borda3CenarioChaveA);

scene.add(borda1CenarioChaveA, borda2CenarioChaveA, borda3CenarioChaveA);

//********************************************************************************** BORDAS DO CENÁRIO CHAVE VERMELHA */
//borda 1 - x+
const borda1CenarioChaveV = new THREE.Mesh(
  new THREE.BoxGeometry(1,4,15),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda1CenarioChaveV.position.set(7.5, 11, 132);
borda1CenarioChaveV.castShadow = true;
borda1CenarioChaveV.receiveShadow = true;

let borda1CenarioChaveVBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda1CenarioChaveVBB.setFromObject(borda1CenarioChaveV);

//borda 2 - x-
const borda2CenarioChaveV = new THREE.Mesh(
  new THREE.BoxGeometry(1,4,15),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda2CenarioChaveV.position.set(-7.5, 11, 132);
borda2CenarioChaveV.castShadow = true;
borda2CenarioChaveV.receiveShadow = true;

let borda2CenarioChaveVBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda2CenarioChaveVBB.setFromObject(borda2CenarioChaveV);

//borda 3 - z+
const borda3CenarioChaveV = new THREE.Mesh(
  new THREE.BoxGeometry(15,4,1),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda3CenarioChaveV.position.set(0, 11, 140);
borda3CenarioChaveV.castShadow = true;
borda3CenarioChaveV.receiveShadow = true;

let borda3CenarioChaveVBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda3CenarioChaveVBB.setFromObject(borda3CenarioChaveV);

scene.add(borda1CenarioChaveV, borda2CenarioChaveV, borda3CenarioChaveV);

//********************************************************************************** BORDAS DO CENÁRIO CHAVE AMARELA */
//borda 1 - eixo x+
const borda1CenarioChaveY = new THREE.Mesh(
  new THREE.BoxGeometry(1,4,15),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda1CenarioChaveY.position.set(161.5, -20, 0);
borda1CenarioChaveY.castShadow = true;
borda1CenarioChaveY.receiveShadow = true;
let borda1CenarioChaveYBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda1CenarioChaveYBB.setFromObject(borda1CenarioChaveY);

//borda 2 - eixo z-
const borda2CenarioChaveY = new THREE.Mesh(
  new THREE.BoxGeometry(15,4,1),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
borda2CenarioChaveY.position.set(154, -20, -7.5);
borda2CenarioChaveY.castShadow = true;
borda2CenarioChaveY.receiveShadow = true;
let borda2CenarioChaveYBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda2CenarioChaveYBB.setFromObject(borda2CenarioChaveY);

//borda 3 - eixo z+
const borda3CenarioChaveY = borda2CenarioChaveY.clone();
borda3CenarioChaveY.position.set(154, -20, 7.5);
borda3CenarioChaveY.castShadow = true;
borda3CenarioChaveY.receiveShadow = true;
let borda3CenarioChaveYBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
borda3CenarioChaveYBB.setFromObject(borda3CenarioChaveY);

scene.add(borda1CenarioChaveY, borda2CenarioChaveY, borda3CenarioChaveY);

//*************************** CUBO QUE ACOMPANHA PERSONAGEM PRINCIPAL E INTERRUPTORES DO CENÁRIO 3 */

//AQUI É CRIADO UM CUBO PARA ACOMPANHAR O PERSONAGEM PRINCIPAL

//CUBO
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 0.5, 0.5),
  new THREE.MeshPhongMaterial({color: 0xE6C585}),
);
cube2.position.set(0, 1 , 0);
cube2.castShadow = true;
cube2.receiveShadow = true;

//player cube bounding box
let cube2BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
cube2BB.setFromObject(cube2);

//INTERRUPTORES DO CENÁRIO 3
const int1 = new THREE.Mesh(
  new THREE.BoxGeometry(0.5,1,0.2),
  new THREE.MeshPhongMaterial({emissive: 0xfef600 })
);
int1.position.set(98,-19,-34.2);
int1.castShadow = true; 
int1.receiveShadow = true;

const int2 = new THREE.Mesh(
  new THREE.BoxGeometry(0.5,1,0.2),
  new THREE.MeshPhongMaterial({emissive: 0xfef600})
);
int2.position.set(134,-19,-34.2);
int2.castShadow = true;
int2.receiveShadow = true;

const int3 = new THREE.Mesh(
  new THREE.BoxGeometry(0.5,1,0.2),
  new THREE.MeshPhongMaterial({emissive: 0xfef600})
  
);
int3.rotateY(Math.PI /2);
int3.position.set(78,-19,10);
int3.castShadow = true;
int3.receiveShadow = true;
const int4 = new THREE.Mesh(
  new THREE.BoxGeometry(0.5,1,0.2),
  new THREE.MeshPhongMaterial({emissive: 0xfef600})
);
int4.rotateY(Math.PI /2);
int4.position.set(78,-19,20);
int4.castShadow = true;
int4.receiveShadow = true;
const int5 = new THREE.Mesh(
  new THREE.BoxGeometry(0.5,1,0.2),
  new THREE.MeshPhongMaterial({emissive: 0xfef600})
);
int5.rotateY(Math.PI /2);
int5.position.set(78,-19,30);
int5.castShadow = true;
int5.receiveShadow = true;
const int6 = new THREE.Mesh(
  new THREE.BoxGeometry(0.5,1,0.2),
  new THREE.MeshPhongMaterial({emissive: 0xfef600})
);
int6.position.set(77,-19,-10);
int6.rotateY(Math.PI /2);
int6.castShadow = true;
int6.receiveShadow = true;
const int7 = new THREE.Mesh(
  new THREE.BoxGeometry(0.5,1,0.2),
  new THREE.MeshPhongMaterial({emissive: 0xfef600})
);
int7.rotateY(Math.PI /2);
int7.position.set(77,-19,-20);
int7.castShadow = true;
int7.receiveShadow = true;
const int8 = new THREE.Mesh(
  new THREE.BoxGeometry(0.5,1,0.2),
  new THREE.MeshPhongMaterial({emissive: 0xfef600})
);
int8.rotateY(Math.PI /2);
int8.position.set(77,-19,-30);
int8.castShadow = true;
int8.receiveShadow = true;
scene.add(int1, int2, int3, int4, int5, int6, int7, int8);

//*************** OBJETOS DO MAPA - CAIXAS */
//CENÁRIO 1

const obj1 = new THREE.Mesh(
  new THREE.BoxGeometry(5,1,3),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
obj1.position.set(10 , -11 , -110);
obj1.name = "1";
obj1.castShadow = true;
obj1.receiveShadow = true;

//player cube bounding box
let obj1BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
obj1BB.setFromObject(obj1);

//obj1.material.color = new THREE.Color(0xffffff * Math.random());
//obj1.material.needsUpdate = true;
calculateCollisionPoints(obj1);
scene.add(obj1);

//objeto2
const obj2 = new THREE.Mesh(
  new THREE.BoxGeometry(5,1,3),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
obj2.position.set(0 , -11 , -110);
obj2.name = "2";
obj2.castShadow = true;
obj2.receiveShadow = true;

//objeto 2 bounding box
let obj2BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
obj2BB.setFromObject(obj2);

calculateCollisionPoints(obj2);
scene.add(obj2);

//objeto3
const obj3 = new THREE.Mesh(
  new THREE.BoxGeometry(5,1,3),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
obj3.position.set(-10 , -11 , -110);
obj3.name = "3";
obj3.castShadow = true;
obj3.receiveShadow = true;

//objeto 3 bounding box
let obj3BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
obj3BB.setFromObject(obj3);

calculateCollisionPoints(obj3);
scene.add(obj3);

//objeto4
const obj4 = new THREE.Mesh(
  new THREE.BoxGeometry(5,1,3),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
obj4.position.set(10 , -11 , -100);
obj4.name = "4";
obj4.castShadow = true;
obj4.receiveShadow = true;

//objeto 4 bounding box
let obj4BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
obj4BB.setFromObject(obj4);

calculateCollisionPoints(obj4);
scene.add(obj4);

//objeto5
const obj5 = new THREE.Mesh(
  new THREE.BoxGeometry(5, 1, 3),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
obj5.position.set(0 , -11 , -100);
obj5.name = "5";
obj5.castShadow = true;
obj5.receiveShadow = true;

//objeto 5 bounding box
let obj5BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
obj5BB.setFromObject(obj5);

calculateCollisionPoints(obj5);
scene.add(obj5);

//objeto6
const obj6 = new THREE.Mesh(
  new THREE.BoxGeometry(5, 1, 3),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
obj6.name = "6";
obj6.position.set(-10 , -11 , -100);
obj6.castShadow = true;
obj6.receiveShadow = true;

//objeto 6 bounding box
let obj6BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
obj6BB.setFromObject(obj6);

calculateCollisionPoints(obj6);
scene.add(obj6);

// CENÁRIO 2
const obj7 = new THREE.Mesh(
  new THREE.BoxGeometry(2,2,2),
  new THREE.MeshPhongMaterial({color: 0xE6C585})
);
obj7.name = "7";
obj7.position.set(-10 , 11 , 100);
obj7.castShadow = true;
obj7.receiveShadow = true;
let obj7BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
obj7BB.setFromObject(obj7);
calculateCollisionPoints(obj7);
scene.add(obj7);

const obj8 = obj7.clone();
obj8.name = "8";
obj8.position.set(20 , 11 , 85);
obj8.castShadow = true;
obj8.receiveShadow = true;
let obj8BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
obj8BB.setFromObject(obj8);
calculateCollisionPoints(obj8);
scene.add(obj8);

const obj9 = obj7.clone();
obj9.name = "9";
obj9.position.set(-20 , 11 , 90);
obj9.castShadow = true;
obj9.receiveShadow = true;
let obj9BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
obj9BB.setFromObject(obj9);
calculateCollisionPoints(obj9);
scene.add(obj9);

const obj10 = obj7.clone();
obj10.name = "10";
obj10.position.set(0 , 11 , 90);
obj10.castShadow = true;
obj10.receiveShadow = true;
let obj10BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
obj10BB.setFromObject(obj10);
calculateCollisionPoints(obj10);
scene.add(obj10);

const obj11 = obj7.clone();
obj11.name = "11";
obj11.position.set(10 , 11 , 80);
obj11.castShadow = true;
obj11.receiveShadow = true;
let obj11BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
obj11BB.setFromObject(obj11);
calculateCollisionPoints(obj11);
scene.add(obj11);

const obj12 = obj7.clone();
obj12.name = "12";
obj12.position.set(-20 , 11 , 75);
obj12.castShadow = true;
obj12.receiveShadow = true;
let obj12BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
obj12BB.setFromObject(obj12);
calculateCollisionPoints(obj12);
scene.add(obj12);


//CAIXAS VERDES DO CENÁRIO 2
const caixaVerde1 = new THREE.Mesh(
  new THREE.BoxGeometry(2,2,2),
  new THREE.MeshPhongMaterial({color: 0x5DDF20})
);
caixaVerde1.name = "CV1";
caixaVerde1.uuid = "NS";
caixaVerde1.position.set(0 , 18 , 115);
caixaVerde1.castShadow = true;
caixaVerde1.receiveShadow = true;
let caixaVerde1BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
caixaVerde1BB.setFromObject(caixaVerde1);
calculateCollisionPoints(caixaVerde1);
scene.add(caixaVerde1);

const caixaVerde2 = new THREE.Mesh(
  new THREE.BoxGeometry(2,2,2),
  new THREE.MeshPhongMaterial({color: 0x5DDF20})
);
caixaVerde2.name = "CV2";
caixaVerde2.uuid = "NS";
caixaVerde2.position.set(15 , 18 , 115);
caixaVerde2.castShadow = true;
caixaVerde2.receiveShadow = true;
let caixaVerde2BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
caixaVerde2BB.setFromObject(caixaVerde2);
calculateCollisionPoints(caixaVerde2);
scene.add(caixaVerde2);

const caixaVerde3 = new THREE.Mesh(
  new THREE.BoxGeometry(2,2,2),
  new THREE.MeshPhongMaterial({color: 0x5DDF20})
);
caixaVerde3.name = "CV3";
caixaVerde3.uuid = "NS";
caixaVerde3.position.set(-15 , 18 , 115);
caixaVerde3.castShadow = true;
caixaVerde3.receiveShadow = true;
let caixaVerde3BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
caixaVerde3BB.setFromObject(caixaVerde3);
calculateCollisionPoints(caixaVerde3);
scene.add(caixaVerde3);

//CAIXAS VERDES OPAS
const caixaVerde1T = new THREE.Mesh(
  new THREE.BoxGeometry(2,2,2),
  new THREE.MeshPhongMaterial({color: 0x5DDF20, opacity: 0.5, transparent: true})
);
caixaVerde1T.name = "CV1T";
caixaVerde1T.uuid = "NS";
caixaVerde1T.position.set(0,11,115);
scene.add(caixaVerde1T);

const caixaVerde2T = new THREE.Mesh(
  new THREE.BoxGeometry(2,2,2),
  new THREE.MeshPhongMaterial({color: 0x5DDF20, opacity: 0.5, transparent: true})
);
caixaVerde2T.name = "CV2T";
caixaVerde2T.uuid = "NS";
caixaVerde2T.position.set(15,11,115);
scene.add(caixaVerde2T);

const caixaVerde3T = new THREE.Mesh(
  new THREE.BoxGeometry(2,2,2),
  new THREE.MeshPhongMaterial({color: 0x5DDF20, opacity: 0.5, transparent: true})
);
caixaVerde3T.name = "CV3T";
caixaVerde3T.uuid = "NS";
caixaVerde3T.position.set(-15,11,115);
scene.add(caixaVerde3T);

//CAIXAS VERMELHAS E AMARELAS DO CENÁRIO 3
const caixaVermelha1 = new THREE.Mesh(
  new THREE.BoxGeometry(2,2,2),
  new THREE.MeshPhongMaterial({color: 0xE61818})
);
caixaVermelha1.position.set(96,-20,0);
caixaVermelha1.uuid = "NS";
let caixaVermelha1BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
caixaVermelha1BB.setFromObject(caixaVermelha1);
calculateCollisionPoints(caixaVermelha1);
caixaVermelha1.visible = false;
scene.add(caixaVermelha1);

const caixaVermelha2 = new THREE.Mesh(
  new THREE.BoxGeometry(2,2,2),
  new THREE.MeshPhongMaterial({color: 0xE61818})
);
caixaVermelha2.position.set(120,-20,12);
caixaVermelha2.uuid = "NS";
let caixaVermelha2BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
caixaVermelha2BB.setFromObject(caixaVermelha2);
calculateCollisionPoints(caixaVermelha2);
caixaVermelha2.visible = false;
scene.add(caixaVermelha2);

const caixaAmarela1 = new THREE.Mesh(
  new THREE.BoxGeometry(2,2,2),
  new THREE.MeshPhongMaterial({color: 0xE5E518})
);

caixaAmarela1.position.set(135,-20,-3);
caixaAmarela1.name = "caixaA1";
caixaAmarela1.uuid = "NS";
let caixaAmarela1BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
caixaAmarela1BB.setFromObject(caixaAmarela1);
calculateCollisionPoints(caixaAmarela1);
caixaAmarela1.visible = false;
scene.add(caixaAmarela1);

const caixaAmarela2 = new THREE.Mesh(
  new THREE.BoxGeometry(2,2,2),
  new THREE.MeshPhongMaterial({color: 0xE5E518})
);
caixaAmarela2.position.set(130,-20,-20);
caixaAmarela2.name = "caixaA2";
caixaAmarela2.uuid = "NS";
let caixaAmarela2BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
caixaAmarela2BB.setFromObject(caixaAmarela2);
calculateCollisionPoints(caixaAmarela2);
caixaAmarela2.visible = false;
scene.add(caixaAmarela2);

//************** CUBOS QUE FORMAM A PONTE ANTES E DEPOIS DO USO DO RAYCASTER */
const box = new THREE.Mesh(
  new THREE.BoxGeometry(5,1,3),
  new THREE.MeshPhongMaterial({color: 0xF0761C})
);

const ponte1 = new THREE.Mesh(
  new THREE.BoxGeometry(3, 1, 3),
  new THREE.MeshPhongMaterial({color: 0x000000})
);
ponte1.position.set(1.5 , -11.5 , -126.5);
ponte1.name = "ponte1";
ponte1.uuid = "NP";

const ponte2 = ponte1.clone();
ponte2.position.set(-1.5, -11.5, -126.5);
ponte2.name = "ponte2";
ponte2.uuid = "NP";

const ponte3 = ponte1.clone();
ponte3.position.set(1.5, -11.5, -129.5);
ponte3.name = "ponte3";
ponte3.uuid = "NP";

const ponte4 = ponte1.clone();
ponte4.position.set(-1.5, -11.5, -129.5);
ponte4.name = "ponte4";
ponte4.uuid = "NP";

const ponte5 = ponte1.clone();
ponte5.position.set(1.5, -11.5, -132.5);
ponte5.name = "ponte5";
ponte5.uuid = "NP";

const ponte6 = ponte1.clone();
ponte6.position.set(-1.5, -11.5, -132.5);
ponte6.name = "ponte6";
ponte6.uuid = "NP";

scene.add(ponte1, ponte2, ponte3, ponte4, ponte5, ponte6);

//********************************************************************************** ESCADAS DE ACESSO ENTRE OS PLANOS */

//escada que liga cenário inicial ao cenário 1
let j1 = -1;
let k1 = -35;
while (j1 > -12 && k1 > -57)
{
  const degrau = new THREE.Mesh(
    new THREE.BoxGeometry(10,1,2),
    new THREE.MeshPhongMaterial({color: 0xB8B1AC}),
  );
  degrau.position.set(0, j1, k1);
  degrau.castShadow = true;
  degrau.receiveShadow = true;
  scene.add(degrau);
  j1 = j1 - 1;
  k1 = k1 - 2;
}

//escada que liga cenário inicial ao cenário 2
let j2 = -1;
let k2 = 35;
while(j2 < 12 && k2 < 57)
{
  const degrau2 = new THREE.Mesh(
    new THREE.BoxGeometry(6,1,2),
    new THREE.MeshPhongMaterial({color: 0xB8B1AC}),
  );
  degrau2.position.set(0, j2, k2);
  degrau2.castShadow = true;
  degrau2.receiveShadow = true;
  scene.add(degrau2);
  j2 = j2 + 1;
  k2 = k2 + 2;
}

//escada que liga cenário inicial ao cenário 3

let j3 = -1;
let i1 = 35;

while(j3 > -22 && i1 < 77)
{
  const degrau3 = new THREE.Mesh(
    new THREE.BoxGeometry(2,1,6),
    new THREE.MeshPhongMaterial({color: 0xB8B1AC}),
  );
  degrau3.position.set(i1, j3, 0);
  degrau3.castShadow = true;
  degrau3.receiveShadow = true;
  scene.add(degrau3);
  j3 = j3 - 1;
  i1 = i1 + 2;
}

//escada que liga cenário inicial ao cenário final

let j4 = -1;
let i2 = -35;

while(j4 > -12 && i2 > -80)
{
  const degrau4 = new THREE.Mesh(
    new THREE.BoxGeometry(2,1,6),
    new THREE.MeshPhongMaterial({color: 0xB8B1AC}),
  );
  degrau4.position.set(i2, j4, 0);
  degrau4.castShadow = true;
  degrau4.receiveShadow = true;
  scene.add(degrau4);
  j4 = j4 - 1;
  i2 = i2 - 2;
}

var man = null;
var clock = new THREE.Clock();
let camUp   = new THREE.Vector3(0.0, 1.0, 0.0);
var val = new Boolean(false);
var control = new Boolean(false);
var message = new SecondaryBox("");
var objectsWorldPosition = new THREE.Vector3();
const axesHelper = new THREE.AxesHelper(5);
let perspectiveCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
let orthographicCamera = new THREE.OrthographicCamera( 80 / - 2, 80 / 2, 40 / 2, 40 / - 2, 0.1, 1000 );
camera = perspectiveCamera;
let stop = false;

/****LOADING SCREEN */

let audioLoader, audioPath, r2d2;

const loadingManager = new THREE.LoadingManager( () => {
  let loadingScreen = document.getElementById( 'loading-screen' );
  loadingScreen.transition = 0;
   
  let button  = document.getElementById("myBtn")
  button.style.backgroundColor = 'Green';
  button.innerHTML = 'START GAME';
  button.addEventListener("click", onButtonPressed);
});

loadAudio(loadingManager, 'assets/sound/majula.mp3');
loadGLTFFile('assets/objects/walkingMan.glb', false);
loadGLTFObject(loadingManager, 'assets/objects/torch/scene.gltf');

render();

function loadGLTFObject(manager, object)
{
  var loader1 = new GLTFLoader( manager );
  var loader2 = new GLTFLoader( manager );

  loader1.load( object, function ( gltf ) {
    const torch1 = gltf.scene;
    torch1.position.set(-34.25,1,6.75);
    gltf.scene.scale.set(2, 2, 2);
    torch1.rotateY(90);
    scene.add (torch1);
  }, null, null);

  loader2.load( object, function ( gltf ) {
    const torch2 = gltf.scene;
    torch2.position.set(-34.25,1,-7.25);
    gltf.scene.scale.set(2, 2, 2);
    torch2.rotateY(90);
    scene.add (torch2);
  }, null, null);

}

function loadGLTFFile(modelName, centerObject)
{
  var loader = new GLTFLoader( );
  loader.load( modelName, function ( gltf ) {
    var obj = gltf.scene;
    obj.traverse( function ( child ) {
      if ( child ) {
          child.castShadow = true;
      }
    });
    obj.traverse( function( node )
    {
      if( node.material ) node.material.side = THREE.DoubleSide;
    });

    if(centerObject)
    {
        obj = normalizeAndRescale(obj, 2);
        obj = fixPosition(obj);
    }
    else {
      man = obj;
    }
    obj.position.set(0, 0 ,0);
    obj.getWorldPosition(objectsWorldPosition);
    obj.rotation.set(0,1,0);
    oldPosition.copy(man.position);
    scene.add ( obj );
    
    var mixerLocal = new THREE.AnimationMixer(obj);
    mixerLocal.clipAction( gltf.animations[0] ).play();
    mixer.push(mixerLocal);
    }, onProgress, onError);
}

function onError() { };

function onProgress ( xhr, model ) {
    if ( xhr.lengthComputable ) {
      var percentComplete = xhr.loaded / xhr.total * 100;
    }
}

function normalizeAndRescale(obj, newScale)
{
  var scale = getMaxSize(obj); // Available in 'utils.js'
  obj.scale.set(newScale * (1.0/scale),
                newScale * (1.0/scale),
                newScale * (1.0/scale));
  return obj;
}

function fixPosition(obj)
{
  var box = new THREE.Box3().setFromObject( obj );
  if(box.min.y > 0)
    obj.translateY(-box.min.y);
  else
    obj.translateY(-1*box.min.y);
  return obj;
}

function updateCamera()
{
man.getWorldPosition(objectsWorldPosition);
camera.position.set(objectsWorldPosition.x + 30,objectsWorldPosition.y + 25,objectsWorldPosition.z - 30);
camera.up.copy( camUp );
camera.lookAt(objectsWorldPosition.x,objectsWorldPosition.y,objectsWorldPosition.z);
if(!val){
  camera = orthographicCamera;
} else {
  camera = perspectiveCamera;
  camera.position.set(objectsWorldPosition.x + 30,objectsWorldPosition.y + 25,objectsWorldPosition.z - 30);
  camera.lookAt(objectsWorldPosition.x,objectsWorldPosition.y,objectsWorldPosition.z);
}
scene.add( camera );
message.changeMessage("Posição do boneco: (" + objectsWorldPosition.x  + "," + objectsWorldPosition.y + "," + objectsWorldPosition.z + " verme: " + redKey + "amar: " + yellowKey+ "azul: " + blueKey + ")" );
}

function render()
{
  requestAnimationFrame(render);
  var delta = clock.getDelta(); 
  if(control == true){
    for(var i = 0; i<mixer.length; i++)
    mixer[i].update( delta );
  }
  
  if(caixaVerde1.uuid == "S")
  {
    if(moveCaixaVerde1 <= 1)
    {
      caixaVerde1.position.y = lerp(18, 11, moveCaixaVerde1);
      moveCaixaVerde1 += 0.01;
    }
  }

  if(caixaVerde2.uuid == "S")
  {
    if(moveCaixaVerde2 <= 1)
    {
      caixaVerde2.position.y = lerp(18, 11, moveCaixaVerde2);
      moveCaixaVerde2 += 0.01;
    }
  }

  if(caixaVerde3.uuid == "S")
  {
    if(moveCaixaVerde3 <= 1)
    {
      caixaVerde3.position.y = lerp(18, 11, moveCaixaVerde3);
      moveCaixaVerde3 += 0.01;
    }
  }

  if(caixaVermelha1.uuid == "S")
  {
    if(moveCaixaVermelha1 <= 1)
    {
      caixaVermelha1.position.y = lerp(-20, -10, moveCaixaVermelha1);
      moveCaixaVermelha1 += 0.01;
    }
  }
  
  if(caixaVermelha2.uuid == "S")
  {
    if(moveCaixaVermelha2 <= 1)
    {
      caixaVermelha2.position.y = lerp(-20, -10, moveCaixaVermelha2);
      moveCaixaVermelha2 += 0.01;
    }
  }

  if(clicouCA1 == true)
  {
    if(moveCaixaAmarela1 <= 1)
    {
      caixaAmarela1.position.y = lerp(-20, -10, moveCaixaAmarela1);
      moveCaixaAmarela1 += 0.01;
    }
  }

  if(clicouCA2 == true)
  {
    if(moveCaixaAmarela2 <= 1)
    {
      caixaAmarela2.position.y = lerp(-20, -10, moveCaixaAmarela2);
      moveCaixaAmarela2 += 0.01;
    }
  }

  if(!stop){
    update();
  }
  updateCamera();
  renderer.render(scene, camera);
  renderer.setSize( window.innerWidth, window.innerHeight, false );
}

function update()
{
  if(man.position.y < 0.1 && man.position.y > -0.1){
    dirLight.intensity = 1;
  }

  if(man.position.x< -52 && yellowKey && porta1.position.y > -20){
    porta1.position.y -= 0.03;
    soundDoor.play();
  }

  if(man.position.x> 70 && redKey && porta2.position.y > -30){
    porta2.position.y -= 0.03;
    soundDoor.play();
  }

  if(man.position.z> 49 && blueKey && porta3.position.y > 0){
    soundDoor.play();
    porta3.position.y -= 0.03;
    
  }

  if(clicouCA1 && clicouCA2 && caixaVermelha2.uuid == "S" && caixaVermelha2.uuid == "S" && portaC1.position.y > -30){
    portaC1.position.y -= 0.2;
    scene.add(spotLight1, spotLight2, spotLight3, spotLight4, spotLight5, spotLight6, spotLight7, spotLight8);
  }

  if(caixaVerde1.uuid =="S" && caixaVerde2.uuid =="S" && caixaVerde3.uuid =="S" && portaC2.position.y > 0 ){
    portaC2.position.y -= 0.2;
  }

  if(man.position.x < -70 && man.position.x > -75 && man.position.z> 2.5 && man.position.z < 7.5 && man.position.y > -4){
    scene.add(textMesh, textMesh2);
    stop = true;
  }

  if(man.position.x < 1 && man.position.x > -3 && man.position.y <11.5 && man.position.y > 10 && man.position.z > 131 && man.position.z < 133){
    redKey = true;
    scene.remove(CSGFinal3);
  }

  if(man.position.x < 152 && man.position.x > 148 && man.position.y <-20 && man.position.y > -21 && man.position.z > -3 && man.position.z < 0){
    yellowKey = true;
    scene.remove(CSGFinal2);
  }

  if(man.position.x < 2.4 && man.position.x > -1 && man.position.y <-10 && man.position.y > -11.5 && man.position.z > -142 && man.position.z < -140){
    blueKey = true;
    scene.remove(CSGFinal1);
  }
  var bounds = 
  {
    xMin: cube2.position.x,
    xMax: cube2.position.x,
    yMin: cube2.position.y,
    yMax: cube2.position.y,
    zMin: cube2.position.z,
    zMax: cube2.position.z,
  };
  if(man.position.x > 76 && man.position.x < 78 && man.position.z <-30 && man.position.z > -32){
    scene.add(spotLight1);
    spotLight1.position.set(89,-10,-20);
    spotLight1.target.position.set(89,-19,-20);
    spotLight1.target.updateMatrixWorld();
  }
  if(man.position.x > 76 && man.position.x < 78 && man.position.z < 10 && man.position.z > 8){
    scene.add(spotLight2);
    spotLight2.position.set(115,-10,-25);
    spotLight2.target.position.set(115,-19,-25);
    spotLight2.target.updateMatrixWorld();
  }
  //caixa vermelha 1
  if(man.position.x > 76 && man.position.x < 78 && man.position.z < 21 && man.position.z > 19)
  {
    scene.add(spotLight3);
    spotLight3.position.set(96,-10,0);
    spotLight3.target.position.set(96,-19,0);
    spotLight3.target.updateMatrixWorld();
    caixaVermelha1.visible = true;
    caixaVermelha1.uuid = "S";
  }
  if(man.position.x > 76 && man.position.x < 78 && man.position.z < 32 && man.position.z > 28)
  {
    scene.add(spotLight4);
    spotLight4.position.set(117,-10,-6);
    spotLight4.target.position.set(117,-19,-6);
    spotLight4.target.updateMatrixWorld();
  }
  //caixa vermelha 2
  if(man.position.x > 76 && man.position.x < 78 && man.position.z < -19 && man.position.z > -21)
  {
    scene.add(spotLight5);
    spotLight5.position.set(120,-10,12);
    spotLight5.target.position.set(120,-19,12);
    spotLight5.target.updateMatrixWorld();
    caixaVermelha2.visible = true;
    caixaVermelha2.uuid = "S";
  }
  //caixa amarela 1
  if(man.position.x > 76 && man.position.x < 78 && man.position.z < -9.25 && man.position.z > -11.75)
  {
    scene.add(spotLight6);
    spotLight6.position.set(135,-10,-3);
    spotLight6.target.position.set(135,-19,-3);
    spotLight6.target.updateMatrixWorld();
    caixaAmarela1.visible = true;
    caixaAmarela1.uuid = "S";
  }
  if(man.position.x > 95 && man.position.x < 97 && man.position.z < -34 && man.position.z > -34.5)
  {
    scene.add(spotLight7);
    spotLight7.position.set(117,-10,-15);
    spotLight7.target.position.set(117,-19,-15);
    spotLight7.target.updateMatrixWorld();
  }
  //caixa amarela 2
  if(man.position.x > 133 && man.position.x < 135 && man.position.z < -34 && man.position.z > -34.5)
  {
    scene.add(spotLight8);
    spotLight8.position.set(130,-10,-20);
    spotLight8.target.position.set(130,-19,-20);
    spotLight8.target.updateMatrixWorld();
    caixaAmarela2.visible = true;
    caixaAmarela2.uuid = "S";
  }
  if(keyboard.pressed("A")||keyboard.pressed("left"))
  {
    if
      ( 
        (((bounds.xMin < collisions[0].xMax) && (bounds.xMin > collisions[0].xMin) && (bounds.zMax > collisions[0].zMin - 1) && (bounds.zMin < collisions[0].zMax )) ||  ((bounds.zMin < collisions[0].zMax) && (bounds.zMin > collisions[0].zMin) && (bounds.xMax > collisions[0].xMin - 1) && (bounds.xMin < collisions[0].xMax))) ||
        (((bounds.xMin < collisions[1].xMax) && (bounds.xMin > collisions[1].xMin) && (bounds.zMax > collisions[1].zMin - 1) && (bounds.zMin < collisions[1].zMax )) ||  ((bounds.zMin < collisions[1].zMax) && (bounds.zMin > collisions[1].zMin) && (bounds.xMax > collisions[1].xMin - 1) && (bounds.xMin < collisions[1].xMax))) ||
        (((bounds.xMin < collisions[2].xMax) && (bounds.xMin > collisions[2].xMin) && (bounds.zMax > collisions[2].zMin - 1) && (bounds.zMin < collisions[2].zMax )) ||  ((bounds.zMin < collisions[2].zMax) && (bounds.zMin > collisions[2].zMin) && (bounds.xMax > collisions[2].xMin - 1) && (bounds.xMin < collisions[2].xMax))) ||
        (((bounds.xMin < collisions[3].xMax) && (bounds.xMin > collisions[3].xMin) && (bounds.zMax > collisions[3].zMin - 1) && (bounds.zMin < collisions[3].zMax )) ||  ((bounds.zMin < collisions[3].zMax) && (bounds.zMin > collisions[3].zMin) && (bounds.xMax > collisions[3].xMin - 1) && (bounds.xMin < collisions[3].xMax))) ||
        (((bounds.xMin < collisions[4].xMax) && (bounds.xMin > collisions[4].xMin) && (bounds.zMax > collisions[4].zMin - 1) && (bounds.zMin < collisions[4].zMax )) ||  ((bounds.zMin < collisions[4].zMax) && (bounds.zMin > collisions[4].zMin) && (bounds.xMax > collisions[4].xMin - 1) && (bounds.xMin < collisions[4].xMax))) ||
        (((bounds.xMin < collisions[5].xMax) && (bounds.xMin > collisions[5].xMin) && (bounds.zMax > collisions[5].zMin - 1) && (bounds.zMin < collisions[5].zMax )) ||  ((bounds.zMin < collisions[5].zMax) && (bounds.zMin > collisions[5].zMin) && (bounds.xMax > collisions[5].xMin - 1) && (bounds.xMin < collisions[5].xMax))) ||
        (((bounds.xMin < collisions[6].xMax) && (bounds.xMin > collisions[6].xMin) && (bounds.zMax > collisions[6].zMin - 1) && (bounds.zMin < collisions[6].zMax )) ||  ((bounds.zMin < collisions[6].zMax) && (bounds.zMin > collisions[6].zMin) && (bounds.xMax > collisions[6].xMin - 1) && (bounds.xMin < collisions[6].xMax))) ||
        (((bounds.xMin < collisions[7].xMax) && (bounds.xMin > collisions[7].xMin) && (bounds.zMax > collisions[7].zMin - 1) && (bounds.zMin < collisions[7].zMax )) ||  ((bounds.zMin < collisions[7].zMax) && (bounds.zMin > collisions[7].zMin) && (bounds.xMax > collisions[7].xMin - 1) && (bounds.xMin < collisions[7].xMax))) ||
        (((bounds.xMin < collisions[8].xMax) && (bounds.xMin > collisions[8].xMin) && (bounds.zMax > collisions[8].zMin - 1) && (bounds.zMin < collisions[8].zMax )) ||  ((bounds.zMin < collisions[8].zMax) && (bounds.zMin > collisions[8].zMin) && (bounds.xMax > collisions[8].xMin - 1) && (bounds.xMin < collisions[8].xMax))) ||
        (((bounds.xMin < collisions[9].xMax) && (bounds.xMin > collisions[9].xMin) && (bounds.zMax > collisions[9].zMin - 1) && (bounds.zMin < collisions[9].zMax )) ||  ((bounds.zMin < collisions[9].zMax) && (bounds.zMin > collisions[9].zMin) && (bounds.xMax > collisions[9].xMin - 1) && (bounds.xMin < collisions[9].xMax))) ||
        (((bounds.xMin < collisions[10].xMax) && (bounds.xMin > collisions[10].xMin) && (bounds.zMax > collisions[10].zMin - 1) && (bounds.zMin < collisions[10].zMax )) ||  ((bounds.zMin < collisions[10].zMax) && (bounds.zMin > collisions[10].zMin) && (bounds.xMax > collisions[10].xMin - 1) && (bounds.xMin < collisions[10].xMax))) ||
        (((bounds.xMin < collisions[11].xMax) && (bounds.xMin > collisions[11].xMin) && (bounds.zMax > collisions[11].zMin - 1) && (bounds.zMin < collisions[11].zMax )) ||  ((bounds.zMin < collisions[11].zMax) && (bounds.zMin > collisions[11].zMin) && (bounds.xMax > collisions[11].xMin - 1) && (bounds.xMin < collisions[11].xMax))) ||
        (((bounds.xMin < collisions[12].xMax) && (bounds.xMin > collisions[12].xMin) && (bounds.zMax > collisions[12].zMin - 1) && (bounds.zMin < collisions[12].zMax )) ||  ((bounds.zMin < collisions[12].zMax) && (bounds.zMin > collisions[12].zMin) && (bounds.xMax > collisions[12].xMin - 1) && (bounds.xMin < collisions[12].xMax))) ||
        (((bounds.xMin < collisions[13].xMax) && (bounds.xMin > collisions[13].xMin) && (bounds.zMax > collisions[13].zMin - 1) && (bounds.zMin < collisions[13].zMax )) ||  ((bounds.zMin < collisions[13].zMax) && (bounds.zMin > collisions[13].zMin) && (bounds.xMax > collisions[13].xMin - 1) && (bounds.xMin < collisions[13].xMax))) ||
        (((bounds.xMin < collisions[14].xMax) && (bounds.xMin > collisions[14].xMin) && (bounds.zMax > collisions[14].zMin - 1) && (bounds.zMin < collisions[14].zMax )) ||  ((bounds.zMin < collisions[14].zMax) && (bounds.zMin > collisions[14].zMin) && (bounds.xMax > collisions[14].xMin - 1) && (bounds.xMin < collisions[14].xMax))) ||
        (((bounds.xMin < collisions[15].xMax) && (bounds.xMin > collisions[15].xMin) && (bounds.zMax > collisions[15].zMin - 1) && (bounds.zMin < collisions[15].zMax )) ||  ((bounds.zMin < collisions[15].zMax) && (bounds.zMin > collisions[15].zMin) && (bounds.xMax > collisions[15].xMin - 1) && (bounds.xMin < collisions[15].xMax))) ||
        (((bounds.xMin < collisions[16].xMax) && (bounds.xMin > collisions[16].xMin) && (bounds.zMax > collisions[16].zMin - 1) && (bounds.zMin < collisions[16].zMax )) ||  ((bounds.zMin < collisions[16].zMax) && (bounds.zMin > collisions[16].zMin) && (bounds.xMax > collisions[16].xMin - 1) && (bounds.xMin < collisions[16].xMax))) ||
        (((bounds.xMin < collisions[17].xMax) && (bounds.xMin > collisions[17].xMin) && (bounds.zMax > collisions[17].zMin - 1) && (bounds.zMin < collisions[17].zMax )) ||  ((bounds.zMin < collisions[17].zMax) && (bounds.zMin > collisions[17].zMin) && (bounds.xMax > collisions[17].xMin - 1) && (bounds.xMin < collisions[17].xMax))) ||
        (((bounds.xMin < collisions[18].xMax) && (bounds.xMin > collisions[18].xMin) && (bounds.zMax > collisions[18].zMin - 1) && (bounds.zMin < collisions[18].zMax )) ||  ((bounds.zMin < collisions[18].zMax) && (bounds.zMin > collisions[18].zMin) && (bounds.xMax > collisions[18].xMin - 1) && (bounds.xMin < collisions[18].xMax))) ||
        cube2BB.intersectsBox(borda2aBB) || cube2BB.intersectsBox(borda2BB) || cube2BB.intersectsBox(borda4aBB) || cube2BB.intersectsBox(borda4BB) || cube2BB.intersectsBox(borda2ACenario1BB) || cube2BB.intersectsBox(borda2BCenario1BB) || cube2BB.intersectsBox(borda4ACenario1BB) || cube2BB.intersectsBox(borda1CenarioChaveABB) ||
        cube2BB.intersectsBox(borda2ACenario2BB) || cube2BB.intersectsBox(borda2BCenario2BB) || cube2BB.intersectsBox(borda4ACenario2BB) || cube2BB.intersectsBox(borda2ACenario3BB) || cube2BB.intersectsBox(borda4ACenario3BB) || cube2BB.intersectsBox(borda4BCenario3BB) || cube2BB.intersectsBox(borda2ACenario4BB) ||
        cube2BB.intersectsBox(borda3ACenario4BB) || cube2BB.intersectsBox(borda3BCenario4BB)
      )
    {
      cube2.position.z += 0.0;
      man.position.z += 0.0;
      man.rotation.set(0,0.7,0);
      cube2.rotation.set(0,0.7,0);
      cube2BB.setFromObject(cube2);
    }
    else if(man.position.x < -34.25 && man.position.z < 4.75 && man.position.z > -4.75 && man.position.x > -58)
    {
      man.position.x += 0.2;
      cube2.position.x += 0.2;
      if(man.position.y < 0)
      {
        man.position.y += 0.1;
        cube2.position.y += 0.1;
      }
      man.rotation.set(0,0.7,0);
      cube2.rotation.set(0,0.7,0);
      cube2BB.setFromObject(cube2);
    }else if(man.position.x > 145.85 && (!clicouCA1 || !clicouCA2 || caixaVermelha2.uuid == "NS" || caixaVermelha2.uuid == "NS")){
      man.position.x += 0;
      cube2.position.x += 0;
    }else if(man.position.z > 124 && (caixaVerde1.uuid =="NS" || caixaVerde2.uuid =="NS")){
      man.position.z += 0;
      cube2.position.z += 0;
    }
    else if(man.position.z < -34.25 && man.position.x < 4.75 && man.position.x > -4.75 && man.position.z > -57.5)
    {
      //ESCADA AD  
      man.position.z += 0.2;
      cube2.position.z += 0.2;
      if(man.position.y<0)
      {
        man.position.y += 0.1;
        cube2.position.y += 0.1;
      }
      man.rotation.set(0,6,0);
      cube2.rotation.set(0,6,0);
      cube2BB.setFromObject(cube2);
    }
    else if(man.position.x > 34.25 && man.position.z < 4.75 && man.position.z > -4.75 && man.position.x < 76)
    {
     dirLight.intensity -= 0.0035; 
     if(man.position.x > 70 && !redKey){
      man.position.x += 0;
      cube2.position.x += 0;
      man.position.y -= 0;
      cube2.position.y -= 0;
    } else {
      man.position.x += 0.2;
      cube2.position.x += 0.2;
      if(man.position.y > -21)
      {
        man.position.y -= 0.1;
        cube2.position.y -= 0.1;
      } 
      man.rotation.set(0,-4,0);
      cube2.rotation.set(0,-4,0);
      cube2BB.setFromObject(cube2);
    }
    } 
    else if(man.position.z > 35 && man.position.x < 4.75 && man.position.x > -4.75 && man.position.z < 56)
    {
      if(man.position.z > 49 && !blueKey){
        man.position.z += 0;
        cube2.position.z += 0;
        man.position.y += 0;
        cube2.position.y += 0;
      } else {
        man.position.z += 0.2;
        cube2.position.z += 0.2;
        if(man.position.y < 10)
        {
          man.position.y += 0.1;
          cube2.position.y += 0.1;
        }
        man.rotation.set(0,0,0);
        cube2.rotation.set(0,0,0);
        cube2BB.setFromObject(cube2);
      }
    }
    else if(man.position.z > 126 && man.position.z < 142)
    {
      if(cube2BB.intersectsBox(borda1CenarioChaveVBB) || cube2BB.intersectsBox(borda3CenarioChaveVBB))
      {
        man.rotation.set(0,0.7,0);
        cube2.rotation.set(0,0.7,0);
        cube2BB.setFromObject(cube2);
      }
      else
      {
        cube2.position.z += 0.25;
        man.position.z += 0.25;
        cube2.position.x += 0.25;
        man.position.x += 0.25;
        man.rotation.set(0,0.7,0);
        cube2.rotation.set(0,0.7,0);
        cube2BB.setFromObject(cube2);
      }
    }

    else if(man.position.x > 146.5 && man.position.x < 162)
    {
      if(cube2BB.intersectsBox(borda3CenarioChaveYBB) || cube2BB.intersectsBox(borda1CenarioChaveYBB))
      {
        man.rotation.set(0,0.7,0);
        cube2.rotation.set(0,0.7,0);
        cube2BB.setFromObject(cube2);
      }
      else
      {
        cube2.position.z += 0.25;
        man.position.z += 0.25;
        cube2.position.x += 0.25;
        man.position.x += 0.25;
        man.rotation.set(0,0.7,0);
        cube2.rotation.set(0,0.7,0);
        cube2BB.setFromObject(cube2);
      }
    }
    else if(man.position.z < -125 && man.position.z > -134)
    {
      if(man.position.z < -125 && man.position.z >= -128)
      {
        if(ponte1.uuid == "P" && ponte2.uuid == "P")
        {
          cube2.position.z += 0.2;
          man.position.z += 0.2;
          man.rotation.set(0,0,0);
          cube2.rotation.set(0,0,0);
          cube2BB.setFromObject(cube2);
        }
        else
        {
          man.position.x -= 6;
          cube2.position.x -= 6;
          man.position.z -= 6;
          cube2.position.z -= 6; 
          man.rotation.set(0,0,0);
          cube2.rotation.set(0,0,0);
          cube2BB.setFromObject(cube2);
        }
      }
      if(man.position.z < -128 && man.position.z >= -131)
      {
        if(ponte3.uuid == "P" && ponte4.uuid == "P")
        {
          cube2.position.z += 0.2;
          man.position.z += 0.2;
          man.rotation.set(0,0,0);
          cube2.rotation.set(0,0,0);
          cube2BB.setFromObject(cube2);
        }
        else
        {
          man.position.x -= 6;
          cube2.position.x -= 6;
          man.position.z -= 6;
          cube2.position.z -= 6; 
          man.rotation.set(0,0,0);
          cube2.rotation.set(0,0,0);
          cube2BB.setFromObject(cube2);
        }
      }
      if(man.position.z < -131 && man.position.z > -134)
      {
        if(ponte5.uuid == "P" && ponte6.uuid == "P")
        {
          cube2.position.z += 0.2;
          man.position.z += 0.2;
          man.rotation.set(0,0,0);
          cube2.rotation.set(0,0,0);
          cube2BB.setFromObject(cube2);
        }
        else
        {
          man.position.x -= 6;
          cube2.position.x -= 6;
          man.position.z -= 6;
          cube2.position.z -= 6; 
          man.rotation.set(0,0,0);
          cube2.rotation.set(0,0,0);
          cube2BB.setFromObject(cube2);
          
        }
      }
    }
    else
    {
      if(select == true)
      {
        cube2.position.x += 0.25;
        man.position.x += 0.25;
        objectSel.position.x += 0.25;
        cube2.position.z += 0.25;
        man.position.z += 0.25;
        objectSel.position.z += 0.25;
        man.rotation.set(0,0.7,0);
        cube2.rotation.set(0,0.7,0);
        objectSel.rotation.set(0,0.7,0);
        cube2BB.setFromObject(cube2);
      }
      else
      {
        cube2.position.z += 0.25;
        man.position.z += 0.25;
        cube2.position.x += 0.25;
        man.position.x += 0.25;
        man.rotation.set(0,0.7,0);
        cube2.rotation.set(0,0.7,0);
        cube2BB.setFromObject(cube2);
      }
    }
  }
  if(keyboard.pressed("D")||keyboard.pressed("right"))
  {
    if
      ( 
        (((bounds.xMin < collisions[0].xMax) && (bounds.xMin > collisions[0].xMin) && (bounds.zMin < collisions[0].zMax + 1) && (bounds.zMax > collisions[0].zMin)) || ((bounds.zMin < collisions[0].zMax) && (bounds.zMin > collisions[0].zMin) && (bounds.xMin < collisions[0].xMax + 1) && (bounds.xMax > collisions[0].xMin))) || 
        (((bounds.xMin < collisions[1].xMax) && (bounds.xMin > collisions[1].xMin) && (bounds.zMin < collisions[1].zMax + 1) && (bounds.zMax > collisions[1].zMin)) || ((bounds.zMin < collisions[1].zMax) && (bounds.zMin > collisions[1].zMin) && (bounds.xMin < collisions[1].xMax + 1) && (bounds.xMax > collisions[1].xMin))) ||
        (((bounds.xMin < collisions[2].xMax) && (bounds.xMin > collisions[2].xMin) && (bounds.zMin < collisions[2].zMax + 1) && (bounds.zMax > collisions[2].zMin)) || ((bounds.zMin < collisions[2].zMax) && (bounds.zMin > collisions[2].zMin) && (bounds.xMin < collisions[2].xMax + 1) && (bounds.xMax > collisions[2].xMin))) ||
        (((bounds.xMin < collisions[3].xMax) && (bounds.xMin > collisions[3].xMin) && (bounds.zMin < collisions[3].zMax + 1) && (bounds.zMax > collisions[3].zMin)) || ((bounds.zMin < collisions[3].zMax) && (bounds.zMin > collisions[3].zMin) && (bounds.xMin < collisions[3].xMax + 1) && (bounds.xMax > collisions[3].xMin))) ||
        (((bounds.xMin < collisions[4].xMax) && (bounds.xMin > collisions[4].xMin) && (bounds.zMin < collisions[4].zMax + 1) && (bounds.zMax > collisions[4].zMin)) || ((bounds.zMin < collisions[4].zMax) && (bounds.zMin > collisions[4].zMin) && (bounds.xMin < collisions[4].xMax + 1) && (bounds.xMax > collisions[4].xMin))) ||
        (((bounds.xMin < collisions[5].xMax) && (bounds.xMin > collisions[5].xMin) && (bounds.zMin < collisions[5].zMax + 1) && (bounds.zMax > collisions[5].zMin)) || ((bounds.zMin < collisions[5].zMax) && (bounds.zMin > collisions[5].zMin) && (bounds.xMin < collisions[5].xMax + 1) && (bounds.xMax > collisions[5].xMin))) ||
        (((bounds.xMin < collisions[6].xMax) && (bounds.xMin > collisions[6].xMin) && (bounds.zMin < collisions[6].zMax + 1) && (bounds.zMax > collisions[6].zMin)) || ((bounds.zMin < collisions[6].zMax) && (bounds.zMin > collisions[6].zMin) && (bounds.xMin < collisions[6].xMax + 1) && (bounds.xMax > collisions[6].xMin))) ||
        (((bounds.xMin < collisions[7].xMax) && (bounds.xMin > collisions[7].xMin) && (bounds.zMin < collisions[7].zMax + 1) && (bounds.zMax > collisions[7].zMin)) || ((bounds.zMin < collisions[7].zMax) && (bounds.zMin > collisions[7].zMin) && (bounds.xMin < collisions[7].xMax + 1) && (bounds.xMax > collisions[7].xMin))) ||
        (((bounds.xMin < collisions[8].xMax) && (bounds.xMin > collisions[8].xMin) && (bounds.zMin < collisions[8].zMax + 1) && (bounds.zMax > collisions[8].zMin)) || ((bounds.zMin < collisions[8].zMax) && (bounds.zMin > collisions[8].zMin) && (bounds.xMin < collisions[8].xMax + 1) && (bounds.xMax > collisions[8].xMin))) ||
        (((bounds.xMin < collisions[9].xMax) && (bounds.xMin > collisions[9].xMin) && (bounds.zMin < collisions[9].zMax + 1) && (bounds.zMax > collisions[9].zMin)) || ((bounds.zMin < collisions[9].zMax) && (bounds.zMin > collisions[9].zMin) && (bounds.xMin < collisions[9].xMax + 1) && (bounds.xMax > collisions[9].xMin))) ||
        (((bounds.xMin < collisions[10].xMax) && (bounds.xMin > collisions[10].xMin) && (bounds.zMin < collisions[10].zMax + 1) && (bounds.zMax > collisions[10].zMin)) || ((bounds.zMin < collisions[10].zMax) && (bounds.zMin > collisions[10].zMin) && (bounds.xMin < collisions[10].xMax + 1) && (bounds.xMax > collisions[10].xMin))) ||
        (((bounds.xMin < collisions[11].xMax) && (bounds.xMin > collisions[11].xMin) && (bounds.zMin < collisions[11].zMax + 1) && (bounds.zMax > collisions[11].zMin)) || ((bounds.zMin < collisions[11].zMax) && (bounds.zMin > collisions[11].zMin) && (bounds.xMin < collisions[11].xMax + 1) && (bounds.xMax > collisions[11].xMin))) ||
        (((bounds.xMin < collisions[12].xMax) && (bounds.xMin > collisions[12].xMin) && (bounds.zMin < collisions[12].zMax + 1) && (bounds.zMax > collisions[12].zMin)) || ((bounds.zMin < collisions[12].zMax) && (bounds.zMin > collisions[12].zMin) && (bounds.xMin < collisions[12].xMax + 1) && (bounds.xMax > collisions[12].xMin))) ||
        (((bounds.xMin < collisions[13].xMax) && (bounds.xMin > collisions[13].xMin) && (bounds.zMin < collisions[13].zMax + 1) && (bounds.zMax > collisions[13].zMin)) || ((bounds.zMin < collisions[13].zMax) && (bounds.zMin > collisions[13].zMin) && (bounds.xMin < collisions[13].xMax + 1) && (bounds.xMax > collisions[13].xMin))) ||
        (((bounds.xMin < collisions[14].xMax) && (bounds.xMin > collisions[14].xMin) && (bounds.zMin < collisions[14].zMax + 1) && (bounds.zMax > collisions[14].zMin)) || ((bounds.zMin < collisions[14].zMax) && (bounds.zMin > collisions[14].zMin) && (bounds.xMin < collisions[14].xMax + 1) && (bounds.xMax > collisions[14].xMin))) ||
        (((bounds.xMin < collisions[15].xMax) && (bounds.xMin > collisions[15].xMin) && (bounds.zMin < collisions[15].zMax + 1) && (bounds.zMax > collisions[15].zMin)) || ((bounds.zMin < collisions[15].zMax) && (bounds.zMin > collisions[15].zMin) && (bounds.xMin < collisions[15].xMax + 1) && (bounds.xMax > collisions[15].xMin))) ||
        (((bounds.xMin < collisions[16].xMax) && (bounds.xMin > collisions[16].xMin) && (bounds.zMin < collisions[16].zMax + 1) && (bounds.zMax > collisions[16].zMin)) || ((bounds.zMin < collisions[16].zMax) && (bounds.zMin > collisions[16].zMin) && (bounds.xMin < collisions[16].xMax + 1) && (bounds.xMax > collisions[16].xMin))) ||
        (((bounds.xMin < collisions[17].xMax) && (bounds.xMin > collisions[17].xMin) && (bounds.zMin < collisions[17].zMax + 1) && (bounds.zMax > collisions[17].zMin)) || ((bounds.zMin < collisions[17].zMax) && (bounds.zMin > collisions[17].zMin) && (bounds.xMin < collisions[17].xMax + 1) && (bounds.xMax > collisions[17].xMin))) ||
        (((bounds.xMin < collisions[18].xMax) && (bounds.xMin > collisions[18].xMin) && (bounds.zMin < collisions[18].zMax + 1) && (bounds.zMax > collisions[18].zMin)) || ((bounds.zMin < collisions[18].zMax) && (bounds.zMin > collisions[18].zMin) && (bounds.xMin < collisions[18].xMax + 1) && (bounds.xMax > collisions[18].xMin))) ||
        cube2BB.intersectsBox(borda1aBB) || cube2BB.intersectsBox(borda1BB) || cube2BB.intersectsBox(borda3aBB) || cube2BB.intersectsBox(borda3BB) || cube2BB.intersectsBox(borda1ACenario1BB) || cube2BB.intersectsBox(borda1BCenario1BB) || cube2BB.intersectsBox(borda3ACenario1BB) ||cube2BB.intersectsBox(borda2CenarioChaveABB) ||
        cube2BB.intersectsBox(borda3CenarioChaveABB) || cube2BB.intersectsBox(borda1ACenario2BB) || cube2BB.intersectsBox(borda1BCenario2BB) || cube2BB.intersectsBox(borda3ACenario2BB) || cube2BB.intersectsBox(borda1ACenario3BB) || cube2BB.intersectsBox(borda3ACenario3BB) || cube2BB.intersectsBox(borda3BCenario3BB) ||
        cube2BB.intersectsBox(borda1ACenario4BB) || cube2BB.intersectsBox(borda4ACenario4BB)
      )
    {
      cube2.position.z -= 0.0;
      man.position.z -= 0.0;
      cube2.position.x -= 0.0;
      man.position.x -= 0.0;
      man.rotation.set(0,-8.5,0);
      cube2.rotation.set(0,-8.5,0);
      cube2BB.setFromObject(cube2); 
    }
    else if(man.position.x < -34.25 && man.position.z < 4.75 && man.position.z > -4.75 && man.position.x > -58)
    {
      if(man.position.x< -52 && !yellowKey){
        man.position.x -= 0;
        cube2.position.x -= 0;
        man.position.y -= 0;
        cube2.position.y -= 0;
      }else {
        man.position.x -= 0.2;
        cube2.position.x -= 0.2;
        if(man.position.y> -11)
        {
          man.position.y -= 0.1;
          cube2.position.y -= 0.1;
        }
        man.rotation.set(0,-8.5,0);
        cube2.rotation.set(0,-8.5,0);
        cube2BB.setFromObject(cube2);
      }
      
    }
    else if(man.position.z < -34.25 && man.position.x < 4.75 && man.position.x > -4.75 && man.position.z > -58)
    {
      man.position.z -= 0.2;
      cube2.position.z -= 0.2;
      if(man.position.y > -11)
      {
        man.position.y -= 0.1;
        cube2.position.y -= 0.1;
      }
      man.rotation.set(0,-4,0);
      cube2.rotation.set(0,-4,0);
      cube2BB.setFromObject(cube2);
    }
    else if(man.position.x > 34.25 && man.position.z < 4.75 && man.position.z > -4.75 && man.position.x < 76.8)
    {
      dirLight.intensity += 0.0035;
      man.position.x -= 0.2;
      cube2.position.x -= 0.2;
      if(man.position.y < 0)
      {
        man.position.y += 0.1;
        cube2.position.y += 0.1;
      }
      man.rotation.set(0,5.5,0);
      cube2.rotation.set(0,5.5,0);
      cube2BB.setFromObject(cube2);
    } 
    else if(man.position.z > 35 && man.position.x < 4.75 && man.position.x > -4.75 && man.position.z < 56)
    {
      //ESCADA BE   
      man.position.z -= 0.2;
      cube2.position.z -= 0.2;
      if(man.position.y > 0)
      {
        man.position.y -= 0.115;
        cube2.position.y -= 0.115;
      }
      man.rotation.set(0,-3,0);
      cube2.rotation.set(0,-3,0);
      cube2BB.setFromObject(cube2);
    }
    else if(man.position.z > 126 && man.position.z < 142)
    {
      if(cube2BB.intersectsBox(borda2CenarioChaveVBB))
      {
        man.rotation.set(0,-8.5,0);
        cube2.rotation.set(0,-8.5,0);
        cube2BB.setFromObject(cube2);
      }
      else
      {
        cube2.position.z -= 0.25;
        man.position.z -= 0.25;
        cube2.position.x -= 0.25;
        man.position.x -= 0.25;
        man.rotation.set(0,-8.5,0);
        cube2.rotation.set(0,-8.5,0);
        cube2BB.setFromObject(cube2);
      }
    }else if(man.position.x < plane1.position.x + 4.2 && man.position.x > plane1.position.x -8 && man.position.z < plane1.position.z +3 && man.position.z > plane1.position.z -3){
      if(man.position.y < plane1.position.y + 3.5){
        man.position.y +=0.2;
      cube2.position.y += 0.2;
      }
      
      cube2.position.x -= 0.2;
      man.position.x -= 0.2;
      man.rotation.set(0,-1.5,0);
    }

    else if(man.position.x > 146.5 && man.position.x < 162)
    {
      if(cube2BB.intersectsBox(borda2CenarioChaveYBB))
      {
        man.rotation.set(0,-8.5,0);
        cube2.rotation.set(0,-8.5,0);
        cube2BB.setFromObject(cube2); 
      }
      else
      {
        cube2.position.z -= 0.25;
        man.position.z -= 0.25;
        cube2.position.x -= 0.25;
        man.position.x -= 0.25;
        man.rotation.set(0,-8.5,0);
        cube2.rotation.set(0,-8.5,0);
        cube2BB.setFromObject(cube2);
      }
    }
    else if(man.position.z < -125 && man.position.z > -134)
    {
      if(man.position.z < -125 && man.position.z >= -128)
      {
        if(ponte1.uuid == "P" && ponte2.uuid == "P")
        {
          if(select == true)
          {
            cube2.position.z -= 0.2;
            man.position.z -= 0.2;
            objectSel.position.z -= 0.2;
            objectSel.rotation.set(0,-3,0);
            man.rotation.set(0,-3,0);
            cube2.rotation.set(0,-3,0);
            cube2BB.setFromObject(cube2);            
          }
          else
          {
            cube2.position.z -= 0.2;
            man.position.z -= 0.2;
            man.rotation.set(0,-3,0);
            cube2.rotation.set(0,-3,0);
            cube2BB.setFromObject(cube2);
          }
        }
        else
        {
          if(select == true)
          {
            cube2.position.z += 45;
            man.position.z += 45;
            objectSel.position.z += 45;
            man.rotation.set(0,-3,0);
            cube2.rotation.set(0,-3,0);
            cube2BB.setFromObject(cube2);
          }
          else
          {
            cube2.position.z += 45;
            man.position.z += 45;
            man.rotation.set(0,-3,0);
            cube2.rotation.set(0,-3,0);
            cube2BB.setFromObject(cube2);
          }
        }
      }
      if(man.position.z < -128 && man.position.z >= -131)
      {
        if(ponte3.uuid == "P" && ponte4.uuid == "P")
        {
          if(select == true)
          {
            cube2.position.z -= 0.2;
            man.position.z -= 0.2;
            objectSel.position.z -= 0.2;
            objectSel.rotation.set(0,-3,0);
            man.rotation.set(0,-3,0);
            cube2.rotation.set(0,-3,0);
            cube2BB.setFromObject(cube2);            
          }
          else
          {
            cube2.position.z -= 0.2;
            man.position.z -= 0.2;
            man.rotation.set(0,-3,0);
            cube2.rotation.set(0,-3,0);
            cube2BB.setFromObject(cube2);
          }
        }
        else
        {
          if(select == true)
          {
            cube2.position.z += 45;
            man.position.z += 45;
            objectSel.position.z += 45;
            man.rotation.set(0,-3,0);
            cube2.rotation.set(0,-3,0);
            cube2BB.setFromObject(cube2);
          }
          else
          {
            cube2.position.z += 45;
            man.position.z += 45;
            man.rotation.set(0,-3,0);
            cube2.rotation.set(0,-3,0);
            cube2BB.setFromObject(cube2);
          }
        }
      }
      if(man.position.z < -131 && man.position.z > -134)
      {
        if(ponte5.uuid == "P" && ponte6.uuid == "P")
        {
          if(select == true)
          {
            cube2.position.z -= 0.2;
            man.position.z -= 0.2;
            objectSel.position.z -= 0.2;
            objectSel.rotation.set(0,-3,0);
            man.rotation.set(0,-3,0);
            cube2.rotation.set(0,-3,0);
            cube2BB.setFromObject(cube2);            
          }
          else
          {
            cube2.position.z -= 0.2;
            man.position.z -= 0.2;
            man.rotation.set(0,-3,0);
            cube2.rotation.set(0,-3,0);
            cube2BB.setFromObject(cube2);
          }
        }
        else
        {
          if(select == true)
          {
            cube2.position.z += 45;
            man.position.z += 45;
            objectSel.position.z += 45;
            man.rotation.set(0,-3,0);
            cube2.rotation.set(0,-3,0);
            cube2BB.setFromObject(cube2);
          }
          else
          {
            cube2.position.z += 45;
            man.position.z += 45;
            man.rotation.set(0,-3,0);
            cube2.rotation.set(0,-3,0);
            cube2BB.setFromObject(cube2);
          }
        }
      }
    }
    else
    {
      if(select == true)
      {
        cube2.position.x -= 0.25;
        man.position.x -= 0.25;
        objectSel.position.x -= 0.25;
        cube2.position.z -= 0.25;
        man.position.z -= 0.25;
        objectSel.position.z -= 0.25;
        man.rotation.set(0,-8.5,0);
        cube2.rotation.set(0,-8.5,0);
        objectSel.rotation.set(0,-8.5,0);
        cube2BB.setFromObject(cube2);
      }
      else
      {
        cube2.position.z -= 0.25;
        man.position.z -= 0.25;
        cube2.position.x -= 0.25;
        man.position.x -= 0.25;
        man.rotation.set(0,-8.5,0);
        cube2.rotation.set(0,-8.5,0);
        cube2BB.setFromObject(cube2);
      }
    }
  }
  if(keyboard.pressed("W")|| keyboard.pressed("up"))
  {
    if
      ( 
        (((bounds.zMin < collisions[0].zMax) && (bounds.zMin > collisions[0].zMin) && (bounds.xMin < collisions[0].xMax + 1) && (bounds.xMax > collisions[0].xMin)) || ((bounds.xMin < collisions[0].xMax) && (bounds.xMin > collisions[0].xMin) && (bounds.zMax > collisions[0].zMin - 1) && (bounds.zMin < collisions[0].zMax ))) ||
        (((bounds.zMin < collisions[1].zMax) && (bounds.zMin > collisions[1].zMin) && (bounds.xMin < collisions[1].xMax + 1) && (bounds.xMax > collisions[1].xMin)) || ((bounds.xMin < collisions[1].xMax) && (bounds.xMin > collisions[1].xMin) && (bounds.zMax > collisions[1].zMin - 1) && (bounds.zMin < collisions[1].zMax ))) ||
        (((bounds.zMin < collisions[2].zMax) && (bounds.zMin > collisions[2].zMin) && (bounds.xMin < collisions[2].xMax + 1) && (bounds.xMax > collisions[2].xMin)) || ((bounds.xMin < collisions[2].xMax) && (bounds.xMin > collisions[2].xMin) && (bounds.zMax > collisions[2].zMin - 1) && (bounds.zMin < collisions[2].zMax ))) ||
        (((bounds.zMin < collisions[3].zMax) && (bounds.zMin > collisions[3].zMin) && (bounds.xMin < collisions[3].xMax + 1) && (bounds.xMax > collisions[3].xMin)) || ((bounds.xMin < collisions[3].xMax) && (bounds.xMin > collisions[3].xMin) && (bounds.zMax > collisions[3].zMin - 1) && (bounds.zMin < collisions[3].zMax ))) ||
        (((bounds.zMin < collisions[4].zMax) && (bounds.zMin > collisions[4].zMin) && (bounds.xMin < collisions[4].xMax + 1) && (bounds.xMax > collisions[4].xMin)) || ((bounds.xMin < collisions[4].xMax) && (bounds.xMin > collisions[4].xMin) && (bounds.zMax > collisions[4].zMin - 1) && (bounds.zMin < collisions[4].zMax ))) ||
        (((bounds.zMin < collisions[5].zMax) && (bounds.zMin > collisions[5].zMin) && (bounds.xMin < collisions[5].xMax + 1) && (bounds.xMax > collisions[5].xMin)) || ((bounds.xMin < collisions[5].xMax) && (bounds.xMin > collisions[5].xMin) && (bounds.zMax > collisions[5].zMin - 1) && (bounds.zMin < collisions[5].zMax ))) ||
        (((bounds.zMin < collisions[6].zMax) && (bounds.zMin > collisions[6].zMin) && (bounds.xMin < collisions[6].xMax + 1) && (bounds.xMax > collisions[6].xMin)) || ((bounds.xMin < collisions[6].xMax) && (bounds.xMin > collisions[6].xMin) && (bounds.zMax > collisions[6].zMin - 1) && (bounds.zMin < collisions[6].zMax ))) ||
        (((bounds.zMin < collisions[7].zMax) && (bounds.zMin > collisions[7].zMin) && (bounds.xMin < collisions[7].xMax + 1) && (bounds.xMax > collisions[7].xMin)) || ((bounds.xMin < collisions[7].xMax) && (bounds.xMin > collisions[7].xMin) && (bounds.zMax > collisions[7].zMin - 1) && (bounds.zMin < collisions[7].zMax ))) ||
        (((bounds.zMin < collisions[8].zMax) && (bounds.zMin > collisions[8].zMin) && (bounds.xMin < collisions[8].xMax + 1) && (bounds.xMax > collisions[8].xMin)) || ((bounds.xMin < collisions[8].xMax) && (bounds.xMin > collisions[8].xMin) && (bounds.zMax > collisions[8].zMin - 1) && (bounds.zMin < collisions[8].zMax ))) ||
        (((bounds.zMin < collisions[9].zMax) && (bounds.zMin > collisions[9].zMin) && (bounds.xMin < collisions[9].xMax + 1) && (bounds.xMax > collisions[9].xMin)) || ((bounds.xMin < collisions[9].xMax) && (bounds.xMin > collisions[9].xMin) && (bounds.zMax > collisions[9].zMin - 1) && (bounds.zMin < collisions[9].zMax ))) ||
        (((bounds.zMin < collisions[10].zMax) && (bounds.zMin > collisions[10].zMin) && (bounds.xMin < collisions[10].xMax + 1) && (bounds.xMax > collisions[10].xMin)) || ((bounds.xMin < collisions[10].xMax) && (bounds.xMin > collisions[10].xMin) && (bounds.zMax > collisions[10].zMin - 1) && (bounds.zMin < collisions[10].zMax ))) ||
        (((bounds.zMin < collisions[11].zMax) && (bounds.zMin > collisions[11].zMin) && (bounds.xMin < collisions[11].xMax + 1) && (bounds.xMax > collisions[11].xMin)) || ((bounds.xMin < collisions[11].xMax) && (bounds.xMin > collisions[11].xMin) && (bounds.zMax > collisions[11].zMin - 1) && (bounds.zMin < collisions[11].zMax ))) ||
        (((bounds.zMin < collisions[12].zMax) && (bounds.zMin > collisions[12].zMin) && (bounds.xMin < collisions[12].xMax + 1) && (bounds.xMax > collisions[12].xMin)) || ((bounds.xMin < collisions[12].xMax) && (bounds.xMin > collisions[12].xMin) && (bounds.zMax > collisions[12].zMin - 1) && (bounds.zMin < collisions[12].zMax ))) ||
        (((bounds.zMin < collisions[13].zMax) && (bounds.zMin > collisions[13].zMin) && (bounds.xMin < collisions[13].xMax + 1) && (bounds.xMax > collisions[13].xMin)) || ((bounds.xMin < collisions[13].xMax) && (bounds.xMin > collisions[13].xMin) && (bounds.zMax > collisions[13].zMin - 1) && (bounds.zMin < collisions[13].zMax ))) ||
        (((bounds.zMin < collisions[14].zMax) && (bounds.zMin > collisions[14].zMin) && (bounds.xMin < collisions[14].xMax + 1) && (bounds.xMax > collisions[14].xMin)) || ((bounds.xMin < collisions[14].xMax) && (bounds.xMin > collisions[14].xMin) && (bounds.zMax > collisions[14].zMin - 1) && (bounds.zMin < collisions[14].zMax ))) ||
        (((bounds.zMin < collisions[15].zMax) && (bounds.zMin > collisions[15].zMin) && (bounds.xMin < collisions[15].xMax + 1) && (bounds.xMax > collisions[15].xMin)) || ((bounds.xMin < collisions[15].xMax) && (bounds.xMin > collisions[15].xMin) && (bounds.zMax > collisions[15].zMin - 1) && (bounds.zMin < collisions[15].zMax ))) ||
        (((bounds.zMin < collisions[16].zMax) && (bounds.zMin > collisions[16].zMin) && (bounds.xMin < collisions[16].xMax + 1) && (bounds.xMax > collisions[16].xMin)) || ((bounds.xMin < collisions[16].xMax) && (bounds.xMin > collisions[16].xMin) && (bounds.zMax > collisions[16].zMin - 1) && (bounds.zMin < collisions[16].zMax ))) ||
        (((bounds.zMin < collisions[17].zMax) && (bounds.zMin > collisions[17].zMin) && (bounds.xMin < collisions[17].xMax + 1) && (bounds.xMax > collisions[17].xMin)) || ((bounds.xMin < collisions[17].xMax) && (bounds.xMin > collisions[17].xMin) && (bounds.zMax > collisions[17].zMin - 1) && (bounds.zMin < collisions[17].zMax ))) ||
        (((bounds.zMin < collisions[18].zMax) && (bounds.zMin > collisions[18].zMin) && (bounds.xMin < collisions[18].xMax + 1) && (bounds.xMax > collisions[18].xMin)) || ((bounds.xMin < collisions[18].xMax) && (bounds.xMin > collisions[18].xMin) && (bounds.zMax > collisions[18].zMin - 1) && (bounds.zMin < collisions[18].zMax ))) ||
        (cube2BB.intersectsBox(borda2aBB) ||  cube2BB.intersectsBox(borda2BB)  || cube2BB.intersectsBox(borda3BB) || cube2BB.intersectsBox(borda3aBB) || cube2BB.intersectsBox(borda2ACenario1BB) || cube2BB.intersectsBox(borda2BCenario1BB) || cube2BB.intersectsBox(borda3ACenario1BB) || cube2BB.intersectsBox(borda2CenarioChaveABB) ||
        cube2BB.intersectsBox(borda2ACenario2BB) || cube2BB.intersectsBox(borda2BCenario2BB) || cube2BB.intersectsBox(borda3ACenario2BB) || cube2BB.intersectsBox(borda2ACenario3BB) || cube2BB.intersectsBox(borda3ACenario3BB) || cube2BB.intersectsBox(borda3BCenario3BB) || cube2BB.intersectsBox(borda2ACenario4BB) || 
        cube2BB.intersectsBox(borda4ACenario4BB))
      )
    {
      man.rotation.set(0,5.5,0);
      cube2.rotation.set(0,5.5,0);
      cube2BB.setFromObject(cube2);
    } 
    else if(man.position.x < -34.25 && man.position.z < 4.75 && man.position.z > -4.75 && man.position.x > -52.7)
    {
      if(man.position.x< -52 && !yellowKey){
        man.position.x -= 0;
        cube2.position.x -= 0;
        man.position.y -= 0;
        cube2.position.y -= 0;
      } else {
        man.position.x -= 0.2;
        cube2.position.x -= 0.2;
        if(man.position.y> -11){
          man.position.y -= 0.1;
          cube2.position.y -= 0.1;
        }
        man.rotation.set(0,5.5,0);
        cube2.rotation.set(0,5.5,0);
        cube2BB.setFromObject(cube2);
      }
      //ESCADA AE
      
    }
    else if(man.position.z < -34.25 && man.position.x < 4.75 && man.position.x > -4.75 && man.position.z > -57.5)
    {
      //ESCADA AD
      man.position.z += 0.2;
      cube2.position.z += 0.2;
      if(man.position.y<0)
      {
        man.position.y += 0.1;
        cube2.position.y += 0.1;
      }
      man.rotation.set(0,6,0);
      cube2.rotation.set(0,6,0);
      cube2BB.setFromObject(cube2);
    }else if(man.position.z > 124 && (caixaVerde1.uuid =="NS" || caixaVerde2.uuid =="NS" || caixaVerde3.uuid =="NS")){
      man.position.z += 0;
      cube2.position.z += 0;
    }
    else if(man.position.x > 34.25 && man.position.z < 4.75 && man.position.z > -4.75 && man.position.x < 76.8 )
    {
      //ESCADA BD
      dirLight.intensity += 0.0035; 
      man.position.x -= 0.2;
      cube2.position.x -= 0.2;
      if(man.position.y < 0)
      {
        man.position.y += 0.1;
        cube2.position.y += 0.1;
      }
      man.rotation.set(0,5.5,0);
      cube2.rotation.set(0,5.5,0);
      cube2BB.setFromObject(cube2);
    }else if(man.position.x < plane1.position.x + 4.2 && man.position.x > plane1.position.x -8 && man.position.z < plane1.position.z +3 && man.position.z > plane1.position.z -3){
      if(man.position.y < plane1.position.y + 3.5){
        man.position.y +=0.2;
      cube2.position.y += 0.2;
      }
      
      cube2.position.x -= 0.2;
      man.position.x -= 0.2;
      man.rotation.set(0,-1.5,0);
    }
    else if(man.position.z > 35 && man.position.x < 4.75 && man.position.x > -4.75 && man.position.z < 56)
    {
      if(man.position.z > 49 && !blueKey){
        man.position.z += 0;
        cube2.position.z += 0;
        man.position.y += 0;
        cube2.position.y += 0;
      } else {
        man.position.z += 0.2;
        cube2.position.z += 0.2;
        if(man.position.y < 10)
        {
          man.position.y += 0.1;
          cube2.position.y += 0.1;
        }
        man.rotation.set(0,0,0);
        cube2.rotation.set(0,0,0);
        cube2BB.setFromObject(cube2);
      }
      
    }
    else if(man.position.z > 126 && man.position.z < 142)
    {
      if(cube2BB.intersectsBox(borda2CenarioChaveVBB) || cube2BB.intersectsBox(borda3CenarioChaveVBB))
      {
        man.rotation.set(0,5.5,0);
        cube2.rotation.set(0,5.5,0);
        cube2BB.setFromObject(cube2);
      }
      else
      {
        cube2.position.x -= 0.25;
        man.position.x -= 0.25;
        cube2.position.z += 0.25;
        man.position.z += 0.25;
        man.rotation.set(0,5.5,0);
        cube2.rotation.set(0,5.5,0);
        cube2BB.setFromObject(cube2);
      }
    }
    else if(man.position.x > 146.5 && man.position.x < 162)
    {
      if(cube2BB.intersectsBox(borda3CenarioChaveYBB))
      {
        man.rotation.set(0,5.5,0);
        cube2.rotation.set(0,5.5,0);
        cube2BB.setFromObject(cube2);
      }
      else
      {
        cube2.position.x -= 0.25;
        man.position.x -= 0.25;
        cube2.position.z += 0.25;
        man.position.z += 0.25;
        man.rotation.set(0,5.5,0);
        cube2.rotation.set(0,5.5,0);
        cube2BB.setFromObject(cube2);
      }
    }
    else if(man.position.z < -125 && man.position.z > -134)
    {
      if(man.position.z < -125 && man.position.z >= -128)
      {
        if(ponte1.uuid == "P" && ponte2.uuid == "P")
        {
          cube2.position.z += 0.2;
          man.position.z += 0.2;
          man.rotation.set(0,0,0);
          cube2.rotation.set(0,0,0);
          cube2BB.setFromObject(cube2);
        }
        else
        {
          man.rotation.set(0,0,0);
          cube2.rotation.set(0,0,0);
          cube2BB.setFromObject(cube2);
        }
      }
      if(man.position.z < -128 && man.position.z >= -131)
      {
        if(ponte3.uuid == "P" && ponte4.uuid == "P")
        {
          cube2.position.z += 0.2;
          man.position.z += 0.2;
          man.rotation.set(0,0,0);
          cube2.rotation.set(0,0,0);
          cube2BB.setFromObject(cube2);
        }
        else
        {
          man.rotation.set(0,0,0);
          cube2.rotation.set(0,0,0);
          cube2BB.setFromObject(cube2);
        }
      }
      if(man.position.z < -131 && man.position.z > -134)
      {
        if(ponte5.uuid == "P" && ponte6.uuid == "P")
        {
          cube2.position.z += 0.2;
          man.position.z += 0.2;
          man.rotation.set(0,0,0);
          cube2.rotation.set(0,0,0);
          cube2BB.setFromObject(cube2);
        }
        else
        {
          man.rotation.set(0,0,0);
          cube2.rotation.set(0,0,0);
          cube2BB.setFromObject(cube2);
        }
      }
    }
    else
    {
      if(select == true)
      {
        cube2.position.x -= 0.25;
        man.position.x -= 0.25;
        objectSel.position.x -= 0.25;
        cube2.position.z += 0.25;
        man.position.z += 0.25;
        objectSel.position.z += 0.25;
        man.rotation.set(0,5.5,0);
        cube2.rotation.set(0,5.5,0);
        objectSel.rotation.set(0,5.5,0);
        cube2BB.setFromObject(cube2);
      }
      else
      {
      cube2.position.x -= 0.25;
      man.position.x -= 0.25;
      cube2.position.z += 0.25;
      man.position.z += 0.25;
      man.rotation.set(0,5.5,0);
      cube2.rotation.set(0,5.5,0);
      cube2BB.setFromObject(cube2);
      }
    }
  }
  if(keyboard.pressed("S")||keyboard.pressed("down"))
  {
    if
      ( 
        (((bounds.zMin < collisions[0].zMax) && (bounds.zMin > collisions[0].zMin) && (bounds.xMax > collisions[0].xMin - 1) && (bounds.xMin < collisions[0].xMax)) || ((bounds.xMin < collisions[0].xMax) && (bounds.xMin > collisions[0].xMin) && (bounds.zMin < collisions[0].zMax + 1) && (bounds.zMax > collisions[0].zMin))) || 
        (((bounds.zMin < collisions[1].zMax) && (bounds.zMin > collisions[1].zMin) && (bounds.xMax > collisions[1].xMin - 1) && (bounds.xMin < collisions[1].xMax)) || ((bounds.xMin < collisions[1].xMax) && (bounds.xMin > collisions[1].xMin) && (bounds.zMin < collisions[1].zMax + 1) && (bounds.zMax > collisions[1].zMin))) ||
        (((bounds.zMin < collisions[2].zMax) && (bounds.zMin > collisions[2].zMin) && (bounds.xMax > collisions[2].xMin - 1) && (bounds.xMin < collisions[2].xMax)) || ((bounds.xMin < collisions[2].xMax) && (bounds.xMin > collisions[2].xMin) && (bounds.zMin < collisions[2].zMax + 1) && (bounds.zMax > collisions[2].zMin))) ||
        (((bounds.zMin < collisions[3].zMax) && (bounds.zMin > collisions[3].zMin) && (bounds.xMax > collisions[3].xMin - 1) && (bounds.xMin < collisions[3].xMax)) || ((bounds.xMin < collisions[3].xMax) && (bounds.xMin > collisions[3].xMin) && (bounds.zMin < collisions[3].zMax + 1) && (bounds.zMax > collisions[3].zMin))) ||
        (((bounds.zMin < collisions[4].zMax) && (bounds.zMin > collisions[4].zMin) && (bounds.xMax > collisions[4].xMin - 1) && (bounds.xMin < collisions[4].xMax)) || ((bounds.xMin < collisions[4].xMax) && (bounds.xMin > collisions[4].xMin) && (bounds.zMin < collisions[4].zMax + 1) && (bounds.zMax > collisions[4].zMin))) ||
        (((bounds.zMin < collisions[5].zMax) && (bounds.zMin > collisions[5].zMin) && (bounds.xMax > collisions[5].xMin - 1) && (bounds.xMin < collisions[5].xMax)) || ((bounds.xMin < collisions[5].xMax) && (bounds.xMin > collisions[5].xMin) && (bounds.zMin < collisions[5].zMax + 1) && (bounds.zMax > collisions[5].zMin))) ||
        (((bounds.zMin < collisions[6].zMax) && (bounds.zMin > collisions[6].zMin) && (bounds.xMax > collisions[6].xMin - 1) && (bounds.xMin < collisions[6].xMax)) || ((bounds.xMin < collisions[6].xMax) && (bounds.xMin > collisions[6].xMin) && (bounds.zMin < collisions[6].zMax + 1) && (bounds.zMax > collisions[6].zMin))) ||
        (((bounds.zMin < collisions[7].zMax) && (bounds.zMin > collisions[7].zMin) && (bounds.xMax > collisions[7].xMin - 1) && (bounds.xMin < collisions[7].xMax)) || ((bounds.xMin < collisions[7].xMax) && (bounds.xMin > collisions[7].xMin) && (bounds.zMin < collisions[7].zMax + 1) && (bounds.zMax > collisions[7].zMin))) ||
        (((bounds.zMin < collisions[8].zMax) && (bounds.zMin > collisions[8].zMin) && (bounds.xMax > collisions[8].xMin - 1) && (bounds.xMin < collisions[8].xMax)) || ((bounds.xMin < collisions[8].xMax) && (bounds.xMin > collisions[8].xMin) && (bounds.zMin < collisions[8].zMax + 1) && (bounds.zMax > collisions[8].zMin))) ||
        (((bounds.zMin < collisions[9].zMax) && (bounds.zMin > collisions[9].zMin) && (bounds.xMax > collisions[9].xMin - 1) && (bounds.xMin < collisions[9].xMax)) || ((bounds.xMin < collisions[9].xMax) && (bounds.xMin > collisions[9].xMin) && (bounds.zMin < collisions[9].zMax + 1) && (bounds.zMax > collisions[9].zMin))) ||
        (((bounds.zMin < collisions[10].zMax) && (bounds.zMin > collisions[10].zMin) && (bounds.xMax > collisions[10].xMin - 1) && (bounds.xMin < collisions[10].xMax)) || ((bounds.xMin < collisions[10].xMax) && (bounds.xMin > collisions[10].xMin) && (bounds.zMin < collisions[10].zMax + 1) && (bounds.zMax > collisions[10].zMin))) ||
        (((bounds.zMin < collisions[11].zMax) && (bounds.zMin > collisions[11].zMin) && (bounds.xMax > collisions[11].xMin - 1) && (bounds.xMin < collisions[11].xMax)) || ((bounds.xMin < collisions[11].xMax) && (bounds.xMin > collisions[11].xMin) && (bounds.zMin < collisions[11].zMax + 1) && (bounds.zMax > collisions[11].zMin))) ||
        (((bounds.zMin < collisions[12].zMax) && (bounds.zMin > collisions[12].zMin) && (bounds.xMax > collisions[12].xMin - 1) && (bounds.xMin < collisions[12].xMax)) || ((bounds.xMin < collisions[12].xMax) && (bounds.xMin > collisions[12].xMin) && (bounds.zMin < collisions[12].zMax + 1) && (bounds.zMax > collisions[12].zMin))) ||
        (((bounds.zMin < collisions[13].zMax) && (bounds.zMin > collisions[13].zMin) && (bounds.xMax > collisions[13].xMin - 1) && (bounds.xMin < collisions[13].xMax)) || ((bounds.xMin < collisions[13].xMax) && (bounds.xMin > collisions[13].xMin) && (bounds.zMin < collisions[13].zMax + 1) && (bounds.zMax > collisions[13].zMin))) ||
        (((bounds.zMin < collisions[14].zMax) && (bounds.zMin > collisions[14].zMin) && (bounds.xMax > collisions[14].xMin - 1) && (bounds.xMin < collisions[14].xMax)) || ((bounds.xMin < collisions[14].xMax) && (bounds.xMin > collisions[14].xMin) && (bounds.zMin < collisions[14].zMax + 1) && (bounds.zMax > collisions[14].zMin))) ||
        (((bounds.zMin < collisions[15].zMax) && (bounds.zMin > collisions[15].zMin) && (bounds.xMax > collisions[15].xMin - 1) && (bounds.xMin < collisions[15].xMax)) || ((bounds.xMin < collisions[15].xMax) && (bounds.xMin > collisions[15].xMin) && (bounds.zMin < collisions[15].zMax + 1) && (bounds.zMax > collisions[15].zMin))) ||
        (((bounds.zMin < collisions[16].zMax) && (bounds.zMin > collisions[16].zMin) && (bounds.xMax > collisions[16].xMin - 1) && (bounds.xMin < collisions[16].xMax)) || ((bounds.xMin < collisions[16].xMax) && (bounds.xMin > collisions[16].xMin) && (bounds.zMin < collisions[16].zMax + 1) && (bounds.zMax > collisions[16].zMin))) ||
        (((bounds.zMin < collisions[17].zMax) && (bounds.zMin > collisions[17].zMin) && (bounds.xMax > collisions[17].xMin - 1) && (bounds.xMin < collisions[17].xMax)) || ((bounds.xMin < collisions[17].xMax) && (bounds.xMin > collisions[17].xMin) && (bounds.zMin < collisions[17].zMax + 1) && (bounds.zMax > collisions[17].zMin))) ||
        (((bounds.zMin < collisions[18].zMax) && (bounds.zMin > collisions[18].zMin) && (bounds.xMax > collisions[18].xMin - 1) && (bounds.xMin < collisions[18].xMax)) || ((bounds.xMin < collisions[18].xMax) && (bounds.xMin > collisions[18].xMin) && (bounds.zMin < collisions[18].zMax + 1) && (bounds.zMax > collisions[18].zMin))) ||
        cube2BB.intersectsBox(borda1aBB) || cube2BB.intersectsBox(borda1BB) || cube2BB.intersectsBox(borda4aBB) || cube2BB.intersectsBox(borda4BB) || cube2BB.intersectsBox(borda1ACenario1BB) || cube2BB.intersectsBox(borda1BCenario1BB) || cube2BB.intersectsBox(borda4ACenario1BB) || cube2BB.intersectsBox(borda1CenarioChaveABB) ||
        cube2BB.intersectsBox(borda3CenarioChaveABB) || cube2BB.intersectsBox(borda1ACenario2BB) || cube2BB.intersectsBox(borda1BCenario2BB) || cube2BB.intersectsBox(borda4ACenario2BB) || cube2BB.intersectsBox(borda1ACenario3BB) || cube2BB.intersectsBox(borda4ACenario3BB) || cube2BB.intersectsBox(borda4BCenario3BB) ||
        cube2BB.intersectsBox(borda3ACenario4BB) || cube2BB.intersectsBox(borda3BCenario4BB) || cube2BB.intersectsBox(borda1ACenario4BB)
      )
    {
      cube2.position.x += 0.0;
      man.position.x += 0.0;
      cube2.position.z += 0.0;
      man.position.z += 0.0;
      man.rotation.set(0,-4,0);
      cube2.rotation.set(0,-4,0);
      cube2BB.setFromObject(cube2);
    } 
    else if(man.position.x < -34.25 && man.position.z < 4.75 && man.position.z > -4.75 && man.position.x > -58)
    {
      man.position.x += 0.2;
      cube2.position.x += 0.2;
      if(man.position.y < 0)
      {
        man.position.y += 0.1;
        cube2.position.y += 0.1;
      }
      man.rotation.set(0,0.7,0);
      cube2.rotation.set(0,0.7,0);
      cube2BB.setFromObject(cube2);
    } else if(man.position.x > 145.85 && (!clicouCA1 || !clicouCA2 || caixaVermelha2.uuid == "NS" || caixaVermelha2.uuid == "NS")){
        man.position.x += 0;
        cube2.position.x += 0;
    }
    else if(man.position.z < -34.25 && man.position.x < 4.75 && man.position.x > -4.75 && man.position.z > -58)
    {
      man.position.z -= 0.2;
      cube2.position.z -= 0.2;
      if(man.position.y > -11)
      {
        man.position.y -= 0.1;
        cube2.position.y -= 0.1;
      }
      man.rotation.set(0,-4,0);
      cube2.rotation.set(0,-4,0);
      cube2BB.setFromObject(cube2);
    }
    else if(man.position.x > 34.25 && man.position.z < 4.75 && man.position.z > -4.75 && man.position.x < 76)
    {
      dirLight.intensity -= 0.0035;
      if(man.position.x > 71 && !redKey){
        man.position.x += 0;
        cube2.position.x += 0;
        man.position.y -= 0;
        cube2.position.y -= 0;
      } else {
        man.position.x += 0.2;
        cube2.position.x += 0.2;
        if(man.position.y > -21)
        {
          man.position.y -= 0.1;
          cube2.position.y -= 0.1;
        } 
        man.rotation.set(0,-4,0);
        cube2.rotation.set(0,-4,0);
        cube2BB.setFromObject(cube2);
      }
      
    }
    else if(man.position.z > 35 && man.position.x < 4.75 && man.position.x > -4.75 && man.position.z < 56)
    {
      //ESCADA BE
      man.position.z -= 0.2;
      cube2.position.z -= 0.2;
      if(man.position.y > 0)
      {
        man.position.y -= 0.115;
        cube2.position.y -= 0.115;
      }
      man.rotation.set(0,-3,0);
      cube2.rotation.set(0,-3,0);
      cube2BB.setFromObject(cube2);
    }
    else if(man.position.z > 126 && man.position.z < 142)
    {
      if(cube2BB.intersectsBox(borda1CenarioChaveVBB))
      {
        man.rotation.set(0,-4,0);
        cube2.rotation.set(0,-4,0);
        cube2BB.setFromObject(cube2);
      }
      else
      {
        cube2.position.x += 0.25;
        man.position.x += 0.25;
        cube2.position.z -= 0.25;
        man.position.z -= 0.25;
        man.rotation.set(0,-4,0);
        cube2.rotation.set(0,-4,0);
        cube2BB.setFromObject(cube2);
      }
    }

    else if(man.position.x > 146.5 && man.position.x < 162)
    {
      if(cube2BB.intersectsBox(borda1CenarioChaveYBB) || cube2BB.intersectsBox(borda2CenarioChaveYBB))
      {
        man.rotation.set(0,-4,0);
        cube2.rotation.set(0,-4,0);
        cube2BB.setFromObject(cube2);
      }
      else
      {
        cube2.position.x += 0.25;
        man.position.x += 0.25;
        cube2.position.z -= 0.25;
        man.position.z -= 0.25;
        man.rotation.set(0,-4,0);
        cube2.rotation.set(0,-4,0);
        cube2BB.setFromObject(cube2);
      }
    }
    else if(man.position.z < -125 && man.position.z > -134)
    {
      if(man.position.z < -125 && man.position.z >= -128)
      {
        if(ponte1.uuid == "P" && ponte2.uuid == "P")
        {
          if(select == true)
          {
            cube2.position.z -= 0.2;
            man.position.z -= 0.2;
            objectSel.position.z -= 0.2;
            man.rotation.set(0,-3,0);
            cube2.rotation.set(0,-3,0);
            objectSel.rotation.set(0,-3,0);
            cube2BB.setFromObject(cube2);
          }
          else
          {
            cube2.position.z -= 0.2;
            man.position.z -= 0.2;
            man.rotation.set(0,-3,0);
            cube2.rotation.set(0,-3,0);
            cube2BB.setFromObject(cube2);
          }
        }
        else
        {
          if(select == true)
          {
            cube2.position.z += 45;
            man.position.z += 45;
            objectSel.position.z += 45;
            man.rotation.set(0,-3,0);
            cube2.rotation.set(0,-3,0);
            objectSel.rotation.set(0,-3,0);
            cube2BB.setFromObject(cube2);
          }
          else
          {
            cube2.position.z += 45;
            man.position.z += 45;
            man.rotation.set(0,-3,0);
            cube2.rotation.set(0,-3,0);
            cube2BB.setFromObject(cube2);
          }
        }
      }
      if(man.position.z < -128 && man.position.z >= -131)
      {
        if(ponte3.uuid == "P" && ponte4.uuid == "P")
        {
          if(select == true)
          {
            cube2.position.z -= 0.2;
            man.position.z -= 0.2;
            objectSel.position.z -= 0.2;
            man.rotation.set(0,-3,0);
            cube2.rotation.set(0,-3,0);
            objectSel.rotation.set(0,-3,0);
            cube2BB.setFromObject(cube2);
          }
          else
          {
            cube2.position.z -= 0.2;
            man.position.z -= 0.2;
            man.rotation.set(0,-3,0);
            cube2.rotation.set(0,-3,0);
            cube2BB.setFromObject(cube2);
          }
        }
        else
        {
          if(select == true)
          {
            cube2.position.z += 45;
            man.position.z += 45;
            objectSel.position.z += 45;
            man.rotation.set(0,-3,0);
            cube2.rotation.set(0,-3,0);
            objectSel.rotation.set(0,-3,0);
            cube2BB.setFromObject(cube2);
          }
          else
          {
            cube2.position.z += 45;
            man.position.z += 45;
            man.rotation.set(0,-3,0);
            cube2.rotation.set(0,-3,0);
            cube2BB.setFromObject(cube2);
          }
        }
      }
      if(man.position.z < -131 && man.position.z > -134)
      {
        if(ponte5.uuid == "P" && ponte6.uuid == "P")
        {
          if(select == true)
          {
            cube2.position.z -= 0.2;
            man.position.z -= 0.2;
            objectSel.position.z -= 0.2;
            man.rotation.set(0,-3,0);
            cube2.rotation.set(0,-3,0);
            objectSel.rotation.set(0,-3,0);
            cube2BB.setFromObject(cube2);
          }
          else
          {
            cube2.position.z -= 0.2;
            man.position.z -= 0.2;
            man.rotation.set(0,-3,0);
            cube2.rotation.set(0,-3,0);
            cube2BB.setFromObject(cube2);
          }
        }
        else
        {
          if(select == true)
          {
            cube2.position.z += 45;
            man.position.z += 45;
            objectSel.position.z += 45;
            man.rotation.set(0,-3,0);
            cube2.rotation.set(0,-3,0);
            objectSel.rotation.set(0,-3,0);
            cube2BB.setFromObject(cube2);
          }
          else
          {
            cube2.position.z += 45;
            man.position.z += 45;
            man.rotation.set(0,-3,0);
            cube2.rotation.set(0,-3,0);
            cube2BB.setFromObject(cube2);
          }
        }
      }
    }
    else
    {
      if(select == true)
      {
        objectSel.position.x += 0.25;
        cube2.position.x += 0.25;
        man.position.x += 0.25;
        cube2.position.z -= 0.25;
        man.position.z -= 0.25;
        objectSel.position.z -= 0.25;
        objectSel.rotation.set(0,-4,0);
        man.rotation.set(0,-4,0);
        cube2.rotation.set(0,-4,0);
        cube2BB.setFromObject(cube2);
      }
      else
      {
        cube2.position.x += 0.25;
        man.position.x += 0.25;
        cube2.position.z -= 0.25;
        man.position.z -= 0.25;
        man.rotation.set(0,-4,0);
        cube2.rotation.set(0,-4,0);
        cube2BB.setFromObject(cube2);
      }
    }
  }
  if( (keyboard.pressed("W") && keyboard.pressed("A")) || (keyboard.pressed("left") && keyboard.pressed("up")) )
  {
    if(select == true)
    {
      man.rotation.set(0,0,0);
      cube2.rotation.set(0,0,0);
      objectSel.rotation.set(0,0,0);
      cube2BB.setFromObject(cube2);        
    }
    else
    {
      man.rotation.set(0,0,0);
      cube2.rotation.set(0,0,0);
      cube2BB.setFromObject(cube2);
    }
  }
  if( (keyboard.pressed("W") && keyboard.pressed("D")) || ( keyboard.pressed("up") && (keyboard.pressed("right")) ) )
  {
    if (select == true)
    {
      man.rotation.set(0,-1.5,0);
      cube2.rotation.set(0,-1.5,0);
      objectSel.rotation.set(0,-1.5,0);
      cube2BB.setFromObject(cube2);
    }
    else
    {
      man.rotation.set(0,-1.5,0);
      cube2.rotation.set(0,-1.5,0);
      cube2BB.setFromObject(cube2);
    }
  }
  if( (keyboard.pressed("S") && keyboard.pressed("A")) || ( keyboard.pressed("down") && keyboard.pressed("left"))  )
  {
    if(select == true)
    {
      man.rotation.set(0,1.5,0);
      cube2.rotation.set(0,1.5,0);
      objectSel.rotation.set(0,1.5,0);
      cube2BB.setFromObject(cube2);        
    }
    else
    {
      man.rotation.set(0,1.5,0);
      cube2.rotation.set(0,1.5,0);
      cube2BB.setFromObject(cube2);
    }
  }
  if( (keyboard.pressed("S") && keyboard.pressed("D")) || ( keyboard.pressed("down") && keyboard.pressed("right")) )
  {
    if (select == true)
    {
      man.rotation.set(0,-3,0);
      cube2.rotation.set(0,-3,0);
      objectSel.rotation.set(0,-3,0);
      cube2BB.setFromObject(cube2);
    }
    else
    {
      man.rotation.set(0,-3,0);
      cube2.rotation.set(0,-3,0);
      cube2BB.setFromObject(cube2);
    }
  }
  if(keyboard.pressed("W") || keyboard.pressed("A") || keyboard.pressed("S") || keyboard.pressed("D") || keyboard.pressed("left") || keyboard.pressed("right") || keyboard.pressed("up") || keyboard.pressed("down"))
  {
    control = true;
  } else {
    control = false;
  }
  if(keyboard.down("K")) val = !val;
  keyboard.update();
}
/***START GAME */

function loadAudio(manager, audio)
{
  audioLoader = new THREE.AudioLoader(manager);
  audioPath = audio;
}

function onButtonPressed() {
  const loadingScreen = document.getElementById( 'loading-screen' );
  loadingScreen.transition = 0;
  loadingScreen.classList.add( 'fade-out' );
  loadingScreen.addEventListener( 'transitionend', (e) => {
    const element = e.target;
    element.remove();  
  });  
  
  let sound = new THREE.Audio( new THREE.AudioListener() );
  audioLoader.load( audioPath, function( buffer ) {
    sound.setBuffer( buffer );
    sound.setLoop( true );
    sound.play(); 
  });
}


// função para determinar os delimitadores (bordas) de cada objeto adicionado na cena, será usado para detectar as colisões
function calculateCollisionPoints( mesh, scale, type = 'collision' ) { 
  var bbox = new THREE.Box3().setFromObject(mesh);
 
  var bounds = {
    type: type,
    xMin: bbox.min.x,
    xMax: bbox.max.x,
    yMin: bbox.min.y,
    yMax: bbox.max.y,
    zMin: bbox.min.z,
    zMax: bbox.max.z,
  };
 
  collisions.push(bounds);
}

// cria os cenários do mapa

function createGroundPlaneWired(width, height, widthSegments = 10, heightSegments = 10, lineWidth = 3, gcolor = null, wcolor = null)
{
  if(!gcolor) gcolor = "rgb(5, 194, 215)";
  if(!wcolor) wcolor = "rgb(255, 255, 255)";
  
  //---------------------------------------------------------------------------------------
  // create the ground plane with a grid
  var planeGeometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
    planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
  var planeMaterial = new THREE.MeshPhongMaterial({
    color: gcolor,
    polygonOffset: true,
    polygonOffsetFactor: 1, // positive value pushes polygon further away
    polygonOffsetUnits: 1
  });

  // Create the grid object
  let grid = new Grid(width, height, widthSegments, heightSegments, wcolor, lineWidth);

  let plane = new THREE.Mesh(planeGeometry, planeMaterial);
     plane.receiveShadow = true;  
     plane.rotateX(-Math.PI/2);  

  plane.add(grid); // Add the grid to the plane
  return plane;
}

function createGroundCenario1(width, height, widthSegments = 10, heightSegments = 10, lineWidth = 3, gcolor = null, wcolor = null)
{
  if(!gcolor) gcolor = "rgb(202, 174, 99)";
  if(!wcolor) wcolor = "rgb(150, 150, 150)"
  
  //---------------------------------------------------------------------------------------
  // create the ground plane with a grid
  var planeGeometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
    planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
  var planeMaterial = new THREE.MeshPhongMaterial({
    color: gcolor,
    polygonOffset: true,
    polygonOffsetFactor: 1, // positive value pushes polygon further away
    polygonOffsetUnits: 1
  });

  // Create the grid object
  let grid = new Grid(width, height, widthSegments, heightSegments, wcolor, lineWidth);

  let plane = new THREE.Mesh(planeGeometry, planeMaterial);
     plane.receiveShadow = true;  
     plane.rotateX(-Math.PI/2); 
     
  plane.position.x = 0;
  plane.position.y = -11;
  plane.position.z = -90;
  plane.add(grid); // Add the grid to the plane
  return plane;
}

function createGroundCenario2(width, height, widthSegments = 10, heightSegments = 10, lineWidth = 3, gcolor = null, wcolor = null)
{
  if(!gcolor) gcolor = "rgb(60, 30, 150)";
  if(!wcolor) wcolor = "rgb(150, 150, 150)"
  
  //---------------------------------------------------------------------------------------
  // create the ground plane with a grid
  var planeGeometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
    planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
  var planeMaterial = new THREE.MeshPhongMaterial({
    color: gcolor,
    polygonOffset: true,
    polygonOffsetFactor: 1, // positive value pushes polygon further away
    polygonOffsetUnits: 1
  });

  // Create the grid object
  let grid = new Grid(width, height, widthSegments, heightSegments, wcolor, lineWidth);

  let plane = new THREE.Mesh(planeGeometry, planeMaterial);
     plane.receiveShadow = true;  
     plane.rotateX(-Math.PI/2); 
     
  plane.position.x = 0;
  plane.position.y = 10;
  plane.position.z = 90;
  plane.add(grid); // Add the grid to the plane
  return plane;
}

function createGroundCenario3(width, height, widthSegments = 10, heightSegments = 10, lineWidth = 3, gcolor = null, wcolor = null) {
  if(!gcolor) gcolor = "rgb(228, 51, 51)";
  if(!wcolor) wcolor = "rgb(150, 150, 150)"
  
  //---------------------------------------------------------------------------------------
  // create the ground plane with a grid
  var planeGeometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
    planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
  var planeMaterial = new THREE.MeshPhongMaterial({
    color: gcolor,
    polygonOffset: true,
    polygonOffsetFactor: 1, // positive value pushes polygon further away
    polygonOffsetUnits: 1
  });

  // Create the grid object
  let grid = new Grid(width, height, widthSegments, heightSegments, wcolor, lineWidth);

  let plane = new THREE.Mesh(planeGeometry, planeMaterial);
     plane.receiveShadow = true;  
     plane.rotateX(-Math.PI/2); 
     
  plane.position.x = 111.5;
  plane.position.y = -21;
  plane.position.z = 0;
  plane.add(grid); // Add the grid to the plane
  return plane;
}

function createGroundCenarioFinal(width, height, widthSegments = 10, heightSegments = 10, lineWidth = 3, gcolor = null, wcolor = null) {
  if(!gcolor) gcolor = "rgb(201, 201, 81)";
  if(!wcolor) wcolor = "rgb(150, 150, 150)"
  
  //---------------------------------------------------------------------------------------
  // create the ground plane with a grid
  var planeGeometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
    planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
  var planeMaterial = new THREE.MeshPhongMaterial({
    color: gcolor,
    polygonOffset: true,
    polygonOffsetFactor: 1, // positive value pushes polygon further away
    polygonOffsetUnits: 1
  });

  // Create the grid object
  let grid = new Grid(width, height, widthSegments, heightSegments, wcolor, lineWidth);

  let plane = new THREE.Mesh(planeGeometry, planeMaterial);
     plane.receiveShadow = true;  
     plane.rotateX(-Math.PI/2); 
     
  plane.position.x = -71;
  plane.position.y = -11;
  plane.position.z = 0;
  plane.add(grid); // Add the grid to the plane
  return plane;
}

function createGroundKeyBlue(width, height, widthSegments = 2, heightSegments = 3, lineWidth = 3, gcolor = null, wcolor = null) {
  if(!gcolor) gcolor = "rgb(60, 30, 150)";
  if(!wcolor) wcolor = "rgb(150, 150, 150)"
  
  //---------------------------------------------------------------------------------------
  // create the ground plane with a grid
  var planeGeometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
    planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
  var planeMaterial = new THREE.MeshPhongMaterial({
    color: gcolor,
    polygonOffset: true,
    polygonOffsetFactor: 1, // positive value pushes polygon further away
    polygonOffsetUnits: 1
  });

  // Create the grid object
  let grid = new Grid(width, height, widthSegments, heightSegments, wcolor, lineWidth);

  let plane = new THREE.Mesh(planeGeometry, planeMaterial);
     plane.receiveShadow = true;  
     plane.rotateX(-Math.PI/2); 
  
  plane.position.x = 0;
  plane.position.y = -11;
  plane.position.z = -141.6;

  plane.add(grid); // Add the grid to the plane
  return plane;
}

function createGroundKeyRed(width, height, widthSegments = 3, heightSegments = 2, lineWidth = 3, gcolor = null, wcolor = null)
{
  if(!gcolor) gcolor = "rgb(228, 51, 51)";
  if(!wcolor) wcolor = "rgb(150, 150, 150)"
  
  //---------------------------------------------------------------------------------------
  // create the ground plane with a grid
  var planeGeometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
    planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
  var planeMaterial = new THREE.MeshPhongMaterial({
    color: gcolor,
    polygonOffset: true,
    polygonOffsetFactor: 1, // positive value pushes polygon further away
    polygonOffsetUnits: 1
  });

  // Create the grid object
  let grid = new Grid(width, height, widthSegments, heightSegments, wcolor, lineWidth);

  let plane = new THREE.Mesh(planeGeometry, planeMaterial);
     plane.receiveShadow = true;  
     plane.rotateX(-Math.PI/2); 
     
  plane.position.x = 0;
  plane.position.y = 10;
  plane.position.z = 132.5;
  plane.add(grid); // Add the grid to the plane
  return plane;
}

function createGroundKeyYellow(width, height, widthSegments = 3, heightSegments = 2, lineWidth = 3, gcolor = null, wcolor = null)
{
  if(!gcolor) gcolor = "rgb(201, 201, 81)";
  if(!wcolor) wcolor = "rgb(150, 150, 150)"
  
  //---------------------------------------------------------------------------------------
  // create the ground plane with a grid
  var planeGeometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
    planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
  var planeMaterial = new THREE.MeshPhongMaterial({
    color: gcolor,
    polygonOffset: true,
    polygonOffsetFactor: 1, // positive value pushes polygon further away
    polygonOffsetUnits: 1
  });

  // Create the grid object
  let grid = new Grid(width, height, widthSegments, heightSegments, wcolor, lineWidth);

  let plane = new THREE.Mesh(planeGeometry, planeMaterial);
     plane.receiveShadow = true;  
     plane.rotateX(-Math.PI/2); 
     
  plane.position.x = 154;
  plane.position.y = -20;
  plane.position.z = 0;
  plane.add(grid); // Add the grid to the plane
  return plane;
}

//**************************************************************** */
// IMPLEMENTAÇÃO DO RAYCASTER

function onDocMouseDown(event){
  var xMouse = event.clientX;
  var yMouse = event.clientY;
  var mouse = new THREE.Vector2();

  if(val == false)
  {
    xMouse = (xMouse / window.innerWidth) * 2 - 1;
    yMouse = - (yMouse / window.innerHeight) * 2 + 1;
    
    var vectorClick = new THREE.Vector3(xMouse, yMouse, 0);
    vectorClick = vectorClick.unproject(camera);
  
    var raycaster = new THREE.Raycaster(camera.position, vectorClick.sub(camera.position).normalize());
  }
  else
  {
    xMouse = (xMouse / 80);
    yMouse = - (yMouse / 40);
  
    var vectorClick = new THREE.Vector3(xMouse, yMouse, 1);
    vectorClick = vectorClick.unproject(camera);
  
    var raycaster = new THREE.Raycaster(camera.position, vectorClick.sub(camera.position).normalize());
    raycaster.setFromCamera(mouse, camera);
  }

  var intersects = raycaster.intersectObjects([obj1, obj2, obj3, obj4, obj5, obj6]);
  var intersects_two = raycaster.intersectObjects([ponte1, ponte2, ponte3, ponte4, ponte5, ponte6]);
  var intersects_three = raycaster.intersectObjects([obj7, obj8, obj9, obj10, obj11, obj12]);
  var intersects_four = raycaster.intersectObjects([caixaVerde1T, caixaVerde2T, caixaVerde3T]);
  var intersects_five = raycaster.intersectObjects([caixaAmarela1, caixaAmarela2]);

  //USO DO RAYCASTER PARA SELECIONAR OS CUBOS QUE IRÃO FORMAR A PONTE
  if (intersects.length > 0 && select == false)
  {
    if(intersects[0].object.name == "1")
    {
      if(man.position.z - 4 <= collisions[0].zMax && man.position.z + 4 >= collisions[0].zMin)
      {
        objectSel = intersects[0].object;
        scene.remove(objectSel);
        objectSel = box;
        box.position.set(man.position.x, -9, man.position.z - 4);
        box.rotation.set(man.rotation.x, 0, man.rotation.z);
        scene.add(box);
        select = true;
        collisions[0].zMin = null;
      }
    }
    if(intersects[0].object.name == "2")
    {
      if(man.position.z - 4 <= collisions[1].zMax && man.position.z + 4 >= collisions[1].zMin)
      {
        objectSel = intersects[0].object;
        scene.remove(objectSel);
        objectSel = box;
        box.position.set(man.position.x, -9, man.position.z - 4);
        box.rotation.set(man.rotation.x, 0, man.rotation.z);
        scene.add(box);
        select = true;
        collisions[1].zMin = null;
      }
    }
    if(intersects[0].object.name == "3")
    {
      if(man.position.z - 4 <= collisions[2].zMax && man.position.z + 4 >= collisions[2].zMin)
      {
        objectSel = intersects[0].object;
        scene.remove(objectSel);
        objectSel = box;
        box.position.set(man.position.x, -9, man.position.z - 4);
        box.rotation.set(man.rotation.x, 0, man.rotation.z);
        scene.add(box);
        select = true;
        collisions[2].zMin = null;
      }
    }
    if(intersects[0].object.name == "4")
    {
      if(man.position.z - 4 <= collisions[3].zMax && man.position.z + 4 >= collisions[3].zMin)
      {
        objectSel = intersects[0].object;
        scene.remove(objectSel);
        objectSel = box;
        box.position.set(man.position.x, -9, man.position.z - 4);
        box.rotation.set(man.rotation.x, 0, man.rotation.z);
        scene.add(box);
        select = true;
        collisions[3].zMin = null;
      }
    }
    if(intersects[0].object.name == "5")
    {
      if(man.position.z - 4 <= collisions[4].zMax && man.position.z + 4 >= collisions[4].zMin)
      {
        objectSel = intersects[0].object;
        scene.remove(objectSel);
        objectSel = box;
        box.position.set(man.position.x, -9, man.position.z - 4);
        box.rotation.set(man.rotation.x, 0, man.rotation.z);
        scene.add(box);
        select = true;
        collisions[4].zMin = null;
      }
    }
    if(intersects[0].object.name == "6")
    {
      if(man.position.z - 4 <= collisions[5].zMax && man.position.z + 4 >= collisions[5].zMin)
      {
        objectSel = intersects[0].object;
        scene.remove(objectSel);
        objectSel = box;
        box.position.set(man.position.x, -9, man.position.z - 4);
        box.rotation.set(man.rotation.x, 0, man.rotation.z);
        scene.add(box);
        select = true;
        collisions[5].zMin = null;
      }
    }
  }

  //USO DO RAYCASTER PARA CRIAR A PONTE A PARTIR DOS CUBOS SELECIONADOS ANTES
  if(intersects_two.length > 0 && select == true)
  {
    var aux_objectSel = intersects_two[0].object;
    const ponte = new THREE.Mesh(
      new THREE.BoxGeometry(5,1,3),
      new THREE.MeshPhongMaterial({color: 0xE6C585})
    );

    if(intersects_two[0].object.name == "ponte1")
    {
      if(intersects_two[0].object.uuid == "NP")
      {
        scene.remove(objectSel);
        ponte.position.set(2.5 , -11.5 , -126.5);
        scene.remove(aux_objectSel);
        scene.add(ponte);
        select = false;
        intersects_two[0].object.uuid = "P";
      }
    }
    if(intersects_two[0].object.name == "ponte2")
    {
      if(intersects_two[0].object.uuid == "NP")
      {
        scene.remove(objectSel);
        ponte.position.set(-2.5, -11.5, -126.5);
        scene.remove(aux_objectSel);
        scene.add(ponte);
        select = false;
        intersects_two[0].object.uuid = "P";
      }
    }
    if(intersects_two[0].object.name == "ponte3")
    {
      if(intersects_two[0].object.uuid == "NP")
      {
        scene.remove(objectSel);
        ponte.position.set(2.5, -11.5, -129.5);
        scene.remove(aux_objectSel);
        scene.add(ponte);
        select = false;
        intersects_two[0].object.uuid = "P";
      }
    }
    if(intersects_two[0].object.name == "ponte4")
    {
      if(intersects_two[0].object.uuid == "NP")
      {
        scene.remove(objectSel);
        ponte.position.set(-2.5, -11.5, -129.5);
        scene.remove(aux_objectSel);
        scene.add(ponte);
        select = false;
        intersects_two[0].object.uuid = "P";
      }
    }
    if(intersects_two[0].object.name == "ponte5")
    {
      if(intersects_two[0].object.uuid == "NP")
      {
        scene.remove(objectSel);
        ponte.position.set(2.5, -11.5, -132.5);
        scene.remove(aux_objectSel);
        scene.add(ponte);
        select = false;
        intersects_two[0].object.uuid = "P";
      }
    }
    if(intersects_two[0].object.name == "ponte6")
    {
      if(intersects_two[0].object.uuid == "NP")
      {
        scene.remove(objectSel);
        ponte.position.set(-2.5, -11.5, -132.5);
        scene.remove(aux_objectSel);
        scene.add(ponte);
        select = false;
        intersects_two[0].object.uuid = "P";
      }
    }
  }

  //USO DO RAYCASTER PARA SELECIONAR OS CUBOS DO CENÁRIO 2
  if(intersects_three.length > 0 && select == false)
  {
    const box2 = new THREE.Mesh(
      new THREE.BoxGeometry(2,2,2),
      new THREE.MeshPhongMaterial({color: 0xF0761C})
    );
    if(intersects_three[0].object.name == "7")
    {
      if(man.position.z + 6 >= collisions[6].zMax && man.position.z - 6 <= collisions[6].zMax)
      {
        //console.log("clicou em uma caixa");
        objectSel = intersects_three[0].object;
        scene.remove(objectSel);
        objectSel = box2;
        box2.position.set(man.position.x, 12, man.position.z + 3);
        box2.rotation.set(man.rotation.x, 0, man.rotation.z);
        scene.add(box2);
        select = true;
        collisions[6].zMax = null;
      }
    }
    if(intersects_three[0].object.name == "8")
    {
      if(man.position.z + 6 >= collisions[7].zMax && man.position.z - 6 <= collisions[7].zMax)
      {
        objectSel = intersects_three[0].object;
        scene.remove(objectSel);
        objectSel = box2;
        box2.position.set(man.position.x, 12, man.position.z + 3);
        box2.rotation.set(man.rotation.x, 0, man.rotation.z);
        scene.add(box2);
        select = true;
        collisions[7].zMax = null;
      }
    }
    if(intersects_three[0].object.name == "9")
    {
      if(man.position.z + 6 >= collisions[8].zMax && man.position.z - 6 <= collisions[8].zMax)
      {
        objectSel = intersects_three[0].object;
        scene.remove(objectSel);
        objectSel = box2;
        box2.position.set(man.position.x, 12, man.position.z + 3);
        box2.rotation.set(man.rotation.x, 0, man.rotation.z);
        scene.add(box2);
        select = true;
        collisions[8].zMax = null;
      }
    }
    if(intersects_three[0].object.name == "10")
    {
      if(man.position.z + 6 >= collisions[9].zMax && man.position.z - 6 <= collisions[9].zMax)
      {
        objectSel = intersects_three[0].object;
        scene.remove(objectSel);
        objectSel = box2;
        box2.position.set(man.position.x, 12, man.position.z + 3);
        box2.rotation.set(man.rotation.x, 0, man.rotation.z);
        scene.add(box2);
        select = true;
        collisions[9].zMax = null;
      }
    }
    if(intersects_three[0].object.name == "11")
    {
      if(man.position.z + 6 >= collisions[10].zMax && man.position.z - 6 <= collisions[10].zMax)
      {
        objectSel = intersects_three[0].object;
        scene.remove(objectSel);
        objectSel = box2;
        box2.position.set(man.position.x, 12, man.position.z + 3);
        box2.rotation.set(man.rotation.x, 0, man.rotation.z);
        scene.add(box2);
        select = true;
        collisions[10].zMax = null;
      }
    }
    if(intersects_three[0].object.name == "12")
    {
      if(man.position.z + 6 >= collisions[11].zMax && man.position.z - 6 <= collisions[11].zMax)
      {
        objectSel = intersects_three[0].object;
        scene.remove(objectSel);
        objectSel = box2;
        box2.position.set(man.position.x, 12, man.position.z + 3);
        box2.rotation.set(man.rotation.x, 0, man.rotation.z);
        scene.add(box2);
        select = true;
        collisions[11].zMax = null;
      }
    }
  }

  //USO DO RAYCASTER PARA COLOCAR OS CUBOS SELECIONADOS NOS PONTOS COM CUBOS VERDES
  if(intersects_four.length > 0 && select == true)
  {
    var aux_objectSel = intersects_four[0].object;

    if(intersects_four[0].object.name == "CV1T")
    {
      if(intersects_four[0].object.uuid == "NS")
      {
        scene.remove(objectSel);
        select = false;
        caixaVerde1.uuid = "S";
      }
    }
    if(intersects_four[0].object.name == "CV2T")
    {
      if(intersects_four[0].object.uuid == "NS")
      {
        scene.remove(objectSel);
        select = false;
        caixaVerde2.uuid = "S";
      }
    }
    if(intersects_four[0].object.name == "CV3T")
    {
      if(intersects_four[0].object.uuid == "NS")
      {
        scene.remove(objectSel);
        select = false;
        caixaVerde3.uuid = "S";
      }
    }
  }

  //ACIONAR CAIXA AMARELA NO CENÁRIO 3
  if(intersects_five.length > 0)
  {
    if(intersects_five[0].object.name == "caixaA1")
    {
      if(caixaAmarela1.uuid == "S")
      {
        clicouCA1 = true;
      }
    }
    if(intersects_five[0].object.name == "caixaA2")
    {
      if(caixaAmarela2.uuid == "S")
      {
        clicouCA2 = true;
      }
    }
  }
}

function onDocMouseMove(event){

}

function lerp(min, max, value)
{
  return (max - min) * value + min;
}