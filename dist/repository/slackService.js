"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlackService = void 0;
const request_promise_1 = __importDefault(require("request-promise"));
const request = request_promise_1.default.defaults({
    maxRedirects: 3,
    gzip: true,
    forever: true,
    timeout: 500000
});
class SlackService {
    channelId;
    constructor() {
        this.channelId = "";
    }
    async findConversation(name) {
        try {
            const slackResponse = await this.getSlackChannels();
            if (slackResponse.ok === true && slackResponse.channels.length > 0) {
                //find conversation here looping channels array
                for (const channel of slackResponse.channels) {
                    if (channel.name === name) {
                        this.channelId = channel.id;
                        console.log(`Found conversation ID: ${this.channelId}`);
                        break;
                    }
                }
                ;
            }
            else {
                throw new Error("Empty channel!");
            }
            return this.channelId;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async getSlackChannels() {
        const getReq = {
            url: "https://slack.com/api/conversations.list",
            method: "GET",
            headers: {
                "Authorization": "Bearer " + process.env.tokenSlack
            }
        };
        return await new Promise((resolve, reject) => {
            request(getReq, (err, res) => {
                if (res && res?.statusCode >= 200 && res?.statusCode < 400) {
                    resolve(JSON.parse(res.body));
                }
                else {
                    reject(err);
                }
            }).catch((err) => {
                reject(err);
            });
        });
    }
    async retrieveConversationHistory(channelId) {
        const getReq = {
            url: `https://slack.com/api/conversations.history?channel=${channelId}`,
            method: "GET",
            headers: {
                "Authorization": "Bearer " + process.env.tokenSlack
            }
        };
        return await new Promise((resolve, reject) => {
            request(getReq, (err, res) => {
                if (res && res.statusCode >= 200 && res.statusCode < 400) {
                    resolve(JSON.parse(res.body));
                }
                else {
                    reject(err);
                }
            }).catch((err) => {
                reject(err);
            });
        });
    }
}
exports.SlackService = SlackService;
//# sourceMappingURL=slackService.js.map