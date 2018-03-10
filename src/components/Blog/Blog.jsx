import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadTweets } from '../../domains/twitter/twitterActions';
import * as twitterSelectors from '../../domains/twitter/twitterSelectors';
import Content from '../Content/Content';

const getKey = () => `random-key-${Math.round(Math.random() * 100000000)}`;

const mapStateToProps = (state) => {
  return {
    tweets: twitterSelectors.tweetsMarkdown(state)
  };
};

const mapDispatchToProps = dispatch => ({
  loadTheTweets: () => { loadTweets(dispatch); }
});

class Blog extends Component {

  static defaultProps = {
    tweets: null,
    loadingContent: null,
    preContent: null
  }

  componentWillMount() {
    this.props.loadTheTweets();
  }

  render() {
    const { tweets, loadingContent, preContent } = this.props;

    if (!tweets) {
      if (loadingContent) {
        return (<Content markdown={loadingContent} />);
      }
      return (<div>Loading tweets...</div>);
    }

    return (
      <div className="blog">
        { preContent ? (<Content markdown={preContent} />) : null }
        { tweets.map(tweet => (<Content key={getKey()} markdown={tweet} />)) }
      </div>
    );
  }
}

Blog.propTypes = {
  loadTheTweets: PropTypes.func.isRequired,
  loadingContent: PropTypes.string,
  preContent: PropTypes.string,
  /* eslint react/forbid-prop-types: 0 */
  tweets: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
