//ENTORNO
var g = 1.622;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
//NAVE
var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var c = 100;
var a = g; //la aceleración cambia cuando se enciende el motor de a=g a a=-g (simplificado)
//MARCADORES
var velocidad = null;
var altura = null;
var combustible = null;
var aterrizado = false;

//al cargar por completo la página...
window.onload = function(){
	
	velocidad = document.getElementById("velocidad");
	altura = document.getElementById("altura");
	combustible = document.getElementById("fuel");

	
	//Haciendo posible que se pausa la partida
	document.getElementById("reanudar").onclick=function(){
		reanudar();
	};
	document.getElementById("pausa").onclick=function(){
		pausar();
	};
	
	//mostrar menú móvil
    	document.getElementById("showm").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "block";
		stop();
	}
	//ocultar menú móvil
	document.getElementById("hidem").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "none";
		start();
	}
	//encender/apagar el motor al hacer click en la pantalla
	document.onclick = function () {
 	  if (a==g){
  		motorOn();
 	  } else {
  		motorOff();
 	  }
	}
	//encender/apagar al apretar/soltar una tecla
	document.onkeydown = function(event){
		if (event.keyCode == 32){
			motorOn();
		}
	}
	document.onkeyup = motorOff;
	
	//Empezar a mover la nave justo después de cargar la página
	start();
}

//Definición de funciones
function start(){
	//cada intervalo de tiempo mueve la nave
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){
	clearInterval(timer);
}

function moverNave(){
	//cambiar velocidad y posicion
	v +=a*dt;
	y +=v*dt;
	//actualizar marcadores
	velocidad.innerHTML=v.toFixed(2);
	altura.innerHTML=y.toFixed(2);
	
	//mover hasta que top sea un 70% de la pantalla
	if (y<70){ 
		document.getElementById("nave").style.top = y+"%"; 
	} else { 
		document.getElementById("velocidad").innerHTML="";
		document.getElementById("altura").innerHTML="";
		aterrizado=true;
		if (v>4) {
			lose();
		}
		else {
			win();
		}
	}
}
function motorOn(){

	document.getElementById("imgMotor").style.display="block";
	//el motor da aceleración a la nave
	a=-g;
	//mientras el motor esté activado gasta combustible
	if (timerFuel==null)
	timerFuel=setInterval(function(){ actualizarFuel(); }, 10);	
}
function motorOff(){
	a=g;
	clearInterval(timerFuel);
	timerFuel=null;
	document.getElementById("imgMotor").style.display="none";
}
function actualizarFuel(){
	//Restamos combustible hasta que se agota
	c-=0.1;
	if (c < 0 ) c = 0;
	combustible.innerHTML=c.toFixed(0);
	//Esto es para cuando el combustible llegue a 0 que no puedas seguir utilizando mas la gasolina
	if (c<=0) {
		motorOff();
	}
}

function win(){
	document.getElementById("Ganador").style.display = "block";
	stop();
}

function lose(){
	document.getElementById("nave1").src = "img/explosion.gif";
	document.getElementById("Perdedor").style.display = "block";
	stop();		
}

function reanudar() {
	start();
	document.getElementById("reanudar").style.display="none";
	document.getElementById("pausa").style.display="inline-block";
}

function pausar() {
	stop();
	document.getElementById("pausa").style.display="none";
	document.getElementById("reanudar").style.display="inline-block";
}