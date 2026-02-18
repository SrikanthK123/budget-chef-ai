const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        // There isn't a direct listModels method in the SDK easily accessible without digging, 
        // but we can try to generate content with a known model and see if it works.
        // Or we can just try a few models and see which one doesn't throw 404.

        const models = ["gemini-pro", "gemini-1.5-flash", "gemini-1.5-pro", "gemini-1.0-pro"];

        const fs = require('fs');
        const logFile = 'model-test-result.txt';
        fs.writeFileSync(logFile, ''); // Clear file

        for (const modelName of models) {
            const msg = `Testing model: ${modelName}\n`;
            console.log(msg);
            fs.appendFileSync(logFile, msg);
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hello");
                const successMsg = `✅ ${modelName} is working.\n`;
                console.log(successMsg);
                fs.appendFileSync(logFile, successMsg);
            } catch (error) {
                const failMsg = `❌ ${modelName} failed: ${error.message}\n`;
                console.log(failMsg);
                fs.appendFileSync(logFile, failMsg);
            }
        }

    } catch (error) {
        console.error("Global Error:", error);
    }
}

listModels();
