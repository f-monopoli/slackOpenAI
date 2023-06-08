import { error } from "console"
import requestPromise from 'request-promise';
import { resolve } from "path";
import { Conversations } from "../models/conversationsModel";



export class SlackService {

    private request: requestPromise

    constructor() {
        this.request = requestPromise.defaults({
            maxRedirects: 3,
            gzip: true,
            forever: true,
            timeout: 500000
        })
    }

    public async findConversation(name: string) {
        try {
            const slackResponse: Conversations = await this.getSlackChannels()

            if (slackResponse.ok === true && slackResponse.channels.length > 0) {
                //find conversation here looping channels array


            } else {
                throw new Error("Empty channel")
            }

        } catch (error: any) {
            console.log(error)
        }
    }

    private async getSlackChannels (): Promise<Conversations> {
        const getReq = {
            url: "https://slack.com/api/conversations.list",
            method: "GET",
            headers: {
                "Authorization": "Bearer " + "add token from slack management console"
            }
        }
        return await new Promise((resolve:any, reject: any) => {
            this.request(getReq, (res:any, err:any) => {
                if (res && res?.statusCode >= 200 && res?.statusCode <= 400) {
                    resolve(res.body)
                } else {
                    reject(err)
                }
            }).catch ((err:any) => {
                reject(err)
            })
        }) 
    }
}