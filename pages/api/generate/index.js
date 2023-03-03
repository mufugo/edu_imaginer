const REPLICATE_MODEL_VERSION =
  "db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf";
const startGeneration = async (prompt) => {
  const response = await fetch(`${process.env.REPLICATE_API_URL}/predictions`, {
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      version: REPLICATE_MODEL_VERSION,
      input: { prompt },
    }),
  });
  return response.json();
};

const getGeneration = async (url) => {
  const result = await fetch(url, {
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  return result.json();
};

export default async function handler(req, res) {
  const { prompt } = req.body;
  
  if (!prompt) {
    res.status(400).json({ message: "No prompt provided" });
  }
  
  // const predictions = await startGeneration(prompt);

  await new Promise((resolve) => setTimeout(resolve, 1000));
  let generatedImage;
/*   while (!generatedImage) {
    const result = await getGeneration(predictions.urls.get);
    if (result.status === "succeeded") {
      [generatedImage] = result.output;
    } else if (result.status === "failed") {
      return res.status(500).json({ message: "Creating failed" });
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  } */

  res
    .status(200)
    .json(generatedImage ? generatedImage : "Failed to create the image");
}
