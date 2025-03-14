import { NextRequest } from "next/server";

async function handler(req: NextRequest, { params }: { params: Promise<{ username: string }> }) {
    const token = process.env.GITHUB_TOKEN;
    const { username } = await params;

    const userDetails = await fetchUserDetails(token, username);
    if (!userDetails) {
        return new Response(JSON.stringify({ error: "User Details not found" }));
    }
    userDetails.contributions =
        (await fetchTotalContributions(token, username))?.totalCommitContributions || 0;
    userDetails.readme = (await fetchUserREADME(token, username))?.slice(0) || "";
    userDetails.repos = (await fetchGitHubRepos(token, username))?.slice(0) || [];
    userDetails.mostUsedLanguage = getMostUsedLanguage(userDetails.repos) || "No Repositories";

    return new Response(JSON.stringify(userDetails), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

async function fetchUserDetails(token: string | undefined, username: string) {
    try {
        const ghResponse = await fetch(`https://api.github.com/users/${username}`, {
            headers: {
                Authorization: `token ${token}`,
            },
        });
        if (!ghResponse.ok) {
            throw new Error("User not found");
        }

        const userDetails = await ghResponse.json();

        return userDetails;
    } catch (error: any) {
        console.log("User not found", error.message);
        return null;
    }
}

async function fetchUserREADME(token: string | undefined, username: string) {
    try {
        const url = `https://api.github.com/repos/${username}/${username}/contents/README.md`;
        const ghResponse = await fetch(url, {
            headers: {
                Authorization: `token ${token}`,
            },
        });
        if (!ghResponse.ok) {
            throw new Error("README not Found");
        }

        const ghResponseJSON = await ghResponse.json();
        const userREADMEEncoded = ghResponseJSON["content"];

        // Decode the README from base64
        const decode = (str: string): string => Buffer.from(str, "base64").toString("binary");

        const userREADME = decode(userREADMEEncoded);

        return userREADME;
    } catch (error: any) {
        console.log("README not found", error.message);
        return null;
    }
}

async function fetchTotalContributions(token: string | undefined, username: string) {
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
        const contributionsData = contributions.data.user.contributionsCollection;
        return contributionsData;
    } catch (error: any) {
        console.log("Contributions not found", error.message);
        return null;
    }
}

async function fetchGitHubRepos(token: string | undefined, username: string) {
    try {
        const ghResponse = await fetch(
            `https://api.github.com/users/${username}/repos?per_page=100`,
            {
                headers: {
                    Authorization: `token ${token}`,
                },
            }
        );
        if (!ghResponse.ok) {
            throw new Error(`GitHub repos fetch failed with status ${ghResponse.status}`);
        }

        const repos = await ghResponse.json();
        return repos;
    } catch (error: any) {
        console.log("GitHub repos fetch failed", error.message);
        return null;
    }
}

function getMostUsedLanguage(repos: any[]): string {
    if (!repos) {
        return "No Repositories";
    }
    const languageCounts: { [key: string]: number } = {};
    repos.forEach((repo: any) => {
        const language = repo.language;
        if (language) {
            languageCounts[language] = (languageCounts[language] || 0) + 1;
        }
    });
    return Object.keys(languageCounts).reduce(
        (a, b) => (languageCounts[a] > languageCounts[b] ? a : b),
        Object.keys(languageCounts)[0]
    );
}

export { handler as GET };
