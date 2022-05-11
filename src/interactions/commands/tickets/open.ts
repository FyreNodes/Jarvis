import { InteractionInfo, InteractionRun } from "@/Interfaces";

export const run: InteractionRun = async (client, interaction) => {
    //interaction.reply({ components: {  } });
    
};

export const info: InteractionInfo = {
    name: 'open',
    category: 'tickets',
    description: 'Opens a support ticket.',
    intType: 'command',
    type: 1,
    options: [
        {
            type: 3,
            name: 'department',
            description: 'Support department to open the ticket in.',
            required: true,
            autocomplete: false,
            choices: [
                {
                    name: 'Billing',
                    value: 'billing'
                },
                {
                    name: 'Technical',
                    value: 'tech'
                },
                {
                    name: 'General',
                    value: 'general'
                }
            ]
        }
    ]
}