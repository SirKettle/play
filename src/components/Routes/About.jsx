import React from 'react';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
import Layout from '../Layout/Layout';
import Content from '../Content/Content';
import Columns from '../Columns/Columns';
import Blog from '../Blog/Blog';
import * as site from '../../constants/site';

const columnsCopy = [`
# About ${site.name}...
`, `
### Some bullshite

`];

function About() {
  return (
    <Layout>
      <Columns>
        <Content markdown={columnsCopy[0]} />
        <Blog
          loadingContent={'### What have I been up to...?'}
          preContent={'### This is what I’ve been up to'}
        />
      </Columns>
    </Layout>
  );
}

export default connect(() => routeNodeSelector(''))(About);
