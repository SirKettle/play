import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
// We need to use the same base.css as the three apps
// import '../src/base.css';
// Some handy classes to display our components more aesthetically
// import '../src/storybook.css';

// Lets load all files matching **.story.js
const req = require.context('../src', true, /.story.(js|jsx)$/);

function loadStories() {
  req.keys().forEach( filename => {
    return req(filename);
  });
}

setOptions({
  name: 'Mood for a movie',
  url: 'https://github.com/SirKettle/mood-for-movies',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: true,
  sortStoriesByKind: true,
});

configure(loadStories, module);
