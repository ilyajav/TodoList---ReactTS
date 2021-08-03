import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Task} from "../Task";
import {action} from "@storybook/addon-actions";
import {TaskPriorities, TaskStatuses} from "../api/task-api";

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
      task: {
          id: '11',title: 'JS',
          order: 0,
          status: TaskStatuses.New,
          priority: TaskPriorities.Middle,
          startDate: '',
          deadline: '',
          description: '',
          completed: false,
          todoListId: 'todoListId1',
          addedDate: '',
      },
};

export const TaskIsNotDoneStories = Template.bind({});
TaskIsNotDoneStories.args = {
    ...baseArgs,
    task: {  id: '12',title: 'CSS',
        order: 0,
        status: TaskStatuses.New,
        priority: TaskPriorities.Middle,
        startDate: '',
        deadline: '',
        description: '',
        completed: false,
        todoListId: 'todoListId1',
        addedDate: '',},
};
