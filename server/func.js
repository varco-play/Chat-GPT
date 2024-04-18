import OpenAI from "openai";
import express from "express";

const router = express.Router();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
          ],
        },
      ],
    });
    console.log(response.choices[0]);

    res.status(200).json({ res: response.choices[0] });
  } catch (err) {
    res.status(401).json(err);
  }
});

export default router;
