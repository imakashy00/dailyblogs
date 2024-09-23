import { GoogleGenerativeAI } from "@google/generative-ai"


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function getMood(journal:string){
    const moodPrompt = `return the mood of the following journal: ${journal} in one word string in small case. mood can be 'happy' or 'sad' or 'neutral' or 'angry'`;

    const mood = await model.generateContent(moodPrompt);

    // const wordspropmpt = `return the number of words in the following journal: ${journal} in one word like '29'`;

    // const words = await model.generateContent(wordspropmpt);

    return mood.response.text()
}