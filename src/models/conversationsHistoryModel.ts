export interface ConversationsHistory {
    ok: string,
    messages: [
        {
            client_msg_id: string,
            type: string,
            subtype: string,
            text: string,
            user: string,
            ts: string,
            blocks: [
                {
                    type: string,
                    block_id: string,
                    elements: [
                        {
                            type: string,
                            elements: [
                                {
                                    type: string,
                                    text: string,
                                }
                            ]
                        }
                    ]
                }
            ],
            team: string,
            thread_ts: string,
            reply_count: number,
            reply_users_count: number,
            latest_reply: string,
            reply_users: [],
            is_locked: boolean,
            subscribed: boolean,
            last_read: string,
        }
    ],
    has_more: boolean,
    pin_count: number,
    channel_actions_ts: any,
    channel_actions_count: number
}

