document.addEventListener('DOMContentLoaded', () => {
    const chuckNorrisButton = document.getElementById('chuckNorrisButton');
    const adviceButton = document.getElementById('adviceButton');
    const jokeButton = document.getElementById('jokeButton');
    const output = document.getElementById('output');
    const countd = document.getElementById('count');

    var countVal = 0;
    chuckNorrisButton.addEventListener('click', async () => {
        output.innerHTML = await fetchJoke('https://api.chucknorris.io/jokes/random')
    });

    adviceButton.addEventListener('click', async () => {
        output.innerHTML = await fetchJoke('https://api.adviceslip.com/advice');
    });

    jokeButton.addEventListener('click', async () => {
        output.innerHTML = await fetchJoke('https://v2.jokeapi.dev/joke/Any');
    });

    async function fetchJoke(apiUrl) {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log({ data })

            if (data.value) {
                return `Joke type: ${data.categories[0] ?? 'PG'}<br><br><p>${data.value}<br><br><br>Posted on: ${data.created_at} </p>`;
            } else if (data.slip) {
                return `<p>${data.slip.advice}</p>`;
            } else if (data.setup && data.delivery&& data.category ) {
                return `<p>Joke type: ${data.category}<br><br>Joke: ${data.setup}<br><br>Sway: ${data.delivery}</p>`;
            } else {
                return `<p>No joke or advice available.</p>`;
            }
            console.log(data)


        } catch (error) {

            console.error('Error fetching joke:', error);
            return '<p>An error occurred while fetching the joke.</p>';
        }
    }
});
