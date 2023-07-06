const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPEN_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateNotes = async (req, res) => {
  const { question, topic } = req.body;

  const prompt = `Question: ${question}\nTopic: ${topic}\nAnswer:`;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 10,
      temperature: 0,
      top_p: 1,
      n: 1,
      stream: false,
      logprobs: null,
      stop: "\n",
    });

    const answer = response.choices[0].text.trim();

    res.status(200).json({
      success: true,
      data: answer,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: "Failed to generate the explanation",
    });
  }
};

// userInterface.on("line", async (input) => {
//     await openai
//       .createChatCompletion({
//         model: "gpt-3.5-turbo",
//         messages: [{ role: "user", content: input }],
//       })
//       .then((res) => {
//         console.log(res.data.choices[0].message.content);
//         userInterface.prompt();
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   });

module.exports = { generateNotes };
