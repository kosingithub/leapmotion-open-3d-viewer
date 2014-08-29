# Flujo de la Aplicacion
Este archivo hace referencia al Branch ThreeJSIntegration, cual esta mas avanzado.

##Archivos principales
Durante los primeros ciclos del desarrollo del leapmotion-3d-viewer involucra un set de archivos principales
 para leer la informacion de los modelos y despues dibujarlos en la pantalla. En la siguiente parte del documento
 explicare la relacion entre los archivos y la funcion de cada uno durante la implementacion de la libreria 
 [Three.js](http://threejs.org/)

1. scripts/body.js
2. scripts/applicaction.js
3. scripts/o3v/viewer.js
  - scripts/o3v/content.js
  - scripts/webgl/ThreeInterface.js
  - scripts/webgl/UTF8Loader.js
5. scripts/navigator.js
6. scripts/layers_manager.js

## scripts/body.js
Crea la instancia de Application con el namespace "app" dentro de global.
Oculta la interfaz de usuario (es temporal para los demos)

## scripts/application.js
Instancia objetos viewer, navigator y layers manager.

## scripts/o3v/viewer.js
El objeto principal del o3v. Contiene instancias de la mayoria de objetos y metodos para registrar
manejadores de eventos( handlers ). 

## scripts/o3v/content.js
Controla el modelo activo cargando la informacion nesesaria (json de metadata y informacion del modelo[utf8's].
 Si existe mas de un modelo, controla el cambio entre el activo y los demas.
 Al final de cargar los modelos, guarda el objeto(ThreeJSObject) en "models_" obteniendo control total sobre
 el objeto padre(modelo de cuerpo) e hijos (grupos como craneo, piernas o columna vertebral).


## scripts/webgl/ThreeInterface.js
Interfaz entre el manejador de contenido y libreria Threejs.
Contiene todo lo referente a la escena ( camara, controles de teclado , luz y modelo )

