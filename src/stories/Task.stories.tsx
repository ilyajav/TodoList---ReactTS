import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {Task} from "../Task";
import {action} from "@storybook/addon-actions";

export default {
    title: 'TODOLISTS/Task',
    component: Task,
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

let changeTaskStatusCallback = action('changeTaskStatus')
let changeTaskTitleCallback = action('changeTaskTitle')
let removeTasksCallback = action('removeTask')

const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTasks: removeTasksCallback,
}

export const TaskIsDoneStories = Template.bind({});
TaskIsDoneStories.args = {
      ...baseArgs,
      task: {id: '11', isDone: true, title: 'JS'},
      todoListId: '1'
};

export const TaskIsNotDoneStories = Template.bind({});
TaskIsNotDoneStories.args = {
    ...baseArgs,
    task: {id: '12', isDone: false, title: 'JS'},
    todoListId: '1'
};