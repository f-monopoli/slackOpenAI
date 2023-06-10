"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const processSlackData_1 = require("./controller/processSlackData");
const processOpenAIData_1 = require("./controller/processOpenAIData");
const handler = async (event, context) => {
    process.env.slackChannel = process.env.slackChannel || "";
    try {
        if (event?.trigger === true) {
            const slack = new processSlackData_1.ProcessSlackData();
            const openAi = new processOpenAIData_1.ProcessOpenAIData();
            await slack.getMessagesFromChannel(process.env.slackChannel);
            await openAi.sendPromptToAI(slack.listOfMessages);
            console.log(openAi.aiResponse);
            context.succeed();
        }
        else {
            context.succeed("Nothing happened!");
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.handler = handler;
//# sourceMappingURL=app.js.map