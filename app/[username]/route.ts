import { client } from "../../lib/prisma";

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
    const { getFromDatabase, roastLength, level = "mild" } = await req.json();
    if (getFromDatabase) {
        try {
            const roast = await client.user.findUnique({
                where: {
                    username_roastLevel_roastLength: {
                        username: username,
                        roastLevel: level,
                        roastLength: roastLength,
                    },
                },
            });

            console.log("Roast found in the database");

            if (roast) {
                return new Response(JSON.stringify(roast.roast), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            }
        } catch (e: any) {
            console.log("Roast not found in the database. Creating one...", e.message);
        }
    }

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

        try {
            const user = await client.user.upsert({
                where: {
                    username_roastLevel_roastLength: {
                        username: username,
                        roastLevel: level,
                        roastLength: roastLength,
                    },
                },
                update: {
                    // Update existing record
                    roast: roast,
                },
                create: {
                    // Create new record if not exists
                    username: username,
                    roastLevel: level,
                    roastLength: roastLength,
                    roast: roast,
                },
            });

            await client.analytics.update({
                where: {
                    id: "1",
                },
                data: {
                    numberOfRoasts: {
                        increment: 1,
                    },
                },
            });
        } catch (e: any) {
            console.log("Error saving roast to database", e.message);
            return;
        }
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
