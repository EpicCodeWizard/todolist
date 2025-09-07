import { db } from "../config";

export async function POST(request: Request) {
    const { user, todos } = await request.json();
    console.log(user, todos);
    await db.push(`/${user}`, todos, true);
    return Response.json({ success: true });
}