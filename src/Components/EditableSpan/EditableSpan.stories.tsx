import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {EditableSpan} from './EditableSpan';
import {action} from "@storybook/addon-actions";

export default {
    title: 'TODOLIST/EditableSpan',
    component: EditableSpan,
    args: {
        title: "coś tu mam",
        changeTitle: action("title was changed")

    }
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const PrimarySpan = Template.bind({});


