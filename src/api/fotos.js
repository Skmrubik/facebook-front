export function subirFoto(formData) {
    return fetch('http://localhost:8080/upload',
        {
            method: 'POST',
            body: formData
        }
    )
    .then((response) => response.json())
}

export function guardarPathFoto(nombre) {
    return fetch('http://localhost:8080/guardarFoto?nombre='+nombre)
        .then((response) => response.json())
}