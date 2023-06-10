"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIService = void 0;
const request_promise_1 = __importDefault(require("request-promise"));
const request = request_promise_1.default.defaults({
    maxRedirects: 3,
    gzip: true,
    forever: true,
    timeout: 500000
});
class OpenAIService {
    async sendPromptToAi(payload) {
        try {
            const openAiReponse = await this.executeCompletionsApi(payload);
            return openAiReponse;
        }
        catch (error) {
            console.log(error);
        }
    }
    async executeCompletionsApi(payload) {
        const reqConfig = {
            url: "https://api.openai.com/v1/chat/completions",
            method: "POST",
            headers: {
                "Authorization": "Bearer " + process.env.tokenOpenAI,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        };
        return new Promise((resolve, reject) => {
            request(reqConfig, (err, res) => {
                if (res && res?.statusCode >= 200 && res?.statusCode < 400) {
                    resolve(JSON.parse(res.body));
                }
                else {
                    reject(err);
                }
            }).catch((error) => {
                reject(error);
            });
        });
    }
}
exports.OpenAIService = OpenAIService;
//# sourceMappingURL=openAiService.js.map