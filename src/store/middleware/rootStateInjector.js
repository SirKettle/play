// enable actions and reduceres to access the redux store
const rootStateInjector = store => next => (action) => {
  if (!action.methods) {
    /* eslint no-param-reassign: 0 */
    action.methods = {};
  }
  action.methods.getState = store.getState;
  return next(action);
};

export default rootStateInjector;

/*

Example actions code

export const requestAction = (args) => ({ dispatch, getState }) => { ...

---------------------------------------------------------------------

Example component code

const mapDispatchToProps = (dispatch) => ({
  handleRequest: (args) => { dispatch(actions.requestAction(args)); }
})
*/
