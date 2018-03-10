import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { routeNodeSelector } from 'redux-router5';
import { requestIpInfo } from '../domains/config/configActions';
import NotFound from './NotFound';

import '../css/reset.css';
import styles from './App.css';
import { components } from '../routes';

const mapStateToProps = () => routeNodeSelector('');

const mapDispatchToProps = dispatch => ({
  requestIpInfoConfig: () => { requestIpInfo(dispatch); }
});

export class Main extends Component {

  componentWillMount() {
    this.props.requestIpInfoConfig();
  }

  render() {
    const { route } = this.props;
    const segment = route ? route.name.split('.')[0] : undefined;
    if (!components[segment]) {
      window.location.href = '/#/';
    }

    return (
      <div className={classnames(styles.App)}>
        { React.createElement(components[segment] || NotFound) }
      </div>
    );
  }
}

Main.propTypes = {
  /* eslint react/forbid-prop-types: 0 */
  route: PropTypes.object.isRequired,
  requestIpInfoConfig: PropTypes.func.isRequired
};

export const Connected = connect(mapStateToProps, mapDispatchToProps)(Main);
