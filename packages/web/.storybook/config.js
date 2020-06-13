import { addDecorator } from '@storybook/react';
import themeDecorator from './theme-decorator';
import routerDecorator from './router-decorator';

addDecorator(themeDecorator);
addDecorator(routerDecorator);
