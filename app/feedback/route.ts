import { client } from "../../lib/prisma";

async function handler(req: Request, res: Response) {
    try {
        const { feedback, username } = await req.json();

        if (!feedback) {
            return Response.json({ error: "Feedback is required" }, { status: 400 });
        }

        const feedbackResponse = await client.feedback.create({
            data: {
                feedback: feedback,
                username: username,
            },
        });

        return Response.json(feedbackResponse);
    } catch (error: any) {
        console.error("Error creating feedback:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}

export { handler as POST };
