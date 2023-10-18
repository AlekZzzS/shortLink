async function shortenUrl() {
    const fullUrl = document.getElementById('fullUrl').value;
    const customAlias = document.getElementById('customAlias').value;
    const urlList = document.getElementById('urlList');

    const isValidUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(fullUrl);

    if (!isValidUrl) {
        const errorElement = document.createElement('div');
        errorElement.innerHTML = '<div class="error">Invalid URL</div>';
        urlList.appendChild(errorElement);
        return;
    }

    const response = await fetch('/shorten', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullUrl, customAlias }),
    });

    const data = await response.json();
    if (response.ok) {
        const urlElement = document.createElement('div');
        urlElement.innerHTML = `<div>Shortened URL:<a href="${data.fullUrl}" target="_blank">${data.alias}</a></div>`;
        urlList.appendChild(urlElement);
    } else {
        const urlElement = document.createElement('div');
        urlElement.innerHTML = `<div class="error">${data.error}</div>`;
        urlList.appendChild(urlElement);
    }
}