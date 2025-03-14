// Setup AI Roast API
// Use Gemini mostly
// Give the User Details + README along with a proper prompt to roast the user with AI
// Return the Roast in the response

import { GoogleGenerativeAI } from "@google/generative-ai";
import { prompts, roastLevelTypes } from "./prompts";

async function handler(
    req: Request,
    { params }: { params: { username: string } }
) {
    const apiKey = process.env.GENAI_API_KEY;
    if (!apiKey) {
        return new Response(JSON.stringify({ error: "API Key not found" }));
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const { username } = await params;
    const { userDetails, roastLength, level = "mild" } = await req.json();
    console.log("level:", level);
    const roastLevel = (["mild", "medium", "extreme"] as const).includes(
        level as roastLevelTypes
    )
        ? (level as "mild" | "medium" | "extreme")
        : "mild";

    if (!userDetails) {
        return new Response(
            JSON.stringify({ error: "User Details not found" })
        );
    }

    const GITHUB_PROFILE_JSON = JSON.stringify(userDetails, null, 4);

    const prompt = prompts(roastLevel, GITHUB_PROFILE_JSON, roastLength);

    const modelRequest = await model.generateContent(prompt);
    const modelResponse = await modelRequest.response.text();

    return new Response(modelResponse);
}

export { handler as POST };
