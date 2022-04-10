try {
    fetch('https://api.applause-button.com/get-claps?url=https://notes.aliif.space/awal-mula-masuk-goa-suci/', {
        method: "GET",
        headers: {"Referer": "robot"}
        })
        .then(response => response.text()) 
        .then(text => document.getElementById('header').innerHTML = text);
}
catch(err) {
    document.getElementById('header').innerHTML = 0;
}