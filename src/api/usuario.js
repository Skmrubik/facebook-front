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