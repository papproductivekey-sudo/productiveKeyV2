
document.addEventListener('DOMContentLoaded', function() {
    fetch('https://www.instagram.com/pap_productive_key/')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const description = doc.querySelector('meta[property="og:description"]').getAttribute('content');
            const followers = description.match(/(\d+,?\d*)\sFollowers/)[1];
            
            document.getElementById('instagram-followers').innerText = `Seguidores: ${followers}`;
        })
        .catch(error => {
            console.error('Error fetching Instagram data:', error);
            document.getElementById('instagram-followers').innerText = 'Não foi possível carregar os seguidores.';
        });
});
