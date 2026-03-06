export function listarPublicaciones() {
    return fetch('http://localhost:8080/listPublicaciones')
        .then((response) => response.json())
}

export function listarPublicacionesUsuario(idUser) {
    return fetch('http://localhost:8080/listPublicacionesByUser?id='+idUser)
        .then((response) => response.json())
}


export function listarMeGustasPublicacion(idPub) {
    return fetch('http://localhost:8080/publicacionListMegusta?idPub='+idPub)
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

export function meGustaPublicacion(idUsuario, idPublicacion) {
    return fetch('http://localhost:8080/meGustaPublicacion?idUser='+idUsuario+'&idPub='+idPublicacion,
        {
            method: 'POST',
        }
    )
    .then((response) => response.json())
}

export function borrarPublicacion(id) {
    return fetch('http://localhost:8080/borrarPublicacion?id='+id,
    {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then((response) => response.json())
}