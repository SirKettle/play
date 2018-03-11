import React from 'react';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
import Layout from '../Layout/Layout';
// import Game from '../Game/Game';
import RainDrops from '../RainDrops/RainDrops';

function Canvas() {
  return (
    <Layout>
      { 'Some amazing canvas component here' }
      <hr />
      <RainDrops />
    </Layout>
  );
}

export default connect(() => routeNodeSelector(''))(Canvas);
