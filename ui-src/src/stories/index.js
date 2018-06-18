import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Header from '../components/Header';

storiesOf('Header', module)
  .add('with text', () => (
    <Header>
    	<h1>Welcome to Post PongChain</h1>
    </Header>
  ));
