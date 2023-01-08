const { Configuration, OpenAIApi } = require("openai"); // Require the OpenAI node library.

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Hide the API Key in a dotenv file.
});
const openai = new OpenAIApi(configuration); // Instantiate the library with the apiKey.

const generateImage = async (req, res) => {
    const { prompt, size } = req.body; 
    const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

    try {
        const response = await openai.createImage({
            prompt, //This prompt is where the user input goes into.
            n: 1, //To limit the token usage and overall cost, it is limited to 1 image gen.
            size: imageSize //imageSize is a variable, but is limited to three options.
        });

        const imageUrl = response.data.data[0].url // Take the URL from the response.

        res.status(200).json({
            success: true,
            data: imageUrl
        });
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
          } else {
            console.log(error.message);
          }
        res.status(400).json({ // Error handling.
            success: false,
            error: 'The image could not be generated.'
        });
    }
}

module.exports = {generateImage};