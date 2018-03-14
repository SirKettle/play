import React from 'react';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
import Layout from '../Layout/Layout';
// import Columns from '../Columns/Columns';
// import Blog from '../Blog/Blog';
import Content from '../Content/Content';
import * as site from '../../constants/site';

const columnsCopy = [`
## ${site.strap}
${site.description}
`];

function Home() {
  return (
    <Layout>
      <Content markdown={columnsCopy[0]} />
      {/* <Blog
        loadingContent={'### What have I been up to...?'}
        preContent={'### This is what I’ve been up to'}
      /> */}
    </Layout>
  );
}

export default connect(() => routeNodeSelector(''))(Home);
