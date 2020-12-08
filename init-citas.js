
if(navigator.serviceWorker){
    if(window.location.href.includes("localhost") || window.location.href.includes("127.0.0.1")){
        navigator.serviceWorker.register("/sw.js");
    } else { 
        navigator.serviceWorker.register("/breakingapp/sw.js");
    }
}


window.mostrar = (personajes)=>{
    const molde = document.querySelector(".molde-citas");
    const contenedor = document.querySelector(".contenedor");

    for(let i=0; i < personajes.length; ++i){
        let p = personajes[i];
        let copia = molde.cloneNode(true);
        copia.querySelector('.nombre-personaje').innerText = p.author;
        copia.querySelector('.citas-personaje').innerText = p.quote;
        copia.querySelector('.series').innerText = p.series;
        contenedor.appendChild(copia);
    }
};
//Listener que esta escuchando cuando la pagina se carga
window.addEventListener('DOMContentLoaded', async () => {
    let respuesta = await axios.get("https://breakingbadapi.com/api/quotes");
    //Obtener los datos por consola, primero la peticion, 
    //luego los datos y luego el resultado de los datos
    let personajes = respuesta.data;
    window.mostrar(personajes);
});
