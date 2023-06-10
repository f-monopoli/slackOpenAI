"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessSlackData = void 0;
const slackService_1 = require("../repository/slackService");
class ProcessSlackData extends slackService_1.SlackService {
    listOfMessages;
    constructor() {
        super();
        this.listOfMessages = [];
    }
    async getMessagesFromChannel(name) {
        try {
            //First Find conversation with given name and return channel ID
            const channelId = await super.findConversation(name);
            if (channelId) {
                //Second Get conversation history for given channel ID
                const messagesData = await super.retrieveConversationHistory(channelId);
                this.mapSlackMessages(messagesData);
                return this.listOfMessages;
            }
            else {
                throw new Error("Channel is empty!");
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
    mapSlackMessages(messagesData) {
        const messages = messagesData.messages.filter(message => message.subtype !== 'channel_join');
        for (let i = messages.length - 1; i >= 0; i--) {
            this.listOfMessages.push(messages[i].text);
        }
    }
}
exports.ProcessSlackData = ProcessSlackData;
//# sourceMappingURL=processSlackData.js.map