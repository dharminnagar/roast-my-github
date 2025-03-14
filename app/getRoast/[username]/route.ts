// Setup AI Roast API
// Use Gemini mostly
// Give the User Details + README along with a proper prompt to roast the user with AI
// Return the Roast in the response

import { prompts } from "./prompts";

async function handler(
    req: Request,
    { params }: { params: { username: string } }
) {
    const { username } = await params;
    const { userDetails, roastLength, level = "mild" } = await req.json();
    const roastLevel = level in prompts ? level : "mild";

    if (!userDetails) {
        return new Response(
            JSON.stringify({ error: "User Details not found" })
        );
    }

    const GITHUB_PROFILE_JSON = JSON.stringify(userDetails, null, 4);

    const prompt = prompts(roastLevel, GITHUB_PROFILE_JSON, roastLength);

    return new Response(JSON.stringify({ username, prompt }), {
        headers: { "Content-Type": "application/json" },
    });
}

export { handler as POST };
