import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { actions as routerActions } from 'redux-router5';
// import { trackClick } from '../../domains/ui/uiActions';
import * as routerSelectors from '../../domains/router/routerSelectors';
import styles from './Navigation.css';
import Button from '../../components/Button/Button';
import { navItemLinks } from '../../routes';

const mapStateToProps = state => ({
  activeRoute: routerSelectors.activeRouteSelector(state)
});

const mapDispatchToProps = dispatch => ({
  // track: (key, data) => { trackClick(dispatch, key, data); },
  navigateTo: (name, params) => dispatch(routerActions.navigateTo(name, params))
});

export const Navigation = ({
  className,
  activeRoute,
  // track,
  navigateTo
}) => {
  return (
    <div className={classnames(className, styles.nav)}>
      <div className={styles.menu}>
        {
          navItemLinks
            .map((headerLink) => {
              const isSelected = activeRoute && headerLink.name === activeRoute.name;
              return (
                <Button
                  key={headerLink.name}
                  onClick={() => {
                    navigateTo(headerLink.name);
                  }}
                  className={classnames(styles.item, styles.button, {
                    [styles.selected]: isSelected })}
                >{headerLink.label}</Button>
              );
            })
        }
      </div>
    </div>
  );
};

Navigation.propTypes = {
  className: PropTypes.string,
  /* eslint react/forbid-prop-types: 0 */
  activeRoute: PropTypes.object.isRequired,
  // track: PropTypes.func,
  navigateTo: PropTypes.func
};

Navigation.defaultProps = {
  className: 'header',
  // track: () => {},
  navigateTo: () => {}
};

export const Connected = connect(mapStateToProps, mapDispatchToProps)(Navigation);
