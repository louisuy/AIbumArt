function onImageSubmit(e) {
    // e.preventDefault();
  
    document.querySelector('.msg').textContent = '';
    // document.querySelector('#image').src = '';
  
    var genre = document.querySelector('input[name="genre"]:checked').value;
    var mood = document.querySelector('input[name="mood"]:checked').value;
    var time = document.querySelector('input[name="time"]:checked').value;

    const prompt = "generate a DALL-E2 prompt for a " + genre + " " + mood + " " + time + " album, cinematic still, shot on film";
    const size = 'medium';
  
    if (prompt === '') {
      alert('Please add some text');
      document.querySelector('#image').src = '../assets/albumart.png';
      return;
    }

    document.getElementById("results").innerHTML = "generate a DALL-E2 prompt for a " + genre + " " + mood + " " + time + " album, cinematic still, shot on film";
    generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
  try {
    const response = await fetch('/openai/generateimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error('The image could not be generated.');
    }

    const data = await response.json();
    console.log(data);

    const imageUrl = data.data;

    document.querySelector('#image').src = imageUrl;
    document.getElementById('bg-image').style.backgroundImage = "url('" + imageUrl + "')";
  } catch (error) {
    document.querySelector('.msg').textContent = error;
  }
}