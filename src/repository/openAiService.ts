import { Completions } from '../models/openAiCompletionsModel'
import { CompletionsResponse } from '../models/openAiCompletionsResponseModel'
import requestPromise from 'request-promise';

const request = requestPromise.defaults({
    maxRedirects: 3,
    gzip: true,
    forever: true,
    timeout: 500000
})

export class OpenAIService {

    public async sendPromptToAi (payload: Completions) {
        try {
            const openAiReponse: CompletionsResponse = await this.executeCompletionsApi(payload)
            return openAiReponse
        } catch (error) {
            console.log(error)
        }     
    }

    private async executeCompletionsApi (payload: Completions): Promise<CompletionsResponse> {
        const reqConfig = {
            url: "https://api.openai.com/v1/chat/completions",
            method: "POST",
            headers: {
                "Authorization": "Bearer " + process.env.tokenOpenAI,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }
        return new Promise((resolve: any, reject: any) => {
            request(reqConfig, (err: any, res: any) => {
                if (res && res?.statusCode >= 200 && res?.statusCode < 400) {
                    resolve(JSON.parse(res.body))
                } else {
                    reject(err)
                }
            }).catch((error: any) => {
                reject(error)
            })
        })
    }
    
}