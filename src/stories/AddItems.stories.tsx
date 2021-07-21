import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';


import {action} from "@storybook/addon-actions";
import {AddItems} from "../AddItems";

export default {
    title: 'TODOLISTS/AddItemForm',
    component: AddItems,
    argTypes: {
        onClick: {
            description: 'Button clicked'
        }
    }
} as ComponentMeta<typeof AddItems>;

const Template: ComponentStory<typeof AddItems> = (args) => <AddItems {...args} />;

export const AddItemFormStories = Template.bind({});
AddItemFormStories.args = {
    addItem: action('Button clicked')
};