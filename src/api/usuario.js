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

export function getPathFoto(id) {
    return fetch('http://localhost:8080/pathFoto?id='+id)
        .then((response) => response.json())
}

export function subirFoto(formData) {
    return fetch('http://localhost:8080/upload',
        {
            method: 'POST',
            body: formData
        }
    )
    .then((response) => response.json())
}