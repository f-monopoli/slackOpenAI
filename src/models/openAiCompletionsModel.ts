export interface Completions {
    model: string,
    messages: [
        {
            role: string,
            content: string
        }
    ]
}

export interface OpenAiMessage {
    role: string,
    content: string
}