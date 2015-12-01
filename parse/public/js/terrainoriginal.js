

var bool_cargar_face_material=true;

    // once everything is loaded, we run our Three.js stuff.
    $(function () {
        var level2;
        var num_facemateriales_cargados=16;
        var planame16;
        var plane16_cotas;
        var scene;
        var engine;
        var OrbitControls;
        var camControls;
        var altura=524288;
        var status='finalizado';
        var contador_asignar_cotas=0;
       
        var clock = new THREE.Clock();

         //111320
        // var lad_original=20037508.342787 * 2;
        
         var resolucion= 0.29858214164761665 * 256  ;
          var lad_original=524288  ;
         var url_carto="https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/";
        
         var num_divisiones=1;
        var stats = initStats();
        // create a scene, that will hold all our elements such as objects, cameras and lights.
        scene = new THREE.Scene();


        // create a camera, which defines where we're looking at.
        var camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight, 0.01, 5000000000);

        camera.position.x =-1869755/resolucion;
        camera.position.y=16000/resolucion;
        camera.position.z =-3291480/resolucion ;

        //camera.position.y=360;

        camera.lookAt(-4.03,0,-48.32);



        // create a render and set the size
        var renderer = new THREE.WebGLRenderer();

        renderer.setClearColorHex(0x000000);
        renderer.setSize(window.innerWidth, window.innerHeight);
       renderer.autoClear=false;
        renderer.autoClearDepth=false;
        renderer.sortObjects=true;
        //renderer.shadowMapEnabled = false;
       
       
        THREE.ImageUtils.crossOrigin = '';
       

      

       


          var planeGeometry = new THREE.NinaPlaneGeometry (lad_original,lad_original,4,4);
         planeGeometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
       
       
       

            var plane = new THREE.Mesh(planeGeometry, new THREE.MeshBasicMaterial({
                                  ambient: 0xffffff,
                                  map: THREE.ImageUtils.loadTexture( 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/0/0/0.jpg', new THREE.UVMapping(), function() {plane.userData.matcargado=true} ) }));
          

           plane.userData.nivel=0;
           plane.userData.fila=0;
           plane.userData.columna=0;
           
           plane.userData.lado=(lad_original);
           plane.userData.cotacargada=true;
           plane.userData.cotaasignada=true;



            scene.add(plane);
            camera.lookAt(plane.position)

          // add the plane to the scene
       

        camControls = new THREE.FirstPersonControls(scene,camera);
        camControls.movementSpeed = 20;
        camControls.lookSpeed = 0.05;
        camControls.noFly = false;

        // camControls.lookVertical = true;
        // camControls.constrainVertical = true;
        //   camControls.constrainHorizontal = true;
          // camControls.verticalMin = 1;
          // camControls.verticalMax = 2;
         
           camControls.lon = -90;
           camControls.lat = -90;

          // engine = new ParticleEngine();
   
          // engine.setValues( {
          //   positionStyle    : Type.CUBE,
          //   positionBase     : new THREE.Vector3( 3.688291,-44.304964, 0),
          //   positionSpread   : new THREE.Vector3( 3.688291,-44.304964, 0 ),

          //   velocityStyle    : Type.CUBE,
          //   velocityBase     : new THREE.Vector3( 3.688291, 0.0001,-44.304964 ),
          //   velocitySpread   : new THREE.Vector3( 3.888291, 0.0001,-44.804964 ), 
          //   accelerationBase : new THREE.Vector3( 3.888291, 0.0001,-44.804964),
            
          //   particleTexture : THREE.ImageUtils.loadTexture( 'images/smokeparticle.png'),

          //   angleBase               : 0,
          //   angleSpread             : 720,
          //   angleVelocityBase       : 0,
          //   angleVelocitySpread     : 720,
            
          //   sizeTween    : new Tween( [0, 1], [2, 12] ),
          //   opacityTween : new Tween( [0.8, 2], [0.5, 0] ),
          //   colorTween   : new Tween( [0.4, 1], [ new THREE.Vector3(3.688291,-44.304964, 0), new THREE.Vector3(3.688291,-44.304964, 0) ] ),

          //   particlesPerSecond : 200,
          //   particleDeathAge   : 2.0,       
          //   emitterDeathAge    : 60 });

          // engine.initialize();
   

        // position and point the camera to the center of the scene
       

        // add the output of the renderer to the html element
        $("#WebGL-output").append(renderer.domElement);

         window.addEventListener( 'resize', onWindowResize, false );




       
        
        render();

        function onWindowResize() {

           camera.aspect = window.innerWidth / window.innerHeight;
           camera.updateProjectionMatrix();

           renderer.setSize( window.innerWidth, window.innerHeight );

           camControls.handleResize();

        }

        function get_level(distance){

            var level;


            

                if(distance<=1500 && distance>=0 ){
                   
                    level2=18;
                }
                else if(distance<=6000 && distance>=1500 ){
                   
                    level2=17;
                }

                //  if(distance<=1000 && distance>=0 ){
                   
                //     level=19;
                // }
                
                // else if(distance<=1500 && distance>=1000 ){
                   
                //     level=18;
                // }
                // else if(distance<=2000 && distance>=1500 ){
                   
                //     level=17;
                // }
                if(distance<=6000 && distance>=0 ){
                   level=16;
                
                }
                else if(distance<=10000 && distance>=6000 ){
                   level=15;
                  
                }
                else if(distance<=15000 && distance>=10000 ){
                   level=14;
                  
                }
                else if(distance<=20000 && distance>=15000 ){
                   level=13;
                  
                }
                else if(distance<=40000 && distance>=20000 ){
                   level=12;
                }
                else if(distance<=60000 && distance>=40000 ){
                   level=11;
                }
                else if(distance<=100000 && distance>=50000 ){
                   level=10;
                  
                }
                else if(distance<=1000000 && distance>=100000 ){
                    level=9;
                }
                else if(distance<=1500000 && distance>=1000000 ){
                    level=8;
                }
                else if(distance<=2000000 && distance>=1500000 ){
                    level=7;
                }
                else if(distance<=2500000 && distance>=2000000){
                   level=6;
                }
                else if(distance<=5000000 && distance>=2500000 ){
                   level=5;
                  
                }
                else if(distance<=10000000 && distance>=5000000 ){
                    level=4;
                   
                }
                else if(distance<=20000000 && distance>=10000000 ){
                    level=3;
                   
                }
                else if(distance<=30000000 && distance>=20000000 ){
                    level=2;
                   
                }
                else if(distance<= 50000000 && distance>= 30000000 ){
                    level=1;
                   
                }

                else if(distance>= 50000000 ){
                   
                    level=0;
                }
                // if(level>=14 && level<16 ){
                //        camera.far=10000;
                //        camera.updateProjectionMatrix();
                // }


                // else if(level>=16){
                //        camera.far=1000;
                //        camera.updateProjectionMatrix();
                // }
                // else{
                //        camera.far=524288 ;
                //         camera.updateProjectionMatrix();
                // }

                return level;
        }

        function get_columna (nivel){

           var tile_size= (lad_original/(Math.pow(2,nivel)));
           var x;
          
           var columna;
           
                 x=(lad_original/2)+camera.position.x;
            
            
                
            
            
          
           
           columna=Math.floor(x/tile_size);
           return Number(columna);
           
        }
        function get_fila (nivel){

           var tile_size= (lad_original/(Math.pow(2,nivel)));
           var z;
          
           var fila;
           
                z=(lad_original/2) +camera.position.z;

          
           fila= Math.floor(z/tile_size);
           return Number(fila);
        }
      
        function render() {

         
            var vector2=new THREE.Vector3(0,-1,0);
            
            var raycaster = new THREE.Raycaster(camera.position,vector2);

            var intersects = raycaster.intersectObjects(scene.children);
           
           
            if (intersects.length > 0) {

              intersects.sort(function(a,b){return(b.distance-a.distance)});
               
                for (var i=0; i<intersects.length;i++){
                    if (intersects[i].object.visible) {
                        altura=intersects[i].distance;
                        break;
                    }
                }
            }

            var level=get_level(altura*resolucion);
           
           
            var frustum = new THREE.Frustum();
            frustum.setFromMatrix( new THREE.Matrix4().multiply( camera.projectionMatrix, camera.matrixWorldInverse ) );
            
            var planes_borrar=[];
           
            
            
           
             for ( var i = 0; i < scene.children.length; i++ ) {

                
                var object=scene.children[i];

                      //   if(scene.children[i].userData.nivel<=13){
                      //     num_divisiones=1;
                      // }
                      // else if(scene.children[i].userData.nivel==14){
                      //     num_divisiones=2;
                      // }
                      //  else if(scene.children[i].userData.nivel==15){
                      //     num_divisiones=4;
                      // }
                      // else if(scene.children[i].userData.nivel==16){
                      //     num_divisiones=8;
                      //  }
              

                 if(object instanceof THREE.Mesh  && object.visible==false &&  object.userData.nivel>=level   ){//&& object.userData.cotaasignada==true
                    planes_borrar.push(scene.getChildByName(object.userData.hijos[0]));
                             planes_borrar.push(scene.getChildByName(object.userData.hijos[1]));
                             planes_borrar.push(scene.getChildByName(object.userData.hijos[2]));
                             planes_borrar.push(scene.getChildByName(object.userData.hijos[3]));
                    // scene.remove(scene.getObjectByName(object.userData.hijos[0]),scene.getObjectByName(object.userData.hijos[1]),scene.getObjectByName(object.userData.hijos[2]),scene.getObjectByName(object.userData.hijos[3]));

                     object.userData.hijos=[];
                     object.visible=true; 
                    // i=0;  
                  
                 }


                 if((scene.children[i].userData.fila<= get_fila(scene.children[i].userData.nivel)+num_divisiones && scene.children[i].userData.fila>=get_fila(scene.children[i].userData.nivel)-num_divisiones) && (scene.children[i].userData.columna<= get_columna(scene.children[i].userData.nivel)+num_divisiones && scene.children[i].userData.columna>=get_columna(scene.children[i].userData.nivel)-num_divisiones) ){

                               
                    }
                    else{

                          if(object instanceof THREE.Mesh  && object.visible==false  && !frustum.intersectsObject(scene.children[i] )  && !frustum.intersectsObject(scene.children[i] ) ){//&& object.userData.cotaasignada==true  && !frustum.intersectsObject(scene.children[i] )
                             planes_borrar.push(scene.getChildByName(object.userData.hijos[0]));
                             planes_borrar.push(scene.getChildByName(object.userData.hijos[1]));
                             planes_borrar.push(scene.getChildByName(object.userData.hijos[2]));
                             planes_borrar.push(scene.getChildByName(object.userData.hijos[3]));
                             

                             object.userData.hijos=[];
                             object.visible=true;
                         
                                           

                        }
                    }

                    // if(object instanceof THREE.Mesh  && object.visible==true &&  object.userData.nivel>level  ){
                    //     planes_borrar.push(object);
                           
                   
                    // // i=0;  
                  
                    // }
                 
             
                 
             }

             
            
           
               for ( var i = 0; i < planes_borrar.length; i++ ) {
                   
                     scene.remove(planes_borrar[i]);
                     //alert("borramos")

                    
                    // i=0;
               }
             
           

             
             scene.children.sort(function(a,b){return(a.userData.nivel-b.userData.nivel)});
            
            
           

              for (var i = 0; i < scene.children.length; i++ ) {
                
                      //    if(scene.children[i].userData.nivel<=13){
                      //     num_divisiones=1;
                      // }
                      // else if(scene.children[i].userData.nivel==14){
                      //     num_divisiones=2;
                      // }
                      //  else if(scene.children[i].userData.nivel==15){
                      //     num_divisiones=4;
                      // }
                      // else if(scene.children[i].userData.nivel==16){
                      //     num_divisiones=8;
                      //  }
              
                   
                    
                            if(scene.children[i] instanceof   THREE.Mesh 
                             &&  scene.children[i].visible==true && scene.children[i].userData.nivel<level
                               && scene.children[i].userData.matcargado==true && frustum.intersectsObject(scene.children[i]) ){
                   
                     

                                  if((scene.children[i].userData.fila<= get_fila(scene.children[i].userData.nivel)+num_divisiones && scene.children[i].userData.fila>=get_fila(scene.children[i].userData.nivel)-num_divisiones) && (scene.children[i].userData.columna<= get_columna(scene.children[i].userData.nivel)+num_divisiones && scene.children[i].userData.columna>=get_columna(scene.children[i].userData.nivel)-num_divisiones) ){

                                       
                                    if (scene.children[i].userData.nivel>10 && scene.children[i].userData.nivel<16 && scene.children[i].userData.cotaasignada==true ) {//&& scene.children[i].userData.cotaasignada==true
                                      dividimos(scene.children[i]); 
                                    }
                                     else if  (scene.children[i].userData.nivel<=10 || scene.children[i].userData.nivel>=17){
                                        dividimos(scene.children[i]); 
                                    }

                                   
                                      break;
                                  }
                    
                   
                            }
                    
                 
          
                

            }
             // for ( var i = 0; i < scene.children.length; i++ ) {
                 
             //        scene.children[i].userData.distancia=scene.children[i].position.distanceTo(camera.position);
                   
                 

             // }
              for ( var i = 0; i < scene.children.length; i++ ) {
                 
                    scene.children[i].userData.distancia=scene.children[i].position.distanceTo(camera.position);
                   
                 

             }
             scene.children.sort(function(a,b){return(a.userData.distancia-b.userData.distancia)});

            for ( var i = 0; i < scene.children.length; i++ ) {

                    if(level2>=18 &&  scene.children[i].userData.matcargado==true  && bool_cargar_face_material==true && 
                      scene.children[i].userData.nivel==16 &&   scene.children[i].userData.facematerialcargado!=true  &&
                       (scene.children[i].userData.distancia* resolucion)<5800){

                        //cargamos_face_material(scene.children[i]);
                        break;

                    }  
      
            }

            //  for ( var i = 0; i < scene.children.length; i++ ) {

            //         if(level2>=18 &&   scene.children[i].userData.facematerial_para_cargar==true){
            //            scene.children[i].userData.facematerial_para_cargar=false;

            //             var l = scene.children[i].geometry.faces.length / 2;

            //              for( var w = 0; w < l; w ++ ) {
            //                  var q = 2 * w;
            //                 scene.children[i].geometry.faces[ q ].materialIndex = (w % 256)+1;
            //                 scene.children[i].geometry.faces[ q + 1 ].materialIndex = (w % 256)+1;
            //                 scene.children[i].geometry.faceVertexUvs[0][ q]=[new THREE.Vector2(0, 1),new THREE.Vector2(0,0),new THREE.Vector2(1,1) ];
            //                 scene.children[i].geometry.faceVertexUvs[0][ q+1 ]=[new THREE.Vector2(0, 0),new THREE.Vector2(1,0),new THREE.Vector2(1,1) ];
                           
                            

            //              }
            //               scene.children[i].userData.facematerialcargado=true;
            //               scene.children[i].geometry.uvsNeedUpdate=true;
            //               scene.children[i].geometry.groupsNeedUpdate=true;
            //             break;

            //         }  
      
            // }

            

           
                  

           //  for ( var i = 0; i < scene.children.length; i++ ) {
                 
           //          scene.children[i].userData.distancia=scene.children[i].position.distanceTo(camera.position);
                   
                 

           //   }
           //   scene.children.sort(function(a,b){return(a.userData.nivel-b.userData.nivel)});
          

          //inicio cotas
           for (var i = 0; i < scene.children.length; i++ ) {
                

                
                  if (status=='finalizado' && scene.children[i].userData.cotacargada==false){
                    
                          status='consultando';
                          plane16_cotas=scene.children[i].name;
                         
                          var Cotas = Parse.Object.extend("tenerife");
                          var query = new Parse.Query(Cotas);

                          //if(scene.children[i].userData.nivel==14){

                                var filas=[];
                                var columnas=[];
                                var offset = 0;

                                for (var j=0;j<=4;j++){

                                    filas.push(String(Number(scene.children[i].userData.fila*Math.pow(2,18-scene.children[i].userData.nivel))+offset));
                                    columnas.push(String(Number(scene.children[i].userData.columna*Math.pow(2,18-scene.children[i].userData.nivel))+offset));
                                    offset=offset+ Math.pow(2,(18-(scene.children[i].userData.nivel+2)));
                                }

                                query.equalTo("nivel","18");
                                query.containedIn("fila",filas);
                                query.containedIn("columna",  columnas);
                               



                          // }
                          // else{



                          //     query.equalTo("nivel","18");
                          //     query.containedIn("fila",[String(scene.children[i].userData.fila* (Math.pow(2,18-scene.children[i].userData.nivel))),String(scene.children[i].userData.fila* (Math.pow(2,18-scene.children[i].userData.nivel))+1)]);
                          //     query.containedIn("columna",  [String(scene.children[i].userData.columna* (Math.pow(2,18-scene.children[i].userData.nivel))+1), String(scene.children[i].userData.columna* (Math.pow(2,18-scene.children[i].userData.nivel)))]);
                              
                          // }
                          
                          
                        
                           
                          query.ascending("fila");
                         // query.ascending("columna");
                          
                         //  var mainQuery = Parse.Query.or(query,query2,query3,query4);
                          //var mainQuery = Parse.Query.or(query);
                           query.limit(300);
                     
                          query.find({
                            success: function(results) {

                             if(results.length>0){

                                if(results.length!=4 && results.length!=25){
                                  //alert(results.length)
                                   var pl= scene.getChildByName(plane16_cotas);

                                      if(pl!=undefined){

                                                 pl.userData.cotas=results;
                                                 pl.userData.cotacargada=true;
                                                 pl.userData.cotaasignada=true;
                                                 

                                        
                                      } 
                                      else{
                                       /// alert("undefined")
                                      }

                                  
                                }
                                else{

                                     for (var i = 0; i < results.length; i++) { 
                                        //alert(results.length)
                                        
                                        if(results[i].get('RASTERVALU')<0){

                                              results[i].set('RASTERVALU',0);
                                        }
                                        

                                      }
                                    
                                      
                                      var pl= scene.getChildByName(plane16_cotas);
                                      if(pl!=undefined){

                                         

                                                 pl.userData.cotas=results;
                                                 pl.userData.cotacargada=true;

                                       
                                      }   
                                      else{
                                        //alert("undefined")
                                      } 

                                }

                                     
                                      
                                     
                             }
                             else{
                                      var pl= scene.getChildByName(plane16_cotas);

                                      if(pl!=undefined){
                                       pl.userData.cotacargada=true;
                                        pl.userData.cotaasignada=true;
                                     }
                                  
                             }
                                status='finalizado';
                                  
                            },
                            error: function(error) {

                               status='finalizado';

                                var pl= scene.getChildByName(plane16_cotas);

                                      if(pl!=undefined){
                                       pl.userData.cotacargada=true;
                                        pl.userData.cotaasignada=true;a
                                     }
                              
                              alert("Error: " + error.code + " " + error.message);
                              
                            }
                          });

                    break;
                  }
           }
           contador_asignar_cotas=contador_asignar_cotas+1;

           //if(contador_asignar_cotas==35){

            contador_asignar_cotas=0;
                       for (var i = 0; i < scene.children.length; i++ ) {
                             //var plane=scene.children[i];
                              if ( scene.children[i].userData.cotacargada==true && scene.children[i].userData.cotaasignada==false){

                                             

                                    for (var k = 0; k < scene.children[i].userData.cotas.length; k++ ) {

                                        scene.children[i].geometry.vertices[k].y=(scene.children[i].userData.cotas[k].get('RASTERVALU')/resolucion);
                                    }





                                    scene.children[i].userData.cotaasignada=true;
                                    scene.children[i].geometry.verticesNeedUpdate=true;



                                    //status='finalizado';


                                    break;

                                 // var name1="n" +  scene.children[i].userData.nivel + "f" +  (scene.children[i].userData.fila-1) + "c" +  scene.children[i].userData.columna;
                                 // var name2="n" +  scene.children[i].userData.nivel + "f" +  (scene.children[i].userData.fila) + "c" +  (scene.children[i].userData.columna+1);
                                 // var name3="n" +  scene.children[i].userData.nivel + "f" +  (scene.children[i].userData.fila +1) + "c" +  (scene.children[i].userData.columna);
                                 // var name4="n" +  scene.children[i].userData.nivel + "f" +  (scene.children[i].userData.fila) + "c" +  (scene.children[i].userData.columna-1);
                                 // var plane1=scene.getChildByName(name1);
                                 // var plane2=scene.getChildByName(name2);
                                 // var plane3=scene.getChildByName(name3);
                                 // var plane4=scene.getChildByName(name4);

                                 //  if(  plane1 && plane2 && plane3 && plane4){

                                 //               scene.children[i].geometry.vertices[0].y=(scene.children[i].userData.cota);
                                 //               scene.children[i].geometry.vertices[1].y=(scene.children[i].userData.cota1);
                                 //               scene.children[i].geometry.vertices[2].y=(scene.children[i].userData.cota2);
                                 //               scene.children[i].geometry.vertices[3].y=(scene.children[i].userData.cota3);

                                 //               scene.children[i].userData.cotaasignada=true;

                                 //               break;
                                 //  }
                               



                              }

                       }
          //}
           
            //fin cotas
            
           // for ( var i = 0; i < scene.children.length; i++ ) {
                 
           //          scene.children[i].userData.distancia=scene.children[i].position.distanceTo(camera.position);
                 
                 

           //   }
            // scene.children.sort(function(a,b){return(b.userData.distancia-a.userData.distancia)});

            
             //  for ( var i = 0; i < scene.children.length; i++ ) {
              
             //        scene.children[i].renderDepth=i/10000;
                 
                 

             // }

            stats.update();
            var delta = clock.getDelta();

           // engine.update( delta * 0.5 );
            //camera.position.z += 0.1;
          //camControls.lat += 0.1;
           // OrbitControls.update(delta);
            camControls.update(delta);
            // $("#camcont-lat").html(camControls.lat.toFixed(2) );
            // $("#camcont-lon").html(camControls.lon.toFixed(2));
            $("#camcont-x").html("x: " +(camera.position.x * resolucion).toFixed(6));
            $("#camcont-y").html("y: " + (camera.position.y * resolucion ).toFixed(6));
            $("#camcont-z").html("z: " +(camera.position.z * -resolucion).toFixed(6));
            $("#camcont-far").html("Nivel:" + level);
            $("#camcont-distance").html("Planes: " +scene.children.length);
            $("#camcont-a").html("Altura: " + (altura * resolucion).toFixed(2));
            $("#camcont-b").html("Fila: " +get_fila(level));
            $("#camcont-columna").html("Columna: " +get_columna(level));
            $("#camcont-estado").html("Estado: " +status);
           
            
            requestAnimationFrame(render);
            // renderer.clearDepth();
            // for ( var i = 0; i < scene.children.length; i++ ) {
                 
            //         scene.children[i].userData.distancia=scene.children[i].position.distanceTo(camera.position);
                 
                 

            //  }
            //  scene.children.sort(function(a,b){return(b.userData.distancia-a.userData.distancia)});

            
            //   for ( var i = 0; i < scene.children.length; i++ ) {
              
            //         scene.children[i].renderDepth=i;
                 
                 

            //  }
            renderer.render(scene, camera);
            

        }
        function cargamos_face_material(plane){

               
            
       
                            var materials=[];
                            bool_cargar_face_material=false;
                            planame16= plane.name;
                            var c=0;
                                for ( e= 0; e<4; e++ ) {

                                        for ( p = 0; p <4; p++ ) {

                                             
                                            materials[c]= new THREE.MeshBasicMaterial({
                                                          
                                                          ambient: 0xffffff,
                                                          map: THREE.ImageUtils.loadTexture( 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/18/' + ((plane.userData.fila*4) + e ) + '/' + ((plane.userData.columna*4) + p   ) +'.jpg'  , new THREE.UVMapping(),
                                                           function (ma) {

                                                                 ma.needsUpdate=true;

                                                                  var pla=scene.getChildByName(planame16);
                                                                   

                                                                  if(pla!=undefined){
                                                                           pla.material.materials[(16-num_facemateriales_cargados)+1]=materials[16-num_facemateriales_cargados];
                                                                           var q = 2 * (16-num_facemateriales_cargados);

                                                                           pla.geometry.faces[ q ].materialIndex = ((16-num_facemateriales_cargados) % 16)+1;
                                                                           pla.geometry.faces[ q + 1 ].materialIndex = ((16-num_facemateriales_cargados) % 16)+1;
                                                                           pla.geometry.faceVertexUvs[0][ q]=[new THREE.Vector2(0, 1),new THREE.Vector2(0,0),new THREE.Vector2(1,1) ];
                                                                           pla.geometry.faceVertexUvs[0][ q+1 ]=[new THREE.Vector2(0, 0),new THREE.Vector2(1,0),new THREE.Vector2(1,1) ];
                                                                           pla.geometry.uvsNeedUpdate=true;
                                                                           pla.geometry.groupsNeedUpdate=true;

                                                                         
                                                                            num_facemateriales_cargados=num_facemateriales_cargados-1;

                                                                            if(num_facemateriales_cargados==0){

                                                                                 num_facemateriales_cargados=16;
                                                                                 bool_cargar_face_material=true;
                                                                               
                                                                               
                                                                                 pla.userData.facematerial_para_cargar=true;
                                                                                 pla.userData.facematerialcargado=true;
                                                                              
                                                                                 

                                                                           }


                                                                  }
                                                                  else{


                                                                                num_facemateriales_cargados=16;
                                                                                 bool_cargar_face_material=true;
                                                                               
                                                                  }

                                                                


                                                            })
                                                        });
                                            

                                            

                                            c=c+1;
                                              
                                            
                                        }
                                 }
                                  
                                        
                            
               
               
        }

       

         function dividimos(planeorigen){
            //alert("dividimos")
            var a=0;
            var c=0;
            var materials = [];
            var materials1 = [];
            var materials2 = [];
            var materials3 = [];
         
           
              
           
            //alert(c);
          
            for ( i = 0; i <2; i++ ) {

                for ( j = 0; j <2; j++ ) {

                    if(planeorigen.userData.nivel==13){
                         var planeGeometry = new THREE.NinaPlaneGeometry (planeorigen.userData.lado/2,planeorigen.userData.lado/2,4,4);
                         planeGeometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
                    }
                    else{
                         var planeGeometry = new THREE.NinaPlaneGeometry (planeorigen.userData.lado/2,planeorigen.userData.lado/2,4,4);
                         planeGeometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );   
                    }
                     
                   
                              
                  

                   if(i==1 && j==0){

                    
                       

                            planeGeometry.vertices[0].y =  planeorigen.geometry.vertices[10].y ;
                            planeGeometry.vertices[1].y = (planeorigen.geometry.vertices[10].y+ planeorigen.geometry.vertices[11].y)/2 ;
                            planeGeometry.vertices[2].y = planeorigen.geometry.vertices[11].y ;
                            planeGeometry.vertices[3].y = (planeorigen.geometry.vertices[11].y + planeorigen.geometry.vertices[12].y)/2 ;
                            planeGeometry.vertices[4].y = planeorigen.geometry.vertices[12].y ;

                            planeGeometry.vertices[10].y =  planeorigen.geometry.vertices[15].y ;
                            planeGeometry.vertices[11].y = (planeorigen.geometry.vertices[15].y+ planeorigen.geometry.vertices[16].y)/2 ;
                            planeGeometry.vertices[12].y = planeorigen.geometry.vertices[16].y ;
                            planeGeometry.vertices[13].y = (planeorigen.geometry.vertices[16].y + planeorigen.geometry.vertices[17].y)/2 ;
                            planeGeometry.vertices[14].y = planeorigen.geometry.vertices[17].y ;

                          
                            planeGeometry.vertices[20].y =  planeorigen.geometry.vertices[20].y ;
                            planeGeometry.vertices[21].y = (planeorigen.geometry.vertices[20].y+ planeorigen.geometry.vertices[21].y)/2 ;
                            planeGeometry.vertices[22].y = planeorigen.geometry.vertices[21].y ;
                            planeGeometry.vertices[23].y = (planeorigen.geometry.vertices[21].y + planeorigen.geometry.vertices[22].y)/2 ;
                            planeGeometry.vertices[24].y = planeorigen.geometry.vertices[22].y ;


                            

                        


                            planeGeometry.vertices[5].y = (planeGeometry.vertices[0].y + planeGeometry.vertices[10].y)/2 
                            planeGeometry.vertices[6].y = (planeGeometry.vertices[1].y + planeGeometry.vertices[11].y)/2 
                            planeGeometry.vertices[7].y = (planeGeometry.vertices[2].y + planeGeometry.vertices[12].y)/2 
                            planeGeometry.vertices[8].y = (planeGeometry.vertices[3].y + planeGeometry.vertices[13].y)/2 
                            planeGeometry.vertices[9].y = (planeGeometry.vertices[4].y + planeGeometry.vertices[14].y)/2 

                            planeGeometry.vertices[15].y = (planeGeometry.vertices[10].y + planeGeometry.vertices[20].y)/2 
                            planeGeometry.vertices[16].y = (planeGeometry.vertices[11].y + planeGeometry.vertices[21].y)/2 
                            planeGeometry.vertices[17].y = (planeGeometry.vertices[12].y + planeGeometry.vertices[22].y)/2 
                            planeGeometry.vertices[18].y = (planeGeometry.vertices[13].y + planeGeometry.vertices[23].y)/2 
                            planeGeometry.vertices[19].y = (planeGeometry.vertices[14].y + planeGeometry.vertices[24].y)/2 


                            
                            planeGeometry.verticesNeedUpdate=true;
                       

                      
                       
                         
                       
                        if(planeorigen.userData.nivel==15){

                                var materials=[];
                                var uvs=[];
                                materials.push(planeorigen.material);

                                var plane = new THREE.Mesh(planeGeometry, new THREE.MeshFaceMaterial(materials));
                                plane.userData.facematerialcargado=false;
                                plane.geometry.faceVertexUvs=plane.geometry.faceVertexUvs5;
                                
                                uvs=plane.geometry.faceVertexUvs;

                              for ( var i = 0; i < uvs[0].length; i ++) {
                                
                                 uvs[ 0 ][i][0].divideScalar(2);
                                 uvs[ 0 ][i][1].divideScalar(2);
                                 uvs[ 0 ][i][2].divideScalar(2);

                               
                              }

                               plane.geometry.faceVertexUvs=uvs;
                               plane.geometry.uvsNeedUpdate=true;
                               plane.frustumCulled=false;
                               console.log(plane.geometry.faceVertexUvs);
                                   //plane.geometry.groupsNeedUpdate=true;


                                // var gridX = 16 ;
                                // var gridY = 16 ;

                                // var gridX1 = gridX + 1;
                                // var gridY1 = gridY + 1;

                                // var offset = 0;
                                // var offset2 = 0;
                                // var tempUVs=[];
                                // var uvs=[]
                                
                                // for ( var iy = 0; iy < gridY1; iy ++ ) {

                                 

                                //   for ( var ix = 0; ix < gridX1; ix ++ ) {

                                //     vertices[ offset     ] = x;
                                //     vertices[ offset + 1 ] = - y;

                                    

                                //      uvs[ offset2     ] = ix / (gridX * 2);
                                //      uvs[ offset2 + 1 ] = 1 - ( iy / gridY );

                                //      offset += 3;
                                //      offset2 += 2;

                                //   }


                                // }

                                // for ( var i = 0, j = 0; i < vertices.length; i += 3, j += 2 ) {


                                //   tempUVs.push( new THREE.Vector2( uvs[ j ], uvs[ j + 1 ] ) );

                                        
                                // }
                                // plane.geometry.faceVertexUvs[0]=[];
                                // for ( var i = 0; i < indices.length; i += 3 ) {

                                  
                                //     plane.geometry.faceVertexUvs[ 0 ].push( [ tempUVs[ indices[ i ] ], tempUVs[ indices[ i + 1 ]], tempUVs[indices[ i + 2 ] ] ] );

                                // }




                        }
                        else{
                                var plane = new THREE.Mesh(planeGeometry, planeorigen.material);
                                plane.userData.facematerialcargado=false;
                                plane.geometry.faceVertexUvs[0]=[];
                                plane.geometry.faceVertexUvs[ 0 ].push([new THREE.Vector2(0, 0.5),new THREE.Vector2(0,0),new THREE.Vector2(0.5,0.5) ] );
                                plane.geometry.faceVertexUvs[ 0 ].push( [new THREE.Vector2(0, 0),new THREE.Vector2(0.5,0),new THREE.Vector2(0.5,0.5) ]);
                                
                                plane.geometry.uvsNeedUpdate=true;
                                //planeGeometry.normalsNeedUpdate=true;
                        }
                      
                               

                                var mat= THREE.ImageUtils.loadTexture( url_carto+(planeorigen.userData.nivel+1)+'/' + ((planeorigen.userData.fila*2) +i) + '/' + ((planeorigen.userData.columna*2) + j) +'.jpg', new THREE.UVMapping(), function (ma) {

                                            if(plane.userData.nivel==16){

                                                var materials=[];
                                                materials.push(ma);

                                               ma.needsUpdate=true;
                                                plane.material=new THREE.MeshFaceMaterial(materials);
                                                 plane.material.materials[0]=new THREE.MeshBasicMaterial({
                                                 depthTest:true,
                                                ambient: 0xffffff,
                                                map:ma});
                                                  plane.geometry.faceVertexUvs=plane.geometry.faceVertexUvs5;
                                                  plane.geometry.uvsNeedUpdate=true;

                                                
                                                
                                                 
                                            }
                                            else{
                                               plane.material=new THREE.MeshBasicMaterial({
                                                 depthTest:true,
                                                ambient: 0xffffff,
                                                map:ma});

                                               plane.geometry.faceVertexUvs=plane.geometry.faceVertexUvs5;
                                                plane.geometry.uvsNeedUpdate=true;
                                            
                                               
                                            }
                                           
                                            plane.userData.matcargado=true;
                                            
                                                
                                         
                                });
                       
                               
                      
                        //cotas


                       
                        plane.userData.nivel=planeorigen.userData.nivel+1;
                        plane.userData.fila=(planeorigen.userData.fila*2)+i;
                        plane.userData.columna=(planeorigen.userData.columna*2)+j;
                        plane.userData.lado=planeorigen.userData.lado/2;
                       
                        plane.userData.padre=planeorigen.name;
                        plane.name="n" +  plane.userData.nivel + "f" +  plane.userData.fila + "c" +  plane.userData.columna;
                        plane.userData.cotacargada=false;
                        //plane.userData.cotacargando=false;
                        // if(plane.userData.nivel<=10){
                        //     plane.userData.cotaasignada=true;
                        // }
                        // else if (plane.userData.nivel>10 && plane.userData.nivel<17){
                        //     plane.userData.cotaasignada=false;
                        // }
                        // else{
                        //     plane.userData.cotaasignada=true;
                        // }
                        plane.userData.cotaasignada=false;
                        plane.position.x=planeorigen.position.x -  plane.userData.lado/2;
                        plane.position.z=planeorigen.position.z +  plane.userData.lado/2;
                        plane.position.y=0;
                         //plane.frustumCulled=false;
                       
                        scene.add(plane);
                        planeorigen.userData.hijos[a]=plane.name;


                        
                       
                       
                     
                   }
                   else if(i==1 && j==1){


                            planeGeometry.vertices[0].y =  planeorigen.geometry.vertices[12].y ;
                            planeGeometry.vertices[1].y = (planeorigen.geometry.vertices[12].y+ planeorigen.geometry.vertices[13].y)/2 ;
                            planeGeometry.vertices[2].y = planeorigen.geometry.vertices[13].y ;
                            planeGeometry.vertices[3].y = (planeorigen.geometry.vertices[13].y + planeorigen.geometry.vertices[14].y)/2 ;
                            planeGeometry.vertices[4].y = planeorigen.geometry.vertices[14].y ;

                            planeGeometry.vertices[10].y =  planeorigen.geometry.vertices[17].y ;
                            planeGeometry.vertices[11].y = (planeorigen.geometry.vertices[17].y+ planeorigen.geometry.vertices[18].y)/2 ;
                            planeGeometry.vertices[12].y = planeorigen.geometry.vertices[18].y ;
                            planeGeometry.vertices[13].y = (planeorigen.geometry.vertices[18].y + planeorigen.geometry.vertices[19].y)/2 ;
                            planeGeometry.vertices[14].y = planeorigen.geometry.vertices[19].y ;

                          
                            planeGeometry.vertices[20].y =  planeorigen.geometry.vertices[22].y ;
                            planeGeometry.vertices[21].y = (planeorigen.geometry.vertices[22].y+ planeorigen.geometry.vertices[23].y)/2 ;
                            planeGeometry.vertices[22].y = planeorigen.geometry.vertices[23].y ;
                            planeGeometry.vertices[23].y = (planeorigen.geometry.vertices[23].y + planeorigen.geometry.vertices[24].y)/2 ;
                            planeGeometry.vertices[24].y = planeorigen.geometry.vertices[24].y ;


                            

                        


                            planeGeometry.vertices[5].y = (planeGeometry.vertices[0].y + planeGeometry.vertices[10].y)/2 
                            planeGeometry.vertices[6].y = (planeGeometry.vertices[1].y + planeGeometry.vertices[11].y)/2 
                            planeGeometry.vertices[7].y = (planeGeometry.vertices[2].y + planeGeometry.vertices[12].y)/2 
                            planeGeometry.vertices[8].y = (planeGeometry.vertices[3].y + planeGeometry.vertices[13].y)/2 
                            planeGeometry.vertices[9].y = (planeGeometry.vertices[4].y + planeGeometry.vertices[14].y)/2 

                            planeGeometry.vertices[15].y = (planeGeometry.vertices[10].y + planeGeometry.vertices[20].y)/2 
                            planeGeometry.vertices[16].y = (planeGeometry.vertices[11].y + planeGeometry.vertices[21].y)/2 
                            planeGeometry.vertices[17].y = (planeGeometry.vertices[12].y + planeGeometry.vertices[22].y)/2 
                            planeGeometry.vertices[18].y = (planeGeometry.vertices[13].y + planeGeometry.vertices[23].y)/2 
                            planeGeometry.vertices[19].y = (planeGeometry.vertices[14].y + planeGeometry.vertices[24].y)/2 


                            
                            planeGeometry.verticesNeedUpdate=true;


                            //  if(planeorigen.userData.nivel==15){

                            //  }
                            //  else{

                            // planeGeometry.vertices[0].y=  (planeorigen.geometry.vertices[1].y + planeorigen.geometry.vertices[2].y)/2;
                            // planeGeometry.vertices[1].y= (planeorigen.geometry.vertices[1].y + planeorigen.geometry.vertices[3].y)/2 ;
                            // planeGeometry.vertices[2].y= (planeorigen.geometry.vertices[2].y + planeorigen.geometry.vertices[3].y)/2
                            // planeGeometry.vertices[3].y= planeorigen.geometry.vertices[3].y  ;
                            //  planeGeometry.verticesNeedUpdate=true;


                            // }


                              if(planeorigen.userData.nivel==15){

                                 var materials=[];
                                 materials.push(planeorigen.material);

                                var plane1 = new THREE.Mesh(planeGeometry, new THREE.MeshFaceMaterial(materials));
                                plane1.userData.facematerialcargado=false;
                                plane1.geometry.faceVertexUvs=plane1.geometry.faceVertexUvs5;
                                
                                plane1.geometry.uvsNeedUpdate=true;
                                plane1.frustumCulled=false;
                                //planeGeometry.normalsNeedUpdate=true;

                            }
                            else{
                           
                              var plane1 = new THREE.Mesh(planeGeometry, planeorigen.material);
                              plane1.userData.facematerialcargado=false;
                              
                              plane1.geometry.faceVertexUvs[0]=[];
                              plane1.geometry.faceVertexUvs[0].push([new THREE.Vector2(0.5, 0.5),new THREE.Vector2(0.5,0 ),new THREE.Vector2(1,0.5) ]);
                              plane1.geometry.faceVertexUvs[0].push([new THREE.Vector2(0.5, 0),new THREE.Vector2(1,0 ),new THREE.Vector2(1,0.5) ]);
                              plane1.geometry.uvsNeedUpdate=true;
                              // planeGeometry.normalsNeedUpdate=true;

                            }

                            var mat= THREE.ImageUtils.loadTexture( url_carto+(planeorigen.userData.nivel+1)+'/' + ((planeorigen.userData.fila*2) +i) + '/' + ((planeorigen.userData.columna*2) + j) +'.jpg', new THREE.UVMapping(), function (ma) {
                                      
                                         if(plane1.userData.nivel==16){

                                                var materials=[];
                                                materials.push(ma);

                                              // ma.needsUpdate=true;
                                               // plane.material=new THREE.MeshFaceMaterial(materials);
                                                 plane1.material.materials[0]=new THREE.MeshBasicMaterial({
                                                 depthTest:true,
                                                ambient: 0xffffff,
                                                map:ma});

                                                
                                                
                                                 
                                            }
                                            else{
                                               plane1.material=new THREE.MeshBasicMaterial({
                                                 depthTest:true,
                                                ambient: 0xffffff,
                                                map:ma});

                                               plane1.geometry.faceVertexUvs=plane1.geometry.faceVertexUvs5;
                                                plane1.geometry.uvsNeedUpdate=true;
                                            
                                               
                                            }
                                           
                                            plane1.userData.matcargado=true;
                                     
                                  })


                       
                           
                            plane1.userData.nivel=planeorigen.userData.nivel+1;
                            plane1.userData.fila=(planeorigen.userData.fila*2)+i;
                            plane1.userData.columna=(planeorigen.userData.columna*2)+j;
                            plane1.userData.lado=planeorigen.userData.lado/2;
                           
                            plane1.userData.padre=planeorigen.name;
                            plane1.name="n" +  plane1.userData.nivel + "f" +  plane1.userData.fila + "c" +  plane1.userData.columna;
                            plane1.userData.cotacargada=false; 
                            // if(plane1.userData.nivel<=10){
                            //     plane1.userData.cotaasignada=true;
                            // }
                            // else if (plane1.userData.nivel>10 && plane1.userData.nivel<17){
                            //     plane1.userData.cotaasignada=false;
                            // }
                            // else{
                            //     plane1.userData.cotaasignada=true;
                            // }
                           //plane1.userData.cotacargando=false;
                                  
                          plane1.userData.cotaasignada=false;
                            plane1.position.x=planeorigen.position.x +  plane1.userData.lado/2;
                            plane1.position.z=planeorigen.position.z +  plane1.userData.lado/2;
                            plane1.position.y=0;
                            //plane1.frustumCulled=false;
                          
                            
                            scene.add(plane1);
                            planeorigen.userData.hijos[a]=plane1.name;

                      
                       
                   }

                   else if(i==0 && j==0) {


                      
                            planeGeometry.vertices[0].y =  planeorigen.geometry.vertices[0].y ;
                            planeGeometry.vertices[1].y = (planeorigen.geometry.vertices[0].y+ planeorigen.geometry.vertices[1].y)/2 ;
                            planeGeometry.vertices[2].y = planeorigen.geometry.vertices[1].y ;
                            planeGeometry.vertices[3].y = (planeorigen.geometry.vertices[1].y + planeorigen.geometry.vertices[2].y)/2 ;
                            planeGeometry.vertices[4].y = planeorigen.geometry.vertices[2].y ;

                            planeGeometry.vertices[10].y =  planeorigen.geometry.vertices[5].y ;
                            planeGeometry.vertices[11].y = (planeorigen.geometry.vertices[5].y+ planeorigen.geometry.vertices[6].y)/2 ;
                            planeGeometry.vertices[12].y = planeorigen.geometry.vertices[6].y ;
                            planeGeometry.vertices[13].y = (planeorigen.geometry.vertices[6].y + planeorigen.geometry.vertices[7].y)/2 ;
                            planeGeometry.vertices[14].y = planeorigen.geometry.vertices[7].y ;

                          
                            planeGeometry.vertices[20].y =  planeorigen.geometry.vertices[10].y ;
                            planeGeometry.vertices[21].y = (planeorigen.geometry.vertices[10].y+ planeorigen.geometry.vertices[11].y)/2 ;
                            planeGeometry.vertices[22].y = planeorigen.geometry.vertices[11].y ;
                            planeGeometry.vertices[23].y = (planeorigen.geometry.vertices[11].y + planeorigen.geometry.vertices[12].y)/2 ;
                            planeGeometry.vertices[24].y = planeorigen.geometry.vertices[12].y ;


                            

                        


                            planeGeometry.vertices[5].y = (planeGeometry.vertices[0].y + planeGeometry.vertices[10].y)/2; 
                            planeGeometry.vertices[6].y = (planeGeometry.vertices[1].y + planeGeometry.vertices[11].y)/2;  
                            planeGeometry.vertices[7].y = (planeGeometry.vertices[2].y + planeGeometry.vertices[12].y)/2;  
                            planeGeometry.vertices[8].y = (planeGeometry.vertices[3].y + planeGeometry.vertices[13].y)/2;  
                            planeGeometry.vertices[9].y = (planeGeometry.vertices[4].y + planeGeometry.vertices[14].y)/2;  

                            planeGeometry.vertices[15].y = (planeGeometry.vertices[10].y + planeGeometry.vertices[20].y)/2;  
                            planeGeometry.vertices[16].y = (planeGeometry.vertices[11].y + planeGeometry.vertices[21].y)/2;  
                            planeGeometry.vertices[17].y = (planeGeometry.vertices[12].y + planeGeometry.vertices[22].y)/2;  
                            planeGeometry.vertices[18].y = (planeGeometry.vertices[13].y + planeGeometry.vertices[23].y)/2; 
                            planeGeometry.vertices[19].y = (planeGeometry.vertices[14].y + planeGeometry.vertices[24].y)/2;  


                            
                            planeGeometry.verticesNeedUpdate=true;


                      //  if(planeorigen.userData.nivel==15){

                      //  }
                      //  else{

                      //   planeGeometry.vertices[0].y= planeorigen.geometry.vertices[0].y ;
                      //   planeGeometry.vertices[1].y= (planeorigen.geometry.vertices[0].y + planeorigen.geometry.vertices[1].y)/2 ;
                      //   planeGeometry.vertices[2].y= (planeorigen.geometry.vertices[0].y + planeorigen.geometry.vertices[2].y)/2;
                      //   planeGeometry.vertices[3].y= (planeorigen.geometry.vertices[1].y + planeorigen.geometry.vertices[2].y)/2 ;
                      //    planeGeometry.verticesNeedUpdate=true;
                      //   //  planeGeometry.normalsNeedUpdate=true;

                      // }

                         if(planeorigen.userData.nivel==15){

                                 var materials=[];
                                 materials.push(planeorigen.material);

                                var plane2 = new THREE.Mesh(planeGeometry, new THREE.MeshFaceMaterial(materials));
                                plane2.userData.facematerialcargado=false;
                                plane2.geometry.faceVertexUvs=plane2.geometry.faceVertexUvs5;
                                plane2.frustumCulled=false;
                                
                                plane2.geometry.uvsNeedUpdate=true;
                               // planeGeometry.normalsNeedUpdate=true;

                            }
                            else{
                           
                              var plane2 = new THREE.Mesh(planeGeometry, planeorigen.material);
                              plane2.userData.facematerialcargado=false;
                            
                              plane2.geometry.faceVertexUvs[0]=[];
                              plane2.geometry.faceVertexUvs[0].push([new THREE.Vector2(0, 1),new THREE.Vector2(0,0.5),new THREE.Vector2(0.5,1) ]);
                              plane2.geometry.faceVertexUvs[0].push([new THREE.Vector2(0, 0.5),new THREE.Vector2(0.5,0.5),new THREE.Vector2(0.5,1) ]);

                              plane2.geometry.uvsNeedUpdate=true;
                            }

                        var mat= THREE.ImageUtils.loadTexture( url_carto+(planeorigen.userData.nivel+1)+'/' + ((planeorigen.userData.fila*2) +i) + '/' + ((planeorigen.userData.columna*2) + j) +'.jpg', new THREE.UVMapping(), function (ma) {
                               if(plane2.userData.nivel==16){

                                                var materials=[];
                                                materials.push(ma);

                                              // ma.needsUpdate=true;
                                               // plane.material=new THREE.MeshFaceMaterial(materials);
                                                 plane2.material.materials[0]=new THREE.MeshBasicMaterial({
                                                 depthTest:true,
                                                ambient: 0xffffff,
                                                map:ma});

                                                
                                                
                                                 
                                            }
                                            else{
                                               plane2.material=new THREE.MeshBasicMaterial({
                                                 depthTest:true,
                                                ambient: 0xffffff,
                                                map:ma});

                                               plane2.geometry.faceVertexUvs=plane2.geometry.faceVertexUvs5;
                                                plane2.geometry.uvsNeedUpdate=true;
                                            
                                               
                                            }
                                           
                                            plane2.userData.matcargado=true;
                                 
                                  //alert("a")
                              })
                      
                       plane2.userData.nivel=planeorigen.userData.nivel+1;
                       plane2.userData.fila=(planeorigen.userData.fila*2)+i;
                       plane2.userData.columna=(planeorigen.userData.columna*2)+j;
                       plane2.userData.lado=planeorigen.userData.lado/2;
                     
                       
                      plane2.userData.padre=planeorigen.name;
                      plane2.name="n" + plane2.userData.nivel + "f" + plane2.userData.fila + "c" + plane2.userData.columna;
                      plane2.userData.cotacargada=false;
                       // if(plane2.userData.nivel<=10){
                       //          plane2.userData.cotaasignada=true;
                       //      }
                       //      else if (plane2.userData.nivel>10 && plane2.userData.nivel<17){
                       //          plane2.userData.cotaasignada=false;
                       //      }
                       //      else{
                       //          plane2.userData.cotaasignada=true;
                       //      }
                      //plane2.userData.cotacargando=false;
                      plane2.userData.cotaasignada=false;
                      plane2.position.x=planeorigen.position.x -  plane2.userData.lado/2;
                      plane2.position.z=planeorigen.position.z -  plane2.userData.lado/2;
                      plane2.position.y=0;
                      // plane2.frustumCulled=false;
                      
                      

                      scene.add(plane2);
                      planeorigen.userData.hijos[a]=plane2.name;
                      
                    
                   }
                   else if(i==0 && j==1){


                            planeGeometry.vertices[0].y =  planeorigen.geometry.vertices[2].y ;
                            planeGeometry.vertices[1].y = (planeorigen.geometry.vertices[2].y+ planeorigen.geometry.vertices[3].y)/2 ;
                            planeGeometry.vertices[2].y = planeorigen.geometry.vertices[3].y ;
                            planeGeometry.vertices[3].y = (planeorigen.geometry.vertices[3].y + planeorigen.geometry.vertices[4].y)/2 ;
                            planeGeometry.vertices[4].y = planeorigen.geometry.vertices[4].y ;

                            planeGeometry.vertices[10].y =  planeorigen.geometry.vertices[7].y ;
                            planeGeometry.vertices[11].y = (planeorigen.geometry.vertices[7].y+ planeorigen.geometry.vertices[8].y)/2 ;
                            planeGeometry.vertices[12].y = planeorigen.geometry.vertices[8].y ;
                            planeGeometry.vertices[13].y = (planeorigen.geometry.vertices[8].y + planeorigen.geometry.vertices[9].y)/2 ;
                            planeGeometry.vertices[14].y = planeorigen.geometry.vertices[9].y ;

                          
                            planeGeometry.vertices[20].y =  planeorigen.geometry.vertices[12].y ;
                            planeGeometry.vertices[21].y = (planeorigen.geometry.vertices[12].y+ planeorigen.geometry.vertices[13].y)/2 ;
                            planeGeometry.vertices[22].y = planeorigen.geometry.vertices[13].y ;
                            planeGeometry.vertices[23].y = (planeorigen.geometry.vertices[13].y + planeorigen.geometry.vertices[14].y)/2 ;
                            planeGeometry.vertices[24].y = planeorigen.geometry.vertices[14].y ;


                            

                        


                            planeGeometry.vertices[5].y = (planeGeometry.vertices[0].y + planeGeometry.vertices[10].y)/2; 
                            planeGeometry.vertices[6].y = (planeGeometry.vertices[1].y + planeGeometry.vertices[11].y)/2;  
                            planeGeometry.vertices[7].y = (planeGeometry.vertices[2].y + planeGeometry.vertices[12].y)/2;  
                            planeGeometry.vertices[8].y = (planeGeometry.vertices[3].y + planeGeometry.vertices[13].y)/2;  
                            planeGeometry.vertices[9].y = (planeGeometry.vertices[4].y + planeGeometry.vertices[14].y)/2;  

                            planeGeometry.vertices[15].y = (planeGeometry.vertices[10].y + planeGeometry.vertices[20].y)/2;  
                            planeGeometry.vertices[16].y = (planeGeometry.vertices[11].y + planeGeometry.vertices[21].y)/2;  
                            planeGeometry.vertices[17].y = (planeGeometry.vertices[12].y + planeGeometry.vertices[22].y)/2;  
                            planeGeometry.vertices[18].y = (planeGeometry.vertices[13].y + planeGeometry.vertices[23].y)/2; 
                            planeGeometry.vertices[19].y = (planeGeometry.vertices[14].y + planeGeometry.vertices[24].y)/2;  


                            
                            planeGeometry.verticesNeedUpdate=true;


                       // if(planeorigen.userData.nivel==15){

                       // }
                       // else{

                       //  planeGeometry.vertices[0].y= (planeorigen.geometry.vertices[0].y + planeorigen.geometry.vertices[1].y)/2 ;
                       //  planeGeometry.vertices[1].y= planeorigen.geometry.vertices[1].y;
                       //  planeGeometry.vertices[2].y= (planeorigen.geometry.vertices[1].y + planeorigen.geometry.vertices[2].y)/2;
                       //  planeGeometry.vertices[3].y= (planeorigen.geometry.vertices[1].y + planeorigen.geometry.vertices[3].y)/2 ;
                       //   planeGeometry.verticesNeedUpdate=true;
                       // //  planeGeometry.normalsNeedUpdate=true;

                       //  }

                         if(planeorigen.userData.nivel==15){

                                 var materials=[];
                                 materials.push(planeorigen.material);

                                var plane3 = new THREE.Mesh(planeGeometry, new THREE.MeshFaceMaterial(materials));
                                plane3.userData.facematerialcargado=false;
                                plane3.geometry.faceVertexUvs=plane3.geometry.faceVertexUvs5;
                                plane3.frustumCulled=false;
                                
                                plane3.geometry.uvsNeedUpdate=true;
                              //  planeGeometry.normalsNeedUpdate=true;

                            }
                            else{
                           
                              var plane3 = new THREE.Mesh(planeGeometry, planeorigen.material);
                              plane3.userData.facematerialcargado=false;
                              // planeGeometry.attributes.uv=[];
                              // planeGeometry.attributes.uv.push([new THREE.Vector2(0, 0.5),new THREE.Vector2(0,0),new THREE.Vector2(0.5,0.5) ]);
                              // planeGeometry.attributes.uv.push([new THREE.Vector2(0, 0),new THREE.Vector2(0.5,0),new THREE.Vector2(0.5,0.5) ]);
                              plane3.geometry.faceVertexUvs[0]=[];
                              plane3.geometry.faceVertexUvs[0].push([new THREE.Vector2(0.5, 1),new THREE.Vector2(0.5,0.5),new THREE.Vector2(1,1) ]);
                              plane3.geometry.faceVertexUvs[0].push([new THREE.Vector2(0.5, 0.5),new THREE.Vector2(1,0.5),new THREE.Vector2(1,1) ]);
                              
                              plane3.geometry.uvsNeedUpdate=true;
                            }

                        var mat= THREE.ImageUtils.loadTexture( url_carto+(planeorigen.userData.nivel+1)+'/' + ((planeorigen.userData.fila*2) +i) + '/' + ((planeorigen.userData.columna*2) + j) +'.jpg', new THREE.UVMapping(), 
                          function (ma) {
                                 if(plane3.userData.nivel==16){

                                                var materials=[];
                                                materials.push(ma);

                                              // ma.needsUpdate=true;
                                               // plane.material=new THREE.MeshFaceMaterial(materials);
                                                 plane3.material.materials[0]=new THREE.MeshBasicMaterial({
                                                 depthTest:true,
                                                ambient: 0xffffff,
                                                map:ma});

                                                
                                                
                                                 
                                            }
                                            else{
                                               plane3.material=new THREE.MeshBasicMaterial({
                                                 depthTest:true,
                                                ambient: 0xffffff,
                                                map:ma});

                                               plane3.geometry.faceVertexUvs=plane3.geometry.faceVertexUvs5;
                                                plane3.geometry.uvsNeedUpdate=true;
                                            
                                               
                                            }
                                           
                                            plane3.userData.matcargado=true;
                                  
                              })
                      
                       plane3.userData.nivel=planeorigen.userData.nivel+1;
                       plane3.userData.fila=(planeorigen.userData.fila*2)+i;
                       plane3.userData.columna=(planeorigen.userData.columna*2)+j;
                       plane3.userData.lado=planeorigen.userData.lado/2;
                      
                       
                       plane3.userData.padre=planeorigen.name;
                       plane3.name="n" + plane3.userData.nivel + "f" + plane3.userData.fila + "c" + plane3.userData.columna;
                       plane3.userData.cotacargada=false;

                        // if(plane3.userData.nivel<=10){
                        //         plane3.userData.cotaasignada=true;
                        //     }
                        //     else if (plane3.userData.nivel>10 && plane3.userData.nivel<17){
                        //         plane3.userData.cotaasignada=false;
                        //     }
                        //     else{
                        //         plane3.userData.cotaasignada=true;
                        //     }
                       //plane3.userData.cotacargando=false;
                       plane3.userData.cotaasignada=false;
                      
                      plane3.position.x=planeorigen.position.x +  plane3.userData.lado/2;
                      plane3.position.z=planeorigen.position.z -  plane3.userData.lado/2;

                      plane3.position.y=0;
                       //plane3.frustumCulled=false;
                      
                      

                       scene.add(plane3);
                       planeorigen.userData.hijos[a]=plane3.name;

                   }

                   
                   a=a+1;

                    
                  // scene.add(plane);

                }   
       
            }
           
            planeorigen.visible=false;
           


           
        }

       
        function round(x, digits){
          return parseFloat(x.toFixed(digits))
        }
        function initStats() {

            var stats = new Stats();
            stats.setMode(0); // 0: fps, 1: ms

            // Align top-left
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.left = '0px';
            stats.domElement.style.top = '0px';

            $("#Stats-output").append(stats.domElement);

            return stats;
        }
    });