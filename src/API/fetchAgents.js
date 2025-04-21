
function fetchAgents () {
    return fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            return data.map((user) => ({
                email: user.email,
            }));
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

export default fetchAgents;