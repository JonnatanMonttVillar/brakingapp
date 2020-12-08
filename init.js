
if(navigator.serviceWorker){
    if(window.location.href.includes("localhost") || window.location.href.includes("127.0.0.1")){
        navigator.serviceWorker.register("/sw.js");
    } else { 
        navigator.serviceWorker.register("/breakinapp/sw.js");
    }
}


window.mostrarPersonaje = function(){
    //Tomar todos los datos de personajes y renderizarlos dentro del molde
    let molde = document.querySelector('.molde-personaje-alert').cloneNode(true);
    let personaje = this.personaje;
    molde.querySelector('.titulo-personaje').innerText = personaje.name;
    molde.querySelector('.nick-personaje').innerText = personaje.nickname;
    molde.querySelector('.cumple-personaje').innerText = personaje.birthday;
    //molde.querySelector('.estado-personaje').innerText = personaje.status;
    //molde.querySelector('.icono-stado').innerText = personaje.status;
    const icono = molde.querySelector('.icono-stado');
    if(personaje.status == "Deceased"){
        icono.classList.add("fas","fa-skull-crossbones", "text-danger")
    }else if(personaje.status == "Alive"){
        icono.classList.add("far","fa-heart", "text-info")
    }else if(personaje.status == "Presumed dead"){
        icono.classList.add("fas","fa-question-circle", "text-info")
    }

    molde.querySelector('.imagen-per').src = personaje.img;

    Swal.fire({
        title: personaje.nickname,
        html: molde.innerHTML
    });
};

window.mostrar = (personajes)=>{
    const molde = document.querySelector(".molde-personaje");
    const contenedor = document.querySelector(".contenedor");

    for(let i=0; i < personajes.length; ++i){
        let p = personajes[i];
        let copia = molde.cloneNode(true);
        copia.querySelector('.nombre-personaje').innerText = p.name;
        copia.querySelector('.imagen-personaje').src = p.img;
        copia.querySelector('.btn-personaje').personaje = p;
        copia.querySelector('.btn-personaje').addEventListener('click', window.mostrarPersonaje);
        contenedor.appendChild(copia);
    }
};
//Listener que esta escuchando cuando la pagina se carga
window.addEventListener('DOMContentLoaded', async () => {
    let respuesta = await axios.get("https://breakingbadapi.com/api/characters");
    //Obtener los datos por consola, primero la peticion, 
    //luego los datos y luego el resultado de los datos
    let personajes = respuesta.data;
    window.mostrar(personajes);
});