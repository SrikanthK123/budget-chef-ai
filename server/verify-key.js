require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function verifyKey() {
    const key = process.env.GEMINI_API_KEY;
    console.log(`Checking API Key: ${key ? key.substring(0, 10) + '...' : 'MISSING'}`);

    if (!key) {
        console.error("❌ API Key is missing in .env");
        return;
    }

    const genAI = new GoogleGenerativeAI(key);
    const modelName = "gemini-2.0-flash";
    const model = genAI.getGenerativeModel({ model: modelName });

    console.log(`Attempting to generate content with model: ${modelName}...`);

    try {
        const result = await model.generateContent("Test prompt: Say hello.");
        const response = await result.response;
        const text = response.text();
        console.log("✅ API Key is WORKING!");
        console.log("Response:", text);
    } catch (error) {
        console.error("❌ API Call Failed:");
        console.error(error.message);
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", JSON.stringify(error.response.data, null, 2));
        }
    }
}

verifyKey();
