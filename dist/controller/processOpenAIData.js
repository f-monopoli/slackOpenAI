"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessOpenAIData = void 0;
const openAiService_1 = require("../repository/openAiService");
class ProcessOpenAIData extends openAiService_1.OpenAIService {
    aiResponse;
    constructor() {
        super();
        this.aiResponse = "";
    }
    async sendPromptToAI(messages) {
        const payload = this.createCompletionsPayload(messages);
        const aiResponse = await super.sendPromptToAi(payload);
        this.mapOpenAiResponse(aiResponse);
    }
    createCompletionsPayload(messages) {
        const msgObj = {
            role: "user",
            content: messages.join(";") + ";" + process.env.openAiInstruction
        };
        const payload = {
            model: "gpt-3.5-turbo",
            messages: [msgObj]
        };
        return payload;
    }
    mapOpenAiResponse(aiResponse) {
        aiResponse?.choices.forEach(choice => {
            this.aiResponse += choice.message.content;
        });
    }
}
exports.ProcessOpenAIData = ProcessOpenAIData;
//# sourceMappingURL=processOpenAIData.js.map