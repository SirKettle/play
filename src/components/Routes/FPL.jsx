import React from 'react';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
import Layout from '../Layout/Layout';
import Content from '../Content/Content';
import FPLContainer from '../../containers/FPL';

const introCopy = `
### The official FPL Draft is Fake news!!!

Bitterness is a powerful driver and I have utilised this to bring to you the real FPL data and league tables, and highlight who has been a lucky “son of something” and who has been let down by lady luck (ahem - me!).

---
`;

function Canvas() {
  return (
    <Layout>
      <Content markdown={introCopy} />
      <FPLContainer />
    </Layout>
  );
}

export default connect(() => routeNodeSelector(''))(Canvas);
