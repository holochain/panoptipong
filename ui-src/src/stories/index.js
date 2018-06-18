import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import VoteButton from '../components/ButtonController/VoteButton';
import ButtonController from '../components/ButtonController';


storiesOf('VoteButton', module)
  .add('default', () =>
    <VoteButton active={false} disabled={false}>Default</VoteButton>
  )
  .add('disabled', () =>
    <VoteButton active={false} disabled={true}>Active</VoteButton>
  )
  .add('active & disabled', () =>
    <VoteButton active={true} disabled={true}>A & D</VoteButton>
  )


storiesOf('ButtonController', module)
  .add('default state', () =>
    <ButtonController />
  );

