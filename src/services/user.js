const url = 'https://todo-nodemy.herokuapp.com/user'

const login = (username, password) => {
    return fetch(url + '/login', {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({username: username, password: password})
    }) 
    .then(resp => resp.json())
}
export const register = (username, password) => {
    return fetch(url + '/register', {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({username: username, password: password})
    }) 
    .then(resp => resp.json())
}


export default login