import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import VoteButton from '../components/ButtonController/VoteButton';
import ButtonController from '../components/ButtonController';
import Game from '../components/Game';

storiesOf('Game', module)
  .add('nonsplit', () =>
    <Game ballX={10} ballY={20} leftPaddleY={30} rightPaddleY={40} />
  )

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

