document.getElementById('codeForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const language = document.getElementById('language').value;
    const script = document.getElementById('script').value;
    const stdin = document.getElementById('stdin').value;

    const requestData = {
        language: language,
        script: script,
        stdin: stdin
    };

    try {
        const response = await fetch('http://localhost:3000/api/execute/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();
        document.getElementById('output').innerText = data.output;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('output').innerText = 'An error occurred while executing the code.';
    }
});
