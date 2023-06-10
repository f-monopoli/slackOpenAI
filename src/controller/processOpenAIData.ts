import { OpenAIService } from '../repository/openAiService';
import { Completions, OpenAiMessage } from '../models/openAiCompletionsModel'
import { CompletionsResponse } from '../models/openAiCompletionsResponseModel'


export class ProcessOpenAIData extends OpenAIService {

    public aiResponse: String

    constructor () {
        super()
        this.aiResponse = ""
    }

    public async sendPromptToAI (messages: string[]) {
        const payload: Completions = this.createCompletionsPayload(messages)
        const aiResponse = await super.sendPromptToAi(payload)
        this.mapOpenAiResponse(aiResponse)
    }

    private createCompletionsPayload(messages: string[]): Completions {
 
        const msgObj: OpenAiMessage = {
            role: "user",
            content: messages.join(";") + ";" + process.env.openAiInstruction
        }

        const payload: Completions = {
            model: "gpt-3.5-turbo",
            messages: [msgObj]
        }
        return payload
    }

    private mapOpenAiResponse (aiResponse: CompletionsResponse | undefined ): void {

        aiResponse?.choices.forEach(choice => {
            this.aiResponse+= choice.message.content
        });
    }
}