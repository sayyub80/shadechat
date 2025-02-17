import { GoogleGenerativeAI } from "@google/generative-ai"

const GeminiApi = process.env.GEMINI_API_KEY
if (!GeminiApi) {
    throw new Error("GEMINI_API_KEY environment variable is not set")
}

const genAI = new GoogleGenerativeAI(GeminiApi as string);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default model;