import React from 'react';
import classnames from 'classnames';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import Story from '../storybook/story';
import styles from '../storybook/story.css';
import typography from './typography.css';

console.log(typography);

const typoStyles = Object.keys(typography).filter(key => key !== 'bottomMargin');

const defaultText = `
This is some text which would be great if it actually
said anything of any importance. Instead it does not
and is more of a ramble than anything...
`;

storiesOf('Styles', module)
  .addDecorator(withKnobs)
  .add('Typography', () => (
    <Story
      title="Typography styles"
      summary="Set fonts and weight defined below"
    >
      <div className={styles.padded}>
        {
          typoStyles.map(key => (
            <div className={classnames(typography.bottomMargin, typography[key])}>
              <strong>{ key.toUpperCase() }:</strong> I am typography.{ key }
            </div>
          ))
        }
        {
          typoStyles.map(key => (
            <div className={classnames(typography.bottomMargin, typography[key])}>
              <strong>typography.{ key }:</strong>
              { text('text', defaultText) }
            </div>
          ))
        }
      </div>
    </Story>
  ));
