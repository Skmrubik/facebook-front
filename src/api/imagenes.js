export function getImagen(nombre) {
    return fetch('http://localhost:8080/imagenes/'+nombre)
        .then((response) => response.json())
}