import { client } from "@/lib/prisma";

async function handler(req: Request, res: Response) {
    const { feedback } = await req.json();

    if (!feedback) {
        return new Response(JSON.stringify({ error: "Feedback not found" }), { status: 403 });
    }

    try {
        const feedbackResponse = await client.feedback.create({
            data: {
                feedback: feedback,
            },
        });

        return new Response(JSON.stringify(feedbackResponse), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }));
    }
}

export { handler as POST };
