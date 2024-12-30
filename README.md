# ***NEON LIGHTS***

<hr>

1. ## Funcionamiento del Juego:

Un mini-proyecto de crear un **clicker** con una **temática cyberpunk**.

El jugador comienza con un botón "Mine" que **genera eddies** (eurodólares) con un tiempo de espera proporcional al número de eddies acumulados.
Una vez que se obtienen dos eddies, se desbloquea el botón **"Buildings"**, que permite construir el primer edificio, el "Warehouse", que habilita otros elementos y edificios, como el "Netrunner Den", el "Data Farm" y el "Black Market".
El jugador puede construir edificios para obtener **"resources"** (daemons, subroutines, data, etc.) y Netrunners (empleados) que se usan para generar más resources o construir más edificios.
El objetivo es completar una serie de edificios, incluido el **"Construct"**, que, al ser construido, finaliza el juego.

<hr>

2. ## Buildings:

Los edificios tienen un costo y desbloquean nuevas funcionalidades.

* **Warehouse**: Desbloquea el botón "Work" y el marcador de resources.
* **Netrunner Den**: Genera Netrunners, con un costo que aumenta con cada nueva construcción.
* **Data Farm**: Produce data automáticamente.
* **Black Market**: Permite comprar resources como rare material, subroutines y daemons.
* **Soul Killer**: Permite generar Engrams, necesarios para ganar el juego.
* **Construct**: Se construye al final del juego.
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

* **Eddies (Eurodollars)**: Se generan con el botón "Mine".
* **Subroutines, Daemons, Data**: Se obtienen de diferentes maneras, como a través del botón "Collect" o la construcción de la Data Farm.
* **Netrunners**: Se generan construyendo Netrunner Den.
* **Implants y Engrams**: Se obtienen de edificios específicos como el Chrome Clinic y el Soul Killer.
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

* Contador de tiempo.
* Opción de grabar y cargar partidas.
* Zona informativa que muestra las acciones realizadas.
* Efectos de sonido y música.

<hr>
<hr>

### Día 1:

Este proyecto tiene el potencial de matarme. Lo he reiniciado varias veces por puro odio y desesperación. Este proyecto me hace decir cosas que harían llorar a Dios. Odio CSS. No existen palabras en el lenguaje castellano para expresar el desprecio que siento hacia él. Habiendo dicho eso, es un proyecto que tengo que hacer y voy a hacerlo bien, joder. Asi que aquí está mi diario de desarrollo.

Empecé creando los archivos HTML, CSS y JavaScript con su estructura básica.
* ***HTML***:
  * Un div con el id **game-area** que alberga el título y la imagen interactiva.
  * Un img con el id **eddie-img**, que es el elemento en el que el usuario hace **clic** para incrementar los eddies. Anteriormente este elemento a sido refereciado como botón Mine, pero se decidió cambiarlo por la imagen actual.
  * Un div para mostrar el **contador de recursos** (eddie).
  * He tenido que ir jugando con *contenedores dentro de contenedores dentro de contenedores dentro de contenedores dentro de contenedores* ... para que las cosas estén donde yo las quiero. ~~A sido un proceso frustrante e innecesario, que podría hacer una IA con resultados iguales o mejores que el mio y en una fracción de segundo. Pero en fin.~~
* ***CSS***:
  * **Animación de color**: Se utiliza la propiedad @keyframes para crear un efecto de cambio de color en el título.
  * **Interactividad**: Se añaden transiciones al tamaño de la imagen y efectos visuales cuando el usuario hace clic o pasa el ratón sobre la imagen.
  * **Imagen de fondo**.
  * Se inicia el proceso de **prueba y error para el diseño**. Aunque tengo una idea de cómo quiero que acabe el producto, la realidad es que voy probando hasta que algo encaja como a mi me gusta. Es lento e ineficiente, pero no soy diseñador y no se hacerlo mejor.
* ***JS***:
  * **Inicialización**: Cuando la página se carga, se asigna un "event listener" al elemento eddie-img para detectar los clics.
  * **Contador de recursos**: Cada clic incrementa el valor de eddie en un objeto resources.
  * **Actualización de la UI**: Después de cada clic, la función updateUI actualiza el contenido de los elementos HTML que tienen un id correspondiente al nombre de los recursos.
  * **Función para obtener tiempo de juego total y tiempo desde última llamada**: usando performance.now() y almacenando el tiempo de inicio una vez, o en cada llamada, respectivamente. 

### Día 2:

* ***HTML***:
  * Cambio el div **de imagen a button** para poder desabilitarlo a través de JS mientras se genera el recurso.
  * Añado **una caja mas** al rededor de la imagen para evitar el movimiento de la misma al hacer el efecto zoom.
  * Añado ***una caja mas*** con las mismas características que ID loading por encima para una cosa que explico abajo.
* ***CSS***:
  * **Desgloso el ID loading a loading_empty y loading_full**, con la intención de hacer una **barra de carga circular** con la imagen del eddie en el centro. La idea es que la barra cargada vaya apareciendo por encima de la vacía en base a la cantidad de tiempo para generar el recurso (eddie). No se si voy a poder hacerlo y tengo miedo.
  * **Cambio la forma de la animación** y sus valores.
  * **Creo estilo y animaciones del botón de buildings**.
  * Añado **overlay negro semitransparente** con z-index inferior, para subirlo cuando llame a paneles extra (building, minijuegos...).
  * **Creo panel emergente** para los buildings con estilos y elementos internos que se irán desbloqueando con el avance del juego.
* ***JS***:
  * **Desabilito el eddie** hasta que no se haya completado la función de generar recurso.
  * Añado y modifico dinámicamente la propiedad de estilo **filter** para indicar visualmente que no le afectan los clicks.
  * Habilito la aparición del **botón de buildings** con la condición de que no exista ya y que existan por lo menos 2 eddies.
  * Habilito la aparición del panel de buildings como reacción al evento del boton.

La mayor complejidad de hoy ha sido encontrar las opacidades, z-index y positions adecuados para poner trabajar y mover varios elementos (botón de buildings, panel de buildings con sus elementos internos y su botón de cerrar, además del overlay negro para el fondo desenfocado) unos encima de otros con fluidez e independencia.

### Día 3:

* ***JS***:
  * Habilito la aparición del **botón Work** e implemento su funcionalidad.
  * Surge un bug que no tengo tiempo de arreglar. Necesito controlar la correcta habilitación de los edificios Netrunner den, Data Farm y Black Market en el panel de edificios cuando se construye el warehouse.

### Día 4:
* ***JS***:
  * Habilito la creación del edificio Netrunner Den,