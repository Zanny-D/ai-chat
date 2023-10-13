import { useEffect, useRef, useState } from "react"
const id = Date.now().toString();
export default function () {
    const [answer, setAnswer] = useState();
    const [pending, setPending] = useState();
    const [messages, setMessages] = useState([]);
    const messageInput = useRef();

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "8px",
            boxSizing: "border-box"
        }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        style={{
                            borderRadius: "4px",
                            padding: "4px",
                            backgroundColor: index % 2 === 0 ? "#8ecae6" : "#023047",
                            color: index % 2 === 0 ? "black" : "white"
                        }}>
                        {message}
                    </div>
                ))}
            </div>
            <div style={{ flex: 1 }}></div>
            <div>
                <input type="text" ref={messageInput} disabled={pending} onKeyDown={(event) => {
                    if (event.key === "Enter") { sendMessage() }
                }}></input>
                <button
                    disabled={pending}
                    onClick={() => sendMessage()}
                >Send</button>
            </div>

        </div>
    );

    async function sendMessage() {
        const input = messageInput.current.value;
        messageInput.current.value = ""
        const newMessages = [...messages, input]
        setMessages(newMessages)
        setPending(true);

        const response = await fetch(`/api/chat?msg=${input}&id=${id}`)
        const answerObj = await response.json();
        console.log(answerObj.answer)
        setAnswer(answerObj.answer)

        setMessages([...newMessages, answerObj.answer])
        setPending(false)
    }
}