/**
 * A handler for the POST request to get a roast of the user
 * @param req roastLength: number, level: "mild" | "medium" | "extreme"
 * @param param1 username: string
 * @returns A roast of the user based on their profile data
 */
async function handler(req: Request, { params }: { params: Promise<{ username: string }> }) {
    const SERVER_URL = process.env.SERVER_URL;
    if (!SERVER_URL) {
        return new Response(JSON.stringify({ error: "Server URL not found" }));
    }

    const { username } = await params;
    const { roastLength, level = "mild" } = await req.json();
    try {
        const userDetails = await (await fetch(`${SERVER_URL}/user/${username}`)).text();

        if (JSON.parse(userDetails).error) {
            return new Response(null);
        }

        const roast = await (
            await fetch(`${SERVER_URL}/getRoast/${username}`, {
                method: "POST",
                body: JSON.stringify({
                    userDetails,
                    roastLength: roastLength,
                    level: level,
                }),
            })
        ).text();

        return new Response(JSON.stringify(roast), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }));
    }
}

export { handler as POST };
