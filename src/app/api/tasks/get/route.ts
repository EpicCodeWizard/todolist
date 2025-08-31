const taskList = {
    amogh: [
        { id: 1, text: "Eat breakfast" },
        { id: 2, text: "Cross country 8 mile run **on creatine**" },
        { id: 3, text: "Drink water" }
    ],
    sarvesh: [
        { id: 1, text: "Eat breakfast" },
        { id: 2, text: "Build ChatGPT 6.0" },
        { id: 3, text: "Drink water" }
    ]
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    // @ts-ignore
    return Response.json(taskList[searchParams.get("user")]);
}