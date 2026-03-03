export function listarPublicaciones() {
    return fetch('http://localhost:8080/listPublicaciones')
        .then((response) => response.json())
}