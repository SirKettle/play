import React from 'react';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
import Layout from '../Layout/Layout';
// import Game from '../Game/Game';
import RainDrops from '../RainDrops/RainDrops';
import Content from '../Content/Content';

const rainDropsIntro = `
### Rain drops!?

Why? Well, I was simply looking for an excuse to mess around with making a basic game loop using redux, and paiting on a \`<canvas>\` inside a react app.

---
`;

function Canvas() {
  return (
    <Layout>
      <Content markdown={rainDropsIntro} />
      <RainDrops />
    </Layout>
  );
}

export default connect(() => routeNodeSelector(''))(Canvas);
