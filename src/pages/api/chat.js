import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

let messages = [];
let currentChatId = null;

export async function get({ request: req, url }) {
    const msg = url.searchParams.get("msg")
    const newChatId = url.searchParams.get("id")

    if (newChatId !== currentChatId) {
        messages = [];
        currentChatId = newChatId
    }

    messages.push({
        role: "user",
        content: msg
    });

    const answer = await completeChat(messages)

    messages.push({
        role: "assistant",
        content: answer
    });

    console.log(messages);

    return new Response(JSON.stringify({ answer }), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
}

async function completeChat(messages) {
    const completionResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0613",
        messages
    });

    return completionResponse.choices[0].message.content;
}
