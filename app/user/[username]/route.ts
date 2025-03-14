import { NextRequest } from "next/server";

async function handler(
    req: NextRequest,
    { params }: { params: { username: string } }
) {
    const token = process.env.GITHUB_TOKEN;
    const { username } = await params;
    console.log(username);

    const userDetails = await fetchUserDetails(username);
    userDetails.contributions = await fetchTotalContributions(token, username);
    userDetails.readme = await fetchUserREADME(username);

    return new Response(JSON.stringify(userDetails), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

async function fetchUserDetails(username: string) {
    try {
        const ghResponse = await fetch(
            `https://api.github.com/users/${username}`
        );
        if (!ghResponse.ok) {
            throw new Error("User not found");
        }

        const userDetails = await ghResponse.json();

        return userDetails;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

async function fetchUserREADME(username: string) {
    try {
        const url = `https://api.github.com/repos/${username}/${username}/contents/README.md`;
        const ghResponse = await fetch(url);
        if (!ghResponse.ok) {
            throw new Error("README not Found");
        }

        const ghResponseJSON = await ghResponse.json();
        const userREADMEEncoded = ghResponseJSON["content"];

        // // Decode the README from base64
        const decode = (str: string): string =>
            Buffer.from(str, "base64").toString("binary");

        const userREADME = decode(userREADMEEncoded);

        return userREADME;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

async function fetchTotalContributions(
    token: string | undefined,
    username: string
) {
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    const body = {
        query: `
            query {
                user(login: "${username}") {
                    contributionsCollection {
                        totalCommitContributions
                        totalIssueContributions
                        totalPullRequestContributions
                        totalPullRequestReviewContributions
                    }
                }
            }
        `,
    };
    try {
        const ghResponse = await fetch(`https://api.github.com/graphql`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
        });
        if (!ghResponse.ok) {
            throw new Error("Contributions not found");
        }

        const contributions = await ghResponse.json();
        const contributionsData =
            contributions.data.user.contributionsCollection;
        return contributionsData;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export { handler as GET };
