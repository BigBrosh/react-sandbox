import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../components/Button';

storiesOf('Button/Static', module)
  .add('static main', () => <Button/>);

storiesOf('Button/Hovered', module)
  .add('hovered main', () => <Button isHovered />);