import { ProcessSlackData } from './controller/processSlackData'
import { ProcessOpenAIData } from './controller/processOpenAIData'


export const handler = async (event: any, context: any) => {
    process.env.slackChannel = process.env.slackChannel || ""
    try {
        if (event?.trigger === true) {
            const slack = new ProcessSlackData()
            const openAi = new ProcessOpenAIData()
        
            await slack.getMessagesFromChannel(process.env.slackChannel)
            await openAi.sendPromptToAI(slack.listOfMessages)
            console.log(openAi.aiResponse)
            context.succeed()
        } else {
            context.succeed("Nothing happened!")
        }
    } catch (error: any) {
        console.log(error)
    }

}