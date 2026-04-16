//María Fernández Gilarte
//Creo mi elemento BODY
let mibody = document.getElementsByTagName('body')[0];

    //CREO LOS ELEMENTOS
    let contenedor = document.createElement('div');
    let panelIzq = document.createElement('div');
    let puntos = document.createElement('div');
    let ptosActual = document.createElement('div');
    let ptosMax = document.createElement('div');
    let panelDerecho = document.createElement('div');
    let tituloPtosAct = document.createElement('h3');
    let numPtos = document.createElement('p');
    let tituloPtosMax = document.createElement('h3');
    let numPtosMax = document.createElement('p');
    let botonIniciar = document.createElement('button');
    let textoBoton = document.createTextNode('Comenzar Juego');
    let tiempoDiv = document.createElement('div');
    let numTiempo = document.createElement('p');
    
    //CONECTO LOS NODOS
    mibody.appendChild(contenedor);
    contenedor.appendChild(panelIzq);
    contenedor.appendChild(panelDerecho);
    panelIzq.appendChild(tiempoDiv);
    tiempoDiv.appendChild(document.createTextNode('Tiempo'));
    tiempoDiv.appendChild(numTiempo);
    numTiempo.appendChild(document.createTextNode('30'));
    panelIzq.appendChild(puntos);
    puntos.appendChild(ptosActual);
    ptosActual.appendChild(tituloPtosAct);
    tituloPtosAct.appendChild(document.createTextNode('Puntuacion Actual'));
    ptosActual.appendChild(numPtos);
    numPtos.appendChild(document.createTextNode('0'));
    puntos.appendChild(ptosMax);
    ptosMax.appendChild(tituloPtosMax);
    tituloPtosMax.appendChild(document.createTextNode('Puntuacion Maxima'));
    ptosMax.appendChild(numPtosMax);
    numPtosMax.appendChild(document.createTextNode('0'));
    panelIzq.appendChild(botonIniciar);
    botonIniciar.appendChild(textoBoton);

    //ATRIBUTOS 
    contenedor.setAttribute('id','contenedor');
    panelIzq.setAttribute('id','panelIzq');
    panelDerecho.setAttribute('id','panelDerecho');
    puntos.setAttribute('id','puntos');
    ptosActual.setAttribute('id','ptosActual');
    ptosMax.setAttribute('id','ptosMax');
    botonIniciar.setAttribute('id','btnInicio');
    tiempoDiv.setAttribute('id', 'tiempoDiv');

    //Variables
    let tiempo = 30;
    let intervaloBurbujas;
    //Guardo la puntuacion maxima recuperada del localStorage
    let recordGuardado = localStorage.getItem('ptosMax');
    //si la puntuacion maxima no es nula..
    if(recordGuardado !== null) {
        numPtosMax.innerHTML = recordGuardado; 
    }

    //FUNCIONES

    /**
    * Funcion para crear un evento
    * Compatibilidad (Cross-Browser)
    */
    function crearEvento(elemento, evento, funcion) {
    
        //Compruebo si el navegador tiene addEventListener...
        if(typeof elemento.addEventListener !== 'undefined') {
            //Creo el evento
            elemento.addEventListener(evento, funcion, false);
        
        //Compruebo que el navegador tiene attachEvent
        } else if(typeof elemento.attachEvent !== 'undefined') {
            //Creo el evento
            elemento.attachEvent('on' + evento, funcion);
        // Si no tiene ninguno.. 
        } else {
            elemento['on' + evento] = funcion;
        }
    }

    //Llamo a la funcion cuando pulso el boton
    crearEvento(botonIniciar,'click',iniciarJuego);
    //Lo tenia asi antes de crear la funcion : botonIniciar.addEventListener('click', iniciarJuego, false);

    /**
     * Funcion para iniciar el juego
     */
    function iniciarJuego() {
        
        //el boton cambia de clase a desactivado
        botonIniciar.setAttribute('class', 'desactivado');
        //deshabilito el boton
        botonIniciar.setAttribute('disabled', 'true');
        /**
         * Funcion para crear burbujas cada 1sg
         */
        intervaloBurbujas = setInterval(function() {
            //llamo a la funcion generar burbujas
            generarBurbujas();
        }, 500);
        /**
         * Funcion temporizador del juego
         */
        intervaloJuego = setInterval(function() {
            tiempo--;
            //Actualizo el contador
            numTiempo.innerHTML = tiempo;
            //Si el tiempo llega a 0... se para el contador
            if(tiempo <= 0) {
                clearInterval(intervaloJuego);
                finalizarJuego();
            }
        }, 1000);
    }
    /**
     * Funcion para generar burbujas
     */
    function generarBurbujas(){
        //Creo la burbuja
        let burbuja = document.createElement('div');
        burbuja.setAttribute('class', 'burbuja');
        //La hago hija del panel derecho
        panelDerecho.appendChild(burbuja);
        //Para posicionar la burbuja de manera aleatoria utilizare Math.random y Math.floor
        //Math.random() genera un número aleatorio decimal entre 0 y 1 
        //offsetWidth nos da el ancho del panel en píxeles 
        //Le restamos 50 (tamaño de la burbuja) para que no se salga por la derecha
        //Math.floor() redondea hacia abajo para obtener píxeles enteros
        let x = Math.floor(Math.random() * (panelDerecho.offsetWidth - 50));
        let y = Math.floor(Math.random() * (panelDerecho.offsetHeight - 50));
        //Aplico las coordenadas aleatorias al estilo de la burbuja
        burbuja.style.left = x + 'px';
        burbuja.style.top = y + 'px';
        //Para que salgan de diferentes colores.. creo un array de colores
        let colores = ['red', 'blue', 'green', 'orange', 'purple', 'pink'];
        //Como antes para que vayan cambiando de posicion utilizo Math.random() y Math.floor
        let colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
        //Cambio el backgroudColor de las burbujas
        burbuja.style.backgroundColor = colorAleatorio;

        /**
         * Funcion eliminar burbuja si se clica
         * 
         * La tenia asi antes: burbuja.addEventListener('click', function() {
         *                   }, false);
         */
        crearEvento(burbuja,'click',function(){
            panelDerecho.removeChild(burbuja);
            //Modifico el DOM para sumar puntuacion actual
            //casteo a entero para poder hacer el calculo
            numPtos.innerHTML = parseInt(numPtos.innerHTML) + 1;
        })
        
        /**
         * Funcion si pasa mas de 2sg y no se ha clicado la burbuja se elimina
         */
        setTimeout(function() {
        //Compruebo primero que la burbuja se encuentra dentro del panel...
            if(panelDerecho.contains(burbuja)) {
                panelDerecho.removeChild(burbuja);
            }
        }, 2000);
    }
    /**
     * Funcion para finalizar el juego
     */
    function finalizarJuego() {
        //Paro la generacion de burbujas
        clearInterval(intervaloBurbujas);
        //Comparo puntuacion actual con la maxima
        if(parseInt(numPtos.innerHTML) > parseInt(numPtosMax.innerHTML)) {
            //Si hay record, lo guardo en localStorage
            localStorage.setItem('ptosMax',numPtos.innerHTML);
            //Actualizo visualmente la puntuacion maxima en el DOM
            numPtosMax.innerHTML = numPtos.innerHTML;
        }
        //Si existen burbujas en pantalla.. eliminarlas
        //Obtengo todos los elementos con la clase burbuja y lo meto en una variable
        let burbujas = panelDerecho.getElementsByClassName('burbuja');
        //Si la caja contiene burbujas... el bucle se repite mientras la longitud de las burbujas sea mayor que 0
        while(burbujas.length > 0) {
            //Las elimino la primera siempre
            panelDerecho.removeChild(burbujas[0]);
        }
        //FIN DEL JUEGO
        numTiempo.innerHTML = 'GAME OVER';
    }


