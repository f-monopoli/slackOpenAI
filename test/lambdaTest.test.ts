import { Conversations } from '../src/models/conversationsModel'
import { SlackService } from '../src/repository/slackService'

const nock = require('nock');

jest.mock('request-promise');

describe("handler", () => {
    const testChannel = "test"
    const slack = new SlackService()
    const channelsResponse: Conversations = {
        ok: true,
        channels: [
            {
              id: "1",
              name: "test",
              is_channel: true,
              is_group: true,
              is_im: true,
              is_mpim: true,
              is_private: true,
              created: 12345,
              is_archived: true,
              is_general: true,
              unlinked: 0,
              name_normalized: "",
              is_shared: false,
              is_org_shared: false,
              is_pending_ext_shared: false,
              pending_shared: [],
              context_team_id: "",
              updated: 1,
              parent_conversation: "",
              creator: "",
              is_ext_shared: false,
              shared_team_ids: [],
              pending_connected_team_ids: [],
              is_member: false,
              topic: {
                value: "",
                creator: "",
                last_set: 1
              },
              purpose: {
                value: "",
                creator: "",
                last_set: 1
              },
              previous_names: [],
              num_members: 1
            }
          ],
          response_metadata: {
            next_cursor: ""
          }
    }
    beforeEach(() => {
        
    });

    it ("Return slack channels",async () => {

        const scope = nock("https://slack.com")
        .get("/api/conversations.list")
        .reply(200, channelsResponse)

    })
})