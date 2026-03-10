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

export function getMegusta(idUser,idPub) {
    return fetch('http://localhost:8080/getMegusta?idUser='+idUser+'&idPub='+idPub)
        .then((response) => response.json())
}

export function borrarMegusta(id) {
    return fetch('http://localhost:8080/borrarMegusta?id='+id,
    {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then((response) => response.json())
}

export function getPublicacionById(idPub) {
    return fetch('http://localhost:8080/getPublicacionById?id='+idPub)
        .then((response) => response.json())
}


export function enviarNotificacion(notificacion) {
    return fetch('http://localhost:8080/guardarNotificacion',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(notificacion)
        }
    )
    .then((response) => response.json())
} 

export function marcarComoLeido(idNot) {
    return fetch('http://localhost:8080/marcarComoLeida?idNot='+idNot,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        }
    )
        .then((response) => response.json())
}