# ✧･ﾟ: *✧･ﾟ:* *:･ﾟ✧*:･ﾟ✧ *✧･ﾟ:* *:･ﾟ✧*✧ ✧･ﾟ: *✧･ﾟ:* *:･ﾟ✧*:･ﾟ✧
# ✧･ﾟ: *✧･ﾟ:* *:･ﾟ✧*:･ﾟ✧ **_NEON LIGHTS_** ✧･ﾟ: *✧･ﾟ:* *:･ﾟ✧*:･ﾟ✧
# ✧･ﾟ: *✧･ﾟ:* *:･ﾟ✧*:･ﾟ✧ *✧･ﾟ:* *:･ﾟ✧*✧ ✧･ﾟ: *✧･ﾟ:* *:･ﾟ✧*:･ﾟ✧

<hr>

0. ### Prefacio:

Trabajo opcional de la asignatura de desarrollo en entorno cliente (2025). JavaScript fué un error.

1. ## Funcionamiento del Juego:

Un mini-proyecto de crear un **clicker** con una **temática cyberpunk**.

El jugador comienza con un botón "Mine" que **genera eddies** (eurodólares) con un tiempo de espera proporcional al número de eddies acumulados.
Una vez que se obtienen dos eddies, se desbloquea el botón **"Buildings"**, que permite construir el primer edificio, el "Warehouse", que habilita otros elementos y edificios, como el "Netrunner Den", el "Data Farm" y el "Black Market".
El jugador puede construir edificios para obtener **"resources"** (daemons, subroutines, data, etc.) y Netrunners (empleados) que se usan para generar más resources o construir más edificios.
El objetivo es completar una serie de edificios, incluido el **"Construct"**, que, al ser construido, finaliza el juego.

<hr>

2. ## Buildings:

Los edificios tienen un costo y desbloquean nuevas funcionalidades.

- **Warehouse**: Desbloquea el botón "Work" y el marcador de resources.
- **Netrunner Den**: Genera Netrunners, con un costo que aumenta con cada nueva construcción.
- **Data Farm**: Produce data automáticamente.
- **Black Market**: Permite comprar resources como rare material, subroutines y daemons.
- **Soul Killer**: Permite generar Engrams, necesarios para ganar el juego.
- **Construct**: Se construye al final del juego.
<hr>
<table>
  <thead>
    <tr>
      <th>Edificio</th>
      <th>Coste</th>
      <th>Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Warehouse</td>
      <td>eddies x2</td>
      <td>Cuando se construye se desbloquea el botón Work y el marcador de Resources. Habilita las Netrunner Den, la Data Farm y el Black Market.</td>
    </tr>
    <tr>
      <td>Netrunner Den</td>
      <td>eddies x6, subroutines x6</td>
      <td>Se pueden crear varias. Cada una genera 5 netrunners. Se incrementa su coste en 5 eddies y 5 subroutines cada vez que se compra una.</td>
    </tr>
    <tr>
      <td>Data Farm</td>
      <td>eddies x8, subroutines x9, daemons x5</td>
      <td>Genera 1 de data cada 20 segundos. Habilita los Chrome Clinic.</td>
    </tr>
    <tr>
      <td>Black Market</td>
      <td>subroutines x8, daemons x9</td>
      <td>Habilita el botón Black Market: abre panel Black Market.</td>
    </tr>
    <tr>
      <td>Chrome Clinic</td>
      <td>eddies x8, daemons x10, data x5</td>
      <td>Habilita el Soul Killer. Permite crear implant por 2 de rare material y 5 data.</td>
    </tr>
    <tr>
      <td>Soul Killer</td>
      <td>eddies x5, subroutines x8, implant x3</td>
      <td>Habilita Construct. Permite transformar 2 de data en engram.</td>
    </tr>
    <tr>
      <td>Construct</td>
      <td>eddies x10, daemons x7, subroutines x9, implants x3, engram x10</td>
      <td>Se gana el juego.</td>
    </tr>
  </tbody>
</table>

<hr>

3. ## Resources:

El juego incluye varios resources que el jugador debe gestionar:

- **Eddies (Eurodollars)**: Se generan con el botón "Mine".
- **Subroutines, Daemons, Data**: Se obtienen de diferentes maneras, como a través del botón "Collect" o la construcción de la Data Farm.
- **Netrunners**: Se generan construyendo Netrunner Den.
- **Implants y Engrams**: Se obtienen de edificios específicos como el Chrome Clinic y el Soul Killer.
<hr>
<table>
  <thead>
    <tr>
      <th>Recurso</th>
      <th>Explicación</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>eddie</td>
      <td>Se consigue una unidad cada vez que se pulsa el botón Mine.</td>
    </tr>
    <tr>
      <td>subroutine</td>
      <td>Se consiguen X unidades al pulsar el botón Work. Siendo X un valor aleatorio entre 0 y el número de netrunners + 2.</td>
    </tr>
    <tr>
      <td>daemon</td>
      <td>Se consiguen X unidades al pulsar el botón Work. Siendo X un valor aleatorio entre 0 y el número de netrunners + 2.</td>
    </tr>
    <tr>
      <td>netrunner</td>
      <td>Se consiguen 5 unidades cada vez que se construye un Netrunner Den.</td>
    </tr>
    <tr>
      <td>data</td>
      <td>Se genera automáticamente cada 25 segundos al construir la Data Farm.</td>
    </tr>
    <tr>
      <td>rare material</td>
      <td>Se obtiene una unidad en el mercado a cambio de 3 eddies.</td>
    </tr>
    <tr>
      <td>implant</td>
      <td>Se produce una unidad tras pulsar el botón Create y cobrar 2 de rare material y 10 data.</td>
    </tr>
    <tr>
      <td>engram</td>
      <td>Se obtiene una unidad al cambiar 2 de data en el Soul Killer.</td>
    </tr>
  </tbody>
</table>

<hr>

4. ## Mejoras Opcionales:

Se pueden añadir funcionalidades adicionales como:

- Contador de tiempo.
- Opción de grabar y cargar partidas.
- Zona informativa que muestra las acciones realizadas.
- Efectos de sonido y música.

<hr>
<hr>

### Día 1:

Este proyecto tiene el potencial de matarme. Lo he reiniciado varias veces por puro odio y desesperación. Este proyecto me hace decir cosas que harían llorar a Dios. Odio CSS. No existen palabras en el lenguaje castellano para expresar el desprecio que siento hacia él. Habiendo dicho eso, es un proyecto que tengo que hacer y voy a hacerlo bien, joder. Asi que aquí está mi diario de desarrollo.

Empecé creando los archivos HTML, CSS y JavaScript con su estructura básica.

- **_HTML_**:
  - Un div con el id **game-area** que alberga el título y la imagen interactiva.
  - Un img con el id **eddie-img**, que es el elemento en el que el usuario hace **clic** para incrementar los eddies. Anteriormente este elemento a sido refereciado como botón Mine, pero se decidió cambiarlo por la imagen actual.
  - Un div para mostrar el **contador de recursos** (eddie).
  - He tenido que ir jugando con _contenedores dentro de contenedores dentro de contenedores dentro de contenedores dentro de contenedores_ ... para que las cosas estén donde yo las quiero. ~~A sido un proceso frustrante e innecesario, que podría hacer una IA con resultados iguales o mejores que el mio y en una fracción de segundo. Pero en fin.~~
- **_CSS_**:
  - **Animación de color**: Se utiliza la propiedad @keyframes para crear un efecto de cambio de color en el título.
  - **Interactividad**: Se añaden transiciones al tamaño de la imagen y efectos visuales cuando el usuario hace clic o pasa el ratón sobre la imagen.
  - **Imagen de fondo**.
  - Se inicia el proceso de **prueba y error para el diseño**. Aunque tengo una idea de cómo quiero que acabe el producto, la realidad es que voy probando hasta que algo encaja como a mi me gusta. Es lento e ineficiente, pero no soy diseñador y no se hacerlo mejor.
- **_JS_**:
  - **Inicialización**: Cuando la página se carga, se asigna un "event listener" al elemento eddie-img para detectar los clics.
  - **Contador de recursos**: Cada clic incrementa el valor de eddie en un objeto resources.
  - **Actualización de la UI**: Después de cada clic, la función updateUI actualiza el contenido de los elementos HTML que tienen un id correspondiente al nombre de los recursos.
  - **Función para obtener tiempo de juego total y tiempo desde última llamada**: usando performance.now() y almacenando el tiempo de inicio una vez, o en cada llamada, respectivamente.

<hr>

### Día 2:

- **_HTML_**:
  - Cambio el div **de imagen a button** para poder desabilitarlo a través de JS mientras se genera el recurso.
  - Añado **una caja mas** al rededor de la imagen para evitar el movimiento de la misma al hacer el efecto zoom.
  - Añado **_una caja mas_** con las mismas características que ID loading por encima para una cosa que explico abajo.
- **_CSS_**:
  - **Desgloso el ID loading a loading_empty y loading_full**, con la intención de hacer una **barra de carga circular** con la imagen del eddie en el centro. La idea es que la barra cargada vaya apareciendo por encima de la vacía en base a la cantidad de tiempo para generar el recurso (eddie). No se si voy a poder hacerlo y tengo miedo.
  - **Cambio la forma de la animación** y sus valores.
  - **Creo estilo y animaciones del botón de buildings**.
  - Añado **overlay negro semitransparente** con z-index inferior, para subirlo cuando llame a paneles extra (building, minijuegos...).
  - **Creo panel emergente** para los buildings con estilos y elementos internos que se irán desbloqueando con el avance del juego.
- **_JS_**:
  - **Desabilito el eddie** hasta que no se haya completado la función de generar recurso.
  - Añado y modifico dinámicamente la propiedad de estilo **filter** para indicar visualmente que no le afectan los clicks.
  - Habilito la aparición del **botón de buildings** con la condición de que no exista ya y que existan por lo menos 2 eddies.
  - Habilito la aparición del panel de buildings como reacción al evento del boton.

La mayor complejidad de hoy ha sido encontrar las opacidades, z-index y positions adecuados para poner trabajar y mover varios elementos (botón de buildings, panel de buildings con sus elementos internos y su botón de cerrar, además del overlay negro para el fondo desenfocado) unos encima de otros con fluidez e independencia.

<hr>

### Día 3:

- **_JS_**:
  - Habilito la aparición del **botón Work** e implemento su funcionalidad.
  - Intento abstraer las funciones del programa con funciones como "enough_resources", "substract_resources", "create_building_btn" con la intención de facilitar el desarrollo. El 99% de las veces que hago esto, termino dedicando mas tiempo a modificar las funciones que a desarrollar la aplicación, al final NO uso las funciones porque malinterpreto la especificidad de las acciones y me siento chiquitito y estúpido. Lo mejor es hacer un boceto del programa rápido y feo pero funcional, y una vez se sabe mas o menos la forma que va a tener, se hace bien con todas estas pijadas y tal. No voy a hacer lo mejor y me conformaré con la mediocridad, como de costumbre.
  - Surge un bug que no tengo tiempo de arreglar. Necesito controlar la correcta habilitación de los edificios Netrunner den, Data Farm y Black Market en el panel de edificios cuando se construye el warehouse.

<hr>

### Día 4:

Hoy se me a ocurrido crear un **contenedor circular** que aparezca con **hover** diciendo el **CC** del botón si lo tiene. Esto se me ha ocurrido porque odio la vida, y lo voy a implementar porque me odio a mi mismo.

- **_JS_**:
  - Habilito la creación del edificio Netrunner Den.
  - Habilito la creación del data farm y su funcionalidad.
  - Habilito el botón del chrome clinic.
  - Arreglo bug. El botón para cerrar la ventana de edificios no funcionaba correctamente sin crear previamente el botón de trabajo.
  - Arreglo bug. Los botones de data farm y black market se crean correctamente junto al de netrunner den.
- **_CSS_**:
  - Modifico un poco la posición de los botones de edificios y trabajo.

<hr>

### Día 5:

- **_JS_**:
  - Abstraigo mas la generación y el almacenamiento de los CC. Esto es totalmente innecesario, pero lo hago igualmente.
- **_CSS_**:
  - Muevo un poco los botones de trabajo y edificios. Esta frase va a ser repetida muy a menudo.

<hr>

### Día 6:

<p align="center">
  <img src="https://fotografias.larazon.es/clipping/cmsimages02/2019/08/22/B8541FD6-9A46-44D4-A045-F6724924490D/98.jpg?crop=377,212,x0,y0&width=1900&height=1069&optimize=low&format=webply" width="250px" height="200px">
</p>
Pensamientos generales de suicidio. Deseos a nivel intermedio/avanzado.

- **_JS_**:
  - Refactorización. Recuerdas cuando dije que quería abstraer funciones? Y que era muy mala idea en este punto del desarrollo? Pues eso.

<hr>

### Día 7:

<i>"Si quieres brillar como el sol, primero debes arder como él."</i> -Adolf Hitler

- **_JS_**:
  - Termino de crear y arreglar el boton y el panel del black market con su funcionalidad y animación de aparecer y desaparecer. Si tubiera que elegir entre perder un huevo en un ataque de jabalí salvaje con rabia o trabajar con CSS, ya sabes lo que eligiría.
  - Estoy intentando añadir el precio a cada elemento que lo tenga de forma dinámica. Después de eso voy a depilarme los ojos.
  - Termino de desarrollar la función de arriba.
- **_CSS_**:
  - Tube que crear una nueva clase para los precios de los elementos. Siento ira y sufrimiento.

<hr>

### Día 8:

Ingredientes: un coche antiguo de gasolina con el tanque lleno, mucha cinta de carrocero, una manguera larga y flexible, un sitio tranquilo y apartado.

- **_JS_**:
  - Termino de implementar el black market con sus precios.
  - Me doy cuenta de que tengo que actualizar visualmente el precio del netrunner den.

<hr>

### Día 9:

- **_JS_**:
  - Arreglo el bug y el precio del netrunner den se actualiza correctamente.

<hr>

### Día 10:

<p align="center">
  <img src="https://www.esdip.com/wp-content/uploads/2023/01/historia-de-la-animacion_la-saga-shrek.jpg" width="200px" height="150px">
</p>

- **_JS_**:
  - Modifico el código en base a los cambios de CSS reflejados en su sección.
  - Introduzco el nuevo elemento soul_killer, y lo habilito y genero visualmente con los métodos pertinentes.
- **_CSS_**:
  - Me di cuenta de que voy a tener que hacer muchos botones, y en vez de ir poniendolos de forma manual, creé un contenedor para irlos metiendo ahí. ~~(pronto todo acabará)~~

<hr>

### Día 11:

<p align="center">
  <img src="https://i.gifer.com/S8JC.gif" width="300px" height="200px">
</p>
<i>"Llega un momento en que es necesario abandonar la ropa usada que ya tiene la forma de nuestro cuerpo y olvidar los caminos que nos llevan siempre a los mismos lugares. Es el momento de la travesía. Y, si no osamos emprenderla, habremos quedado, para siempre, al margen de nosotros mismos."</i> - Albert Camus

- **_JS_**:
  - Arreglo un bug en el que el z-index del boton de work no se instanciaba corretamente por primera vez.
  - Introduzco el nuevo elemento construct, y lo habilito y genero visualmente con los métodos pertinentes.
  - Añado un nuevo elemento a la estructura DOM, justo al ladito del boton de work, para indicar al usuario que, efectivamente, se esta workeando.
- **_CSS_**:
  - Creo un estilo específico para el botón de construct, ya que es un botón especial.
  - Creo una nueva paleta de colores y la uso de una nueva manera. Podríamos decir que estoy refactorizando estilos. Sin comentarios.
  - Creo nuevas clases y estilos para el texto de la chamba (trabajo).

<hr>

### Día 12:

[![Cansionsilla wena](https://img.youtube.com/vi/O2F0oTqfL3E/default.jpg)](https://www.youtube.com/watch?v=O2F0oTqfL3E)

- **_JS_**:

  - Hace tiempo implementé el método update y supongo que se me pasó decirlo. Es un método recursivo que cuenta el tiempo transcurrido desde que se inicia la aplicación. Voy a usar el valor que actualiza para informar de cuanto tiempo de juego a sido necesario para ganar.

- **_CSS_**:
  - Toqueteo los estilos, posiciones, colores y distribución general del documento para que encaje mejor en más tamaños (especialmete los mas pequeños).

<hr>

### Día 13:

[![Arriba Andalucía](https://img.youtube.com/vi/4xwwntp91XA/default.jpg)](https://www.youtube.com/watch?v=4xwwntp91XA)

- **_JS_**:
  - Toqueteo tiempos de intervalos para el botón de trabajo.
  - Empiezo a implementar el método verbose.
  - Se me ocurre hacer un botón de log, que al pulsarlo se abre un panel por encima de todo el contenido del juego con una lista de todas las acciones realizadas y el tiempo de juego en el que se realizaron.
- **_CSS_**:
  - Toqueteo las animaciones, posiciones, colores y distribución general de los elementos del documento, especialmente del botón de transmute.
  - Empiezo a crear los estilos del método verbose. Idealmente, quiero que aparezca en la parte inferior, centrado, con texto pequeño, y un máximo de 5 mensajes a la vez, uno encima del otro, el mas nuevo por encima.

<hr>

### Día 14:

<img src="https://i.imgflip.com/56p56k.jpg?a483072" width="300px" height="300px">

- **_JS // HTML // CSS_**
  - Un poquito de limpieza general.
- **_JS_**:
  - Termino de implementar las funcionalidades del verbose y el log.
  - Empiezo a desarrollar una manera de guardar. JavaScript vanilla no tiene acceso a el sistema, por lo que crear un fichero queda descartado. Podría descargar un archivo JSON pero no tengo manera de mover ese fichero de forma automática a la carpeta correcta. Debido a eso, me voy a conformar con el localStorage. Por ahora voy a guardar los resources, buildings, tiempo total de juego y el log.
  - Aparece un bug. Tengo almacenada la propiedad 'built' de cada edificio, pero ninguna función que genere el DOM al cargar la partida.
  - Arreglo que aparezca el botón de 'buildings' si estaba guardado en el save_file.
  - Debo arreglar que el estado de 'built' de cada edificio se mantenga y actualice el DOM.
- **_CSS_**:
  - Termino de implementar los estilos del verbose y el log.

<hr>

### Día 15:

- **_JS_**:
  - La funcionalidad de guardar la partida, en un html dinámico, sin backend, con JS vanilla, manteniendo todos los cambios realizados en el arbol DOM hasta el punto de guardado, está haciendo que me quiera meter una ortiga por la uretra, sin dilatar primero.
  - <img src="https://ih1.redbubble.net/image.3127748554.3337/raf,360x360,075,t,fafafa:ca443f4786.u1.jpg" width="200px" height="200px">
  - He tenido que ir evento a evento extrayendo de funciones anónimas a funciones con nombre para que, cuando se genere el HTML al recargar, pueda reenganchar todos los eventos que hagan falta.
  - Arreglo un bug en el que las cajas de elementos generados por el trabajo se mantenían al recargar si se cerraba el juego con cajas todavía en el DOM.
  - Arreglo un bug en el que los recursos del juego tenían el mismo id que los carteles de compra de los mismos en el black market.
