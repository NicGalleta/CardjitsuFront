# CompletosFanClub_frontend

## Explicacion página principal
Para la presente entrega, las reglas del juego no se han modificado y los endpoints presentes fueron trabajados en base a ellas. Respecto al diseño general de la página, se entrega un borrador que permite probar los diferentes endopoints, y así poder conectarlos en la siguiente entrega para el armado del juego final. La página principal de la entrega tiene dos vistas: la que se tiene cuando el usuario está ingresado y la que no. En la primera, se tiene en el centro los endpoints para el testeo del movimiento en el tablero y unirse a las partidas ya creadas. Además, cuenta con un navbar que cuenta con diferntes links para probar más rutas y para acceder a información del equipo y del usuario. Por su parte, cuando el usuario cierra sesión se dirige a un `main`en el que solo se da la opción de crear una cuenta o bien ingresar con una cuenta ya existente. Para la siguiente entrega, se espera completar con más elementos y así tener un diseño lo más similar posible al mockup entregado en la entrega cero.

## Rutas que se pueden probar:
+ instrucciones: `/instructions`  
Se puede acceder por medio del botón "instrucciones" de la Navar
Una vista estática con las instrucciones del juego y aspectos a considerar.

+ Login: `/login`  
 Login funciona como se esperaría y su uso es intuitivo.     

+ Signup: `/signup`  
 Crear una cuenta funciona como se esperaría y su uso es intuitivo. Por defecto esta seleccionado el color rojo pero se puede escoger dinamicamente. Hasta ahora el color solo se ve reflejado en la barra de navegación y en el detalle del perfil. En la próxima entrega se verá reflejado en las partidas.    

+ Perfil: `/perfil`  
La página de perfil permite al usuario visualizar su información como Nombre y Correo electrónico, pero también entrega al cliente la posibilidad de cambiar el color de su avatar. Cuando el usuario decide cambiar el color, este además se refleja en el navbar. Por el momento, el color del avatar es lo único que se puede cambiar, pero para próximas entregas se esperan mejoras en el diseño y añadir cambio al nombre de usuario y/o correo electrónico.

+ Juego Nuevo: `/newgame`   
 Es el botón principal del landing page. Al apretarlo, se crea una partida nueva y te redirije al tablero `/board`. Nota: Por algun motivo, en algunas ocasiones no aparecerá el pingüino de inmediato. Sin embargo, al realizar un movimiento aparecerá. Este detalle y otros más se arreglarán para la próxima entrega.

+ Unirse a Partida:  
 Conociendo el ID de una partida, uno se puede unir a esta. También esta en la página principal y su uso es intuitivo. Importante: hasta ahora solo se pueden unir dos jugadores a una partida y hay algunos detalles que no se pudieron resolver para esta entrega, por ejemplo si el creador de la partida la abandona y no queda nadie adentro, alguien igual se puede unir. Además, si el mismo creador se une denuevo aparecerá como otro jugador, es decir tendrá dos jugadores en la partida pero solo podrá controlar uno. Son casos limite un poco rebuscados pero si dos jugadores se unen a una partida se podrán mover (libremente, sin turnos por ahora) y podrán visualizar al otro jugador. 

+ Resultado Partidas: `/partidas/resultado`   
A traves del botón podio en el menú desplegable de la Navar.  
Se debe completar el formulario poniendo tres id's de usuario y de jugador y distintos puntajes para cada jugador.

+ Carta Random: `/randomcard`  
Mediante un botón, se le permite al usuario obtener una carta aleatoria, junto con su información relevante. En la próxima entrega, esta funcionalidad se utilizará para asignar cartas a los jugadores durante las rondas de Cardjitsu.

+ Comparar Cartas: `/cartas/compara` 
El endpoint para comparar cartas permite determinar la carta ganadora en una ronda ficticia del Cardjitsu a jugar. En el frontend, se le permite al usuario obtener tres cartas de forma aleatoria, y además, decidir si se le quiere asignar el bonus a cada una de ellas mediante un checkbox. Por el momento, la determinación del bonus detallado en las reglas se elige de forma arbitraria, pero durante el juego esté es determinado por la casilla en la que se encuentre cada jugador. Al comparar las tres cartas, en el frontend se verá reflejada la asignación de puntaje según lo detallado en las reglas. En este endpoint, ocurre el error de "Client has already been connected. You cannot reuse a client.", pero para probar el endpoint correctamente se debe hacer click en el botón de "Get Cards" dos veces.

+ Tablero: `/board` 
 En el tablero de juego en si, uno puede usar las flechas a mano izquierda para moverse, bastante simple. Aun no se puede distinguir en que tipo de casilla uno cae, pero sus comportamientos/efectos se pueden apreciar en un mensaje de texto blanco que aparece debajo del boton de abandonar. Por ejemplo: "Avanza/retrocede posicion" o "Suma/Resta puntos". En este endpoint, ocurre el error de "Client has already been connected. You cannot reuse a client.", pero para probar el endpoint correctamente se debe refrescar la página.


+ Tablero de cardjitsu: `/cardjitsuboard`  
Muestra la vista aproximada de lo que un jugador va a ver durante una partida de cardjitsu. Se puede selecionar una de las cartas de la mano. De no escoger una carta dentro del tiempo que muestra el temporizador se selecciona una de forma random automaticamente. Luego, esta es la carta que se va a usar para compara los con los distintos jugadores y determinar quien es el ganador de esa ronda. 

+ Sobre Nosotros: `/aboutus`   
Puedes acceder a esta con el botón de About Us en la navar.
Página estática donde se muestra la historia y motivación del grupo, como también un poco de información sobre sus integrantes.

<Route path="/" element={<App />} />

