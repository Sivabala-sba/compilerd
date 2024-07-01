document.getElementById('enableStdin').addEventListener('change', function () {
    const stdinField = document.getElementById('stdin');
    stdinField.disabled = !this.checked;
});

document.getElementById('codeForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const language = document.getElementById('language').value;
    const script = document.getElementById('script').value;
    const enableStdin = document.getElementById('enableStdin').checked;
    const stdin = enableStdin ? document.getElementById('stdin').value : '';

    const requestData = {
        language: language,
        script: script
    };

    if (enableStdin) {
        requestData.stdin = stdin;
    }

    try {
        const response = await fetch('http://localhost:3000/api/execute/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        document.getElementById('output').innerText = data.output;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('output').innerText = 'An error occurred while executing the code.';
    }
});
