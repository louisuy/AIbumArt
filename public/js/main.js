// require("dotenv").config();
// const musixmatchApiKey = process.env.MUSIXMATCH_API_KEY;
// const musixmatchApiKey = 'c5f9e1bcd3ecbcbea1c059aa63851e77';

function onImageSubmit(e) {
    e.preventDefault();
  
    document.querySelector('.msg').textContent = '';
    document.querySelector('#image').src = '/placeholder.png';
  
    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;
    // const size = 'large';
  
    if (prompt === '') {
      alert('Please add some text');
      document.querySelector('#image').src = '/placeholder.png';
      return;
    }
  
    generateImageRequest(prompt, size);
}

// function onLyricSubmit(e) {
//     // Prevent the form from submitting and refreshing the page
//     e.preventDefault();

//     // Get the track name from the form
//     const trackName = document.getElementById("track-name").value;
//     console.log(musixmatchApiKey, trackName)
//     // Call the searchMusixmatch function with the API key
//     searchMusixmatch(musixmatchApiKey, trackName);
// }

// function searchMusixmatch(musixmatchApiKey, trackName) {
//   // Make a request to the Musixmatch API using the fetch API
//   fetch(`https://api.musixmatch.com/ws/1.1/track.search?apikey=${musixmatchApiKey}&q_track=${trackName}`)
//     .then((response) => response.json())
//     .then((data) => {
//       // Print the API response to the page
//       const resultDiv = document.getElementById("result");
//       resultDiv.innerHTML = JSON.stringify(data, null, 2);
//     });
// }
  
async function generateImageRequest(prompt, size) {
  try {
    showSpinner();

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
    // console.log(data);

    const imageUrl = data.data;

    document.querySelector('#image').src = imageUrl;

    removeSpinner();
  } catch (error) {
    document.querySelector('.msg').textContent = error;
  }
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

// document.querySelector('#lyric-form').addEventListener('submit', onLyricSubmit);
document.querySelector('#image-form').addEventListener('submit', onImageSubmit);