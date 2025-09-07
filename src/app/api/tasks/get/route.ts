import { db } from "../config";

export async function POST(request: Request) {
    const { user } = await request.json();
    console.log(user);
    const mydata = await db.getData(`/${user}`);
    return Response.json(mydata);
}
