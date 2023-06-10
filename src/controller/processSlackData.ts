
import { SlackService } from '../repository/slackService'
import { ConversationsHistory } from '../models/conversationsHistoryModel'

export class ProcessSlackData extends SlackService  {

    public listOfMessages: string[]

    constructor () {
        super()
        this.listOfMessages = []
    }
    
    public async getMessagesFromChannel (name: string) {
        try {
            //First Find conversation with given name and return channel ID
            const channelId: String = await super.findConversation(name)

            if (channelId) {
                //Second Get conversation history for given channel ID
                const messagesData: ConversationsHistory = await super.retrieveConversationHistory(channelId)

                this.mapSlackMessages(messagesData)
                return this.listOfMessages
           
            } else {
                throw new Error("Channel is empty!")
            }
  
        } catch (error: any) {
            throw new Error(error)
        }
    }

    private mapSlackMessages (messagesData: ConversationsHistory) {

        const messages = messagesData.messages.filter(message => message.subtype !== 'channel_join')

        for (let i = messages.length - 1; i >= 0; i--) {
            this.listOfMessages.push(messages[i].text)
        }
    }
}