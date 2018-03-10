import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs/* , text */ } from '@storybook/addon-knobs';
import Story from '../../storybook/story';
import storeDecorator from '../../storybook/decorators/storeDecorator';
import Layout from './Layout';

storiesOf('Layout', module)
  .addDecorator(withKnobs)
  .addDecorator(storeDecorator)
  .add('Main layout', () => (
    <Story
      title="Layout"
      summary="The main layout of the website"
    >
      <Layout>
        <p>some content</p>
      </Layout>
    </Story>
  ));
