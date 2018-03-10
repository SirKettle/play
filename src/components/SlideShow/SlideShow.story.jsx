import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs/* , text */ } from '@storybook/addon-knobs';
import Story from '../../storybook/story';
import styles from '../../storybook/story.css';
import typography from '../../css/typography.css';
import SlideShow from './SlideShow';
import imageClaireMountain from '../../assets/images/claire_mountain.jpg';
import imagePuppy from '../../assets/images/services/puppy2.jpg';
import imagePetTaxi from '../../assets/images/services/pettaxi.jpg';
import imageHattie from '../../assets/images/hattiefield.jpg';

console.log(typography);

const images = [imageClaireMountain, imagePuppy, imagePetTaxi, imageHattie];

storiesOf('Components', module)
  .addDecorator(withKnobs)
  .add('SlideShow', () => (
    <Story
      title="Slideshow"
      summary="A selection of images fading between each other"
    >
      <div className={styles.padded}>
        <SlideShow
          images={images}
        />
      </div>
    </Story>
  ));
