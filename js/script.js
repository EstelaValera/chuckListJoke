
const fetchJoke = document.getElementById('fetchJoke');
const jokeList = document.getElementById('jokeList');
const btnDelete = document.querySelector('btnDelete')
let jokes = []

const getJoke = () => {
    fetch('https://api.chucknorris.io/jokes/random')
    .then (response => {
        if (!response.ok) {
            throw new Error ("la solicitud no fue existosa")
        } return response.json()
    }
    ).then (joke => {
        const template = `<li><p>${joke.value}</p><button class="btnDelete">Eliminar</button></li>`
        jokeList.innerHTML += template
        jokes.push(joke.value)
        localStorage.setItem("joke", JSON.stringify(jokes))
        
    }
        
    ).catch ((error) => {
        console.error('Error al cargar el chiste:', error);
    }) 
}
fetchJoke.addEventListener("click", ()=>{ 
    getJoke(fetchJoke)
})

window.addEventListener("load", () => {
    const chistesguardados = JSON.parse(localStorage.getItem('joke'))
    chistesguardados.forEach(joke => {
        const template = `<li><p>${joke}</p><button class="btnDelete">Eliminar</button></li>`
        jokeList.innerHTML += template 
    })
    console.log(chistesguardados)
})

console.log(localStorage)

btnDelete.addEventListener("click", ()=>{ 
    localStorage.removeItem("joke")
    jokeList.innerHTML = ""
})
