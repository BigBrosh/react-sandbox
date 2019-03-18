import React from 'react';

import { storiesOf } from '@storybook/react';
import { withActions } from '@storybook/addon-actions';

import Button from '../components/Button/';

storiesOf('Button', module)
  .add('static', () => <Button/>)
  .addDecorator(withActions('mouseover'))
  .add('hovered', () => <Button/>);