export function registrarUsuario(usuario) {
    return fetch('http://localhost:8080/registrarUsuario',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        }
    )
    .then((response) => response.json())
}

export function login(nombre, password) {
    return fetch('http://localhost:8080/login?nombre='+nombre+'&password='+password)
        .then((response) => response.json())
}

export function getUsuario(id) {
    return fetch('http://localhost:8080/getUsuarioById?id='+id)
        .then((response) => response.json())
}

export function getPathFoto(id) {
    return fetch('http://localhost:8080/pathFoto?id='+id)
        .then((response) => response.json())
}

