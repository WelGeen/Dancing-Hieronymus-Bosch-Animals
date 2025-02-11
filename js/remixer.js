// copyright &copy; 2013 Jaanga authors ~ MIT License

// Thank you, Saqoosha ~ http://saqoo.sh/a/
	var urlsHeads = [
		"./models/dae/Head/head 01.txt", 
		"./models/dae/Head/head 02.txt", 
		"./models/dae/Head/head 03.txt",
		"./models/dae/Head/head 04.txt"
	];
	var  urlsChests = [
		"./models/dae/Chest/chest01.txt", 
		"./models/dae/Chest/chest02.txt",  
		"./models/dae/Chest/chest03.txt", 
		"./models/dae/Chest/chest04.txt"
	];
	var  urlsLegs = [
		"./models/dae/Leg/leg 01.txt", 
		"./models/dae/Leg/leg 02.txt"
	];


	var xmlhttp,controls;
	var reader = new FileReader();
	var BVH_LIST = [];
	var objects = [];
	var BVH_Total = 1;
	var DAE_obj = [];
	var frame;

	var frame = 0;
	function getRandomColor() {
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	}
	function randomKey(obj) {
		var ret;
		var c = 0;
		for (var key in obj)
			if (Math.random() < 1/++c)
			   ret = key;
		return ret;
	}

	
	function readText( that ){
		if ( that.files && that.files[0] ){
			var reader = new FileReader();
			reader.onload = function (event) {
				if ( scene.children.length > 1 ) {
					scene.remove( scene.children[2] );
				}
				var data = event.target.result;
				
				for (var xx=0; xx<BVH_Total; xx++){
					BVH_LIST[xx].parseData ( data );
				}
			};
			reader.readAsText(that.files[0]);
		}
	}

	function requestFile( fname ) {
		dataPlay = false;
		xmlhttp = new XMLHttpRequest();
		xmlhttp.open( 'GET', fname, true );
		xmlhttp.onreadystatechange = callbackFile;
		xmlhttp.send( null );
		callbackCount = 0;
	}

	function callbackFile() {
		if ( xmlhttp.readyState == 4  ) {
			if ( scene.children.length > 1 ) {
				//scene.remove( scene.children[3] );
			}
			var data = xmlhttp.responseText;
			for (var xx=0; xx<BVH_Total; xx++){
				BVH_LIST[xx].parseData ( data );
			}	
		} 
		create();
	}
	
	function test(){
			
		for (var key=0; key<BVH_Total; key++){
	
		BVH_LIST[key] = {};
		BVH_LIST[key].parseData = function ( data ) {

		material = mlib[randomKey(mlib)];
		
		var _this = BVH_LIST[this.key];
		_this.data = data.split(/\s+/g);
		_this.channels = [];
		done = false;
		while (!done) {
			switch (_this.data.shift()) {
			case 'ROOT':
				//console.log(_this);
				_this.root = _this.parseNode(_this.data);
				scene.add(_this.root);
				break;
			case 'MOTION':
				_this.data.shift();
				_this.numFrames = parseInt( _this.data.shift() );
				_this.data.shift();
				_this.data.shift();
				_this.secsPerFrame = parseFloat(_this.data.shift());
				done = true;
			}
		}
		
			
		//material = mlib[randomKey(mlib)];
		//_this.root.material = material ;
		_this.startTime = Date.now();
		//animate();
		BVH_LIST[this.key].play = true;
		
		//create_print();
		
    }.bind({key: key});

// copyright &copy; 2013 Jaanga authors ~ MIT License

// Thank you, Saqoosha ~ http://saqoo.sh/a/

	function DefaultNode(obj){
		var geometry = new THREE.BoxGeometry( obj.width/6, obj.height*3, obj.depth/4 );
		material = mlib[randomKey(mlib)];
		var child = new THREE.Mesh(geometry, material);
		//child.castShadow = true;
		return child;
	}
	
	function CreateNode(obj){
			var geometry = new THREE.SphereGeometry(Math.random()*10 , 15, 15, Math.random()*6, Math.random()*6, Math.random()*6, Math.random()*6);
			geometry.applyMatrix( new THREE.Matrix4().makeTranslation( obj.trans[0],obj.trans[1],obj.trans[2] ) );
			
			geometry.dynamic = true;
			var i, j, il, jl;
			for ( i = 0, il = geometry.vertices.length; i < il; i ++ ) {
				//console.log(geometry.vertices[ i ]);
				//geometry.vertices[ i ].x = geometry.vertices[ i ].x + ( Math.random()*10 );
				//geometry.vertices[ i ].y = geometry.vertices[ i ].y + ( Math.random()*2 );
				//geometry.vertices[ i ].z = geometry.vertices[ i ].z + ( Math.random()*10);
			}

			material = mlib[randomKey(mlib)];
			node = new THREE.Mesh(geometry, material);
			var n = obj.name;
			if (n === 'Chest' || n === 'Chest2' || n === 'Chest3' || n === 'Chest4'){
				n = 'Chest';
				urls = urlsChests;
			}
			if (n === 'RightHip' ||  n === 'LeftHip' || n === 'LeftKnee' || n === 'RightKnee'){
				n = 'Leg';
				urls = urlsLegs;
			}
			if (n === 'Head'){
				n = 'Head';
				urls = urlsHeads;
			}
			
			if (n ==  "Head" || n === 'Chest' /*|| n == "Leg"*/){
				
				var url = urls[ Math.floor(Math.random()*urls.length)];
				loader.load( url , function ( collada ) {
							var dae = collada.scene;
							DAE_obj.push(dae);
							dae.scale.x = dae.scale.y = dae.scale.z = 0.4;
							this.node.add(dae)	;					
				}.bind({node: node}));

			}else{
				var child = DefaultNode(obj);
				node.add(child);
			}
			node.visible = obj.visible;
			
			objects.push (node);
		return 	node;	
	}
	
	
    BVH_LIST[key].parseNode = function( data ) {
		var name, done, geometry, i, n, node, t;
		name = data.shift();
		if ( name === 'Site' ) {
			geometry = new THREE.SphereGeometry( 3 );
			node = new THREE.Mesh(geometry, material);	
			node.visible = false;
			
		} else if ( name === 'Head' ) {
			node = CreateNode( {name: name , type:"Box", width:12, height:20, depth:15, visible: true, trans:[0, 8, 0] } );
			
		} else if ( name === 'Neck' ) {
			node = CreateNode( {name: name , type:"Box", width:10, height:10, depth:10, visible: true, trans:[0, 4, 0] } );
			
		} else if ( name === 'LeftCollar' ) {
			node = CreateNode( {name: name , type:"Box", width:30, height:10, depth:10, visible: true, trans:[-10, 0, 0] } );	
			
		} else if ( name === 'RightCollar' ) {
			node = CreateNode( {name: name , type:"Box", width:30, height:10, depth:10, visible: true, trans:[10, 0, 0] } );		
			
		} else if ( name === 'LeftShoulder' ||  name === 'LeftElbow' ) {
			node = CreateNode( {name: name , type:"Box", width:35, height:8, depth:8, visible: true, trans:[20, 0, 0] } );	
			
		} else if ( name === 'RightShoulder' || name === 'RightElbow' ) {
			node = CreateNode( {name: name , type:"Box", width:35, height:8, depth:8, visible: true, trans:[-20, 0, 0] } );
			
		} else if ( name === 'LeftWrist' ) {
			node = CreateNode( {name: name , type:"Box", width:15, height:12, depth:5, visible: true, trans:[20, 0, 0] } );
			
		} else if ( name === 'RightWrist' ) {
			node = CreateNode( {name: name , type:"Box", width:15, height:12, depth:5, visible: true, trans:[-20, 0, 0] } );			
			
		} else if ( name === 'Chest' || name === 'Chest2' || name === 'Chest3' || name === 'Chest4' ) {
			node = CreateNode( {name: name , type:"Box", width:30, height:10, depth:10, visible: true, trans:[0, 0, 0] } );
			
		} else if ( name === 'RightHip' ||  name === 'LeftHip') {
			node = CreateNode( {name: name , type:"Box", width:10, height:50, depth:10, visible: true, trans:[0, -18, 0] } );			

		} else if ( name === 'LeftKnee' || name === 'RightKnee' ) {
			node = CreateNode( {name: name , type:"Box", width:10, height:45, depth:10, visible: true, trans:[0, -25, 0] } );
			
		} else if ( name === 'LeftAnkle' || name === 'RightAnkle' ) {
			node = CreateNode( {name: name , type:"Box", width:8, height:8, depth:8, visible: true, trans:[0, 0, 0] } );
			
		} else if ( name === 'LeftToe' || name === 'RightToe' ) {
			node = CreateNode( {name: name , type:"Box", width:10, height:5, depth:20, visible: true, trans:[0, 0, -10] } );
		} else {	
			node = CreateNode( {name: name , type:"Box", width:35, height:12, depth:12, visible: true, trans:[0, 0, 0] } );
		}
		
		node.name = name; // data.shift();
//console.log( node.name );		
		node.rotation.order = 'YXZ';
		done = false;
		while ( !done ) {
			switch (t = data.shift()) {
				case 'OFFSET':
					node.position.set( parseFloat(data.shift()), parseFloat(data.shift()), parseFloat(data.shift()) );
					node.offset = node.position.clone();
					break;
				case 'CHANNELS':
					n = parseInt( data.shift());
					for ( i = 0;  0 <= n ? i < n : i > n;  0 <= n ? i++ : i-- ) {  // OMG
						this.channels.push({
							node: node,
							prop: data.shift()
						});
					}
					break;
				case 'JOINT':
				case 'End':
					node.add( this.parseNode(data) );
					break;
				case '}':
					done = true;
			}
		}
		return node;
    };
	
	BVH_LIST[key].deleteObj = function( i, collada ) {

		ref = this.channels;
		for ( var i = 0, len = ref.length; i < len; i++) {
			var ch = ref[ i ];
			//console.log(ch);
			if (ch.node.name === "Head" ){
				ch.node = CreateNode( {name: name , type:"Box", width:12, height:20, depth:15, visible: true, trans:[0, 8, 0] } );
				break;
			}
		}
		
	};
	
    BVH_LIST[key].animate = function( frame ) {
		var ch, frame, n, torad, ref;
		n = frame % this.numFrames * this.channels.length;
		torad = Math.PI / 180;
		ref = this.channels;
		
		for ( var i = 0, len = ref.length; i < len; i++) {
			ch = ref[ i ];
			switch ( ch.prop ) {
				case 'Xrotation':
					ch.node.rotation.x = (parseFloat(this.data[n])) * torad;
					break;
				case 'Yrotation':
					ch.node.rotation.y = (parseFloat(this.data[n])) * torad;
					break;
				case 'Zrotation':
					ch.node.rotation.z = (parseFloat(this.data[n])) * torad;
					break;
				case 'Xposition':
					ch.node.position.x = 0;//ch.node.offset.x + parseFloat(this.data[n]);
					break;
				case 'Yposition':
					ch.node.position.y = ch.node.offset.y + parseFloat(this.data[n]);
					break;
				case 'Zposition':
					ch.node.position.z = 0;//ch.node.offset.z + parseFloat(this.data[n]);
			}
			n++;
		}
		
		if(frame == this.numFrames){
			location.reload();
			//alert();
			frame==0;
		}
		
	};
	
};
	}// End BVH object!!
	var ani = true;
	
	function animate() {
			requestAnimationFrame( animate );
			controls.update();
			//if (camera.position.y < 1 ) camera.position.y = 1;
			camera.lookAt(new THREE.Vector3(0,80,0));
			renderer.render( scene, camera );

			for (x=0; x< BVH_LIST.length; x++){
				
				if ( BVH_LIST[x].play && ani) { 
					frame = ( (Date.now() - BVH_LIST[x].startTime ) / BVH_LIST[x].secsPerFrame / 1000 )  | 0; 
					BVH_LIST[x].animate( frame );
				}
				
			}
		
	}	
	
	test();