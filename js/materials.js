var mlib;
function Material_Lib(){

	var texture01 = THREE.ImageUtils.loadTexture( "textures/tex01.png" );
	texture01.repeat.set( 1, 1 );
	var texture02 = THREE.ImageUtils.loadTexture( "textures/tex02.png" );texture02.repeat.set( 1, 1 );
	var texture03 = THREE.ImageUtils.loadTexture( "textures/tex03.png" );texture03.repeat.set( 1, 1 );
	var texture04 = THREE.ImageUtils.loadTexture( "textures/tex04.png" );texture04.repeat.set( 1, 1 );
	
	var texture05 = THREE.ImageUtils.loadTexture( "textures/grid01.jpg" );//texture04.repeat.set( 1, 1 );
	var texture06 = THREE.ImageUtils.loadTexture( "textures/grid01.png" );//texture04.repeat.set( 1, 1 );


	// common materials

	mlib = {
	"tex1": 	new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, map: texture01 } ),
	"tex2": 	new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, map: texture02 } ),
	"tex3": 	new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, map: texture03 } ),
	"tex4": 	new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, map: texture04 } ),
	"tex5": 	new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, map: texture05 } ),
	"tex6": 	new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, map: texture06 } ),
	"Orange": 	new THREE.MeshLambertMaterial( { color: 0xff6600, combine: THREE.MixOperation, reflectivity: 0.3 } ),
	"Blue": 	new THREE.MeshLambertMaterial( { color: 0x001133, combine: THREE.MixOperation, reflectivity: 0.3 } ),
	"Red": 		new THREE.MeshLambertMaterial( { color: 0x660000, combine: THREE.MixOperation, reflectivity: 0.25 } ),
	"Black": 	new THREE.MeshLambertMaterial( { color: 0x000000, combine: THREE.MixOperation, reflectivity: 0.15 } ),
	"White":	new THREE.MeshLambertMaterial( { color: 0xffffff, combine: THREE.MixOperation, reflectivity: 0.25 } ),

	"Carmine": 	new THREE.MeshPhongMaterial( { color: 0x770000, specular:0xffaaaa, combine: THREE.MultiplyOperation } ),
	"Gold": 	new THREE.MeshPhongMaterial( { color: 0xaa9944, specular:0xbbaa99, shininess:50, combine: THREE.MultiplyOperation } ),
	"Bronze":	new THREE.MeshPhongMaterial( { color: 0x150505, specular:0xee6600, shininess:10, combine: THREE.MixOperation, reflectivity: 0.25 } ),
	"Chrome": 	new THREE.MeshPhongMaterial( { color: 0xffffff, specular:0xffffff, combine: THREE.MultiplyOperation } ),

	"Orange metal": new THREE.MeshLambertMaterial( { color: 0xff6600, combine: THREE.MultiplyOperation } ),
	"Blue metal": 	new THREE.MeshLambertMaterial( { color: 0x001133, combine: THREE.MultiplyOperation } ),
	"Red metal": 	new THREE.MeshLambertMaterial( { color: 0x770000, combine: THREE.MultiplyOperation } ),
	"Green metal": 	new THREE.MeshLambertMaterial( { color: 0x007711, combine: THREE.MultiplyOperation } ),
	"Black metal":	new THREE.MeshLambertMaterial( { color: 0x222222, combine: THREE.MultiplyOperation } ),

	"Pure chrome": 	new THREE.MeshLambertMaterial( { color: 0xffffff  } ),
	"Dark chrome":	new THREE.MeshLambertMaterial( { color: 0x444444 } ),
	"Darker chrome":new THREE.MeshLambertMaterial( { color: 0x222222  } ),

	"Black glass": 	new THREE.MeshLambertMaterial( { color: 0x101016, opacity: 0.975, transparent: true } ),
	"Dark glass":	new THREE.MeshLambertMaterial( { color: 0x101046, opacity: 0.25, transparent: true } ),
	"Blue glass":	new THREE.MeshLambertMaterial( { color: 0x668899, opacity: 0.75, transparent: true } ),
	"Light glass":	new THREE.MeshBasicMaterial( { color: 0x223344, opacity: 0.25, transparent: true, combine: THREE.MixOperation, reflectivity: 0.25 } ),

	"Red glass":	new THREE.MeshLambertMaterial( { color: 0xff0000, opacity: 0.75, transparent: true } ),
	"Yellow glass":	new THREE.MeshLambertMaterial( { color: 0xffffaa, opacity: 0.75, transparent: true } ),
	"Orange glass":	new THREE.MeshLambertMaterial( { color: 0x995500, opacity: 0.75, transparent: true } ),

	"Orange glass 50":	new THREE.MeshLambertMaterial( { color: 0xffbb00, opacity: 0.5, transparent: true } ),
	"Red glass 50": 	new THREE.MeshLambertMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } ),

	"Fullblack rough":	new THREE.MeshLambertMaterial( { color: 0x000000 } ),
	"Black rough":		new THREE.MeshLambertMaterial( { color: 0x050505 } ),
	"Darkgray rough":	new THREE.MeshLambertMaterial( { color: 0x090909 } ),
	"Red rough":		new THREE.MeshLambertMaterial( { color: 0x330500 } ),

	"Darkgray shiny":	new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x050505 } ),
	"Gray shiny":		new THREE.MeshPhongMaterial( { color: 0x050505, shininess: 20 } )

	};
}