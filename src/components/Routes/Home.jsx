import React from 'react';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
import Layout from '../Layout/Layout';
// import Columns from '../Columns/Columns';
// import Blog from '../Blog/Blog';
import Content from '../Content/Content';
import * as site from '../../constants/site';
import GameFrame from '../GameFrame/GameFrame';

const columnsCopy = [`
## ${site.strap}
${site.description}

---

### Make Mars great again
_A modified version of the classic breakout game using Phaser_
`];

function Home() {
  return (
    <Layout>
      <Content markdown={columnsCopy[0]} />
      {/* <Blog
        loadingContent={'### What have I been up to...?'}
        preContent={'### This is what I’ve been up to'}
      /> */}
      <GameFrame
        width={680}
        height={420}
        src="http://breakout.willthirkettle.co.uk/"
        name="Make Mars great again!"
      />
    </Layout>
  );
}

export default connect(() => routeNodeSelector(''))(Home);
