import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import TeamTable from '../components/TeamTable';
import VoteButton from '../components/ButtonController/VoteButton';
import ButtonController from '../components/ButtonController';
import Game from '../components/Game';
import App from '../App';

storiesOf('TeamTable', module)
  .add('default state', () =>
    <TeamTable players={{nameEntry:Bob, teamId: right}, {nameEntry:Susie, teamId: right}} teamIdL={{nameEntry:Sponge, teamId: left}, {nameEntry:Que, teamId: left}} teamIdR={{nameEntry:Angie, nameEntry:Kevin}} leftPaddleY={30} rightPaddleY={40} />
  );

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
  .add('clickability', () =>
    <VoteButton active={false} disabled={false} handleVote={e => console.log('voted')}>Default</VoteButton>
  )


storiesOf('ButtonController', module)
  .add('default state', () =>
    <ButtonController />
  );


storiesOf('Game', module)
  .add('nonsplit', () =>
    <Game ballX={10} ballY={20} leftPaddleY={30} rightPaddleY={40} />
  )
  .add('paddle split', () =>
    <Game ballX={10} ballY={20} leftPaddleY={95} rightPaddleY={4} />
  )

storiesOf('App', module)
  .add('initial state', () =>
    <App />
  )
