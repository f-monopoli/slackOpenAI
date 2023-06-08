export interface Conversations {
        ok: boolean,
        channels: [
          {
            id: string,
            name: string,
            is_channel: boolean,
            is_group: boolean,
            is_im: boolean,
            is_mpim: boolean,
            is_private: boolean,
            created: number,
            is_archived: boolean,
            is_general: boolean,
            unlinked: number,
            name_normalized: string,
            is_shared: boolean,
            is_org_shared: boolean,
            is_pending_ext_shared: boolean,
            pending_shared: [],
            context_team_id: string,
            updated: number,
            parent_conversation: any,
            creator: string,
            is_ext_shared: boolean,
            shared_team_ids: [],
            pending_connected_team_ids: [],
            is_member: boolean,
            topic: {
              value: string,
              creator: string,
              last_set: number
            },
            purpose: {
              value: string,
              creator: string,
              last_set: number
            },
            previous_names: [],
            num_members: number
          }
        ],
        response_metadata: {
          next_cursor: string
        }
}
