document.addEventListener("DOMContentLoaded", function () {
    const getJokeBtn = document.getElementById("getJokeBtn");
    const clearAllBtn = document.getElementById("clearAllBtn");
    const jokesList = document.getElementById("jokesList");
    
    //obtener un chiste de la API
    async function fetchJoke() {
        try {
            const response = await fetch("https://api.chucknorris.io/jokes/random");
            const data = await response.json();
            return data.value;
        } catch (error) {
            console.error("Error fetching joke:", error);
            return "Error fetching joke.";
        }
    }

    //renderizar los chistes en el DOM
    function renderJokes(jokes) {
        jokesList.innerHTML = "";
        jokes.forEach((joke, index) => {
            const li = document.createElement("li");
            li.textContent = joke;
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Eliminar";
            deleteBtn.addEventListener("click", () => {
                deleteJoke(index);
            });
            li.appendChild(deleteBtn);
            jokesList.appendChild(li);
        });
    }

    //guardar los chistes en localStorage
    function saveJokes(jokes) {
        localStorage.setItem("jokes", JSON.stringify(jokes));
    }

    //cargar los chistes desde localStorage
    function loadJokes() {
        const jokes = localStorage.getItem("jokes");
        return jokes ? JSON.parse(jokes) : [];
    }

    //agregar un nuevo chiste
    async function addJoke() {
        const joke = await fetchJoke();
        const jokes = loadJokes();
        jokes.push(joke);
        saveJokes(jokes);
        renderJokes(jokes);
    }

    //eliminar un chiste por su índice
    function deleteJoke(index) {
        const jokes = loadJokes();
        jokes.splice(index, 1);
        saveJokes(jokes);
        renderJokes(jokes);
    }

    //eliminar todos los chistes
    function clearAllJokes() {
        localStorage.removeItem("jokes");
        renderJokes([]);
    }


    getJokeBtn.addEventListener("click", addJoke);
    clearAllBtn.addEventListener("click", clearAllJokes);


    renderJokes(loadJokes());
});