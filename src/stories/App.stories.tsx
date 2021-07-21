import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {App} from "../App";
import {Provider} from "react-redux";
import {store} from "../state/store";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'TODOLISTS/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App />;


export const AppStories = Template.bind({});
AppStories.args = {};
