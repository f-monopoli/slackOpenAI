
import requestPromise from 'request-promise';
import { Conversations } from '../models/conversationsModel';
import { ConversationsHistory } from '../models/conversationsHistoryModel'

const request = requestPromise.defaults({
    maxRedirects: 3,
    gzip: true,
    forever: true,
    timeout: 500000
})

export class SlackService {

    public channelId: String

    constructor() {
        this.channelId = ""

    }

    public async findConversation (name: string): Promise<String> {
        try {
            const slackResponse: Conversations = await this.getSlackChannels()

            if (slackResponse.ok === true && slackResponse.channels.length > 0) {
                //find conversation here looping channels array
                for (const channel of slackResponse.channels) {
                    if (channel.name === name) {
                        this.channelId = channel.id
                        console.log(`Found conversation ID: ${this.channelId}`)
                        break
                    }
                };
            } else {
                throw new Error("Empty channel!")
            }
            return this.channelId
        } catch (error: any) {
            console.log(error)
            return error
        }
    }

    private async getSlackChannels (): Promise<Conversations> {
        const getReq = {
            url: "https://slack.com/api/conversations.list",
            method: "GET",
            headers: {
                "Authorization": "Bearer " + process.env.tokenSlack
            }
        }
        return await new Promise((resolve:any, reject: any) => {
            request(getReq, (err:any, res:any) => {
                if (res && res?.statusCode >= 200 && res?.statusCode < 400) {
                    resolve(JSON.parse(res.body))
                } else {
                    reject(err)
                }
            }).catch ((err:any) => {
                reject(err)
            })
        }) 
    }

    public async retrieveConversationHistory (channelId: String): Promise<ConversationsHistory> {
        const getReq = {
            url: `https://slack.com/api/conversations.history?channel=${channelId}`,
            method: "GET",
            headers: {
                "Authorization": "Bearer " + process.env.tokenSlack
            }
        }
        return await new Promise ((resolve: any, reject: any) => {
            request(getReq, (err:any, res: any) => {
                if (res && res.statusCode >= 200 && res.statusCode < 400) {
                    resolve(JSON.parse(res.body))
                } else {
                    reject(err)
                }

            }).catch ((err: any) => {
                reject(err)
            })
        })
    }


}