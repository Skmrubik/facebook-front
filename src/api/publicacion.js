export function listarPublicaciones() {
    return fetch('http://localhost:8080/listPublicaciones')
        .then((response) => response.json())
}

export function publicarInicio(publicacion) {
    return fetch('http://localhost:8080/publicarInicio',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(publicacion)
        }
    )
    .then((response) => response.json())
}