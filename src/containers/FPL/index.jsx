import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { flatten, last } from 'ramda';
import classnames from 'classnames';
import { loadDetails } from '../../domains/fpl/actions';
import * as fplSelectors from '../../domains/fpl/selectors';
import Content from '../../components/Content/Content';
import typography from '../../css/typography.css';
import loadingStates from '../../constants/loadingStates';
import styles from './index.css';

const mapStateToProps = (state) => {
  return {
    results: fplSelectors.resultsSelector(state),
    standings: fplSelectors.decoratedStandingsSelector(state),
    loadingState: fplSelectors.detailsLoadingSelector(state),
    fixtures: fplSelectors.fixturesSelector(state)
  };
};

const mapDispatchToProps = dispatch => ({
  loadFplDetails: () => { loadDetails(dispatch); }
});

const renderLuck = (luckScore) => {
  return (
    <div className={styles.badge}>
      {luckScore}
    </div>
  );
};

const renderLuckEmoji = (isUnlucky, isLucky) => {
  if (isUnlucky) {
    return (
      <span>🍇</span>
    );
  }

  if (isLucky) {
    return (
      <span>🍀</span>
    );
  }

  return null;
};

const renderResultPlayer = (player, playerIndex, key, luckScores) => {
  const { luckScore } = player.extras;
  const isUnlucky = luckScore === luckScores[0];
  const isLucky = luckScore === last(luckScores);
  return (
    <div key={`${key}-player-${playerIndex}`} className={styles.resultPlayer}>
      {renderLuck(luckScore, isUnlucky, isLucky)}
      <div className={styles.resultPlayerName}>
        {renderLuckEmoji(isUnlucky, isLucky)}
        <span> {player.teamName} </span>
        {renderLuckEmoji(isUnlucky, isLucky)}
      </div>
      <div className={styles.resultPlayerPoints}>{player.points}</div>
    </div>
  );
};

const renderResult = (result, resultIndex, weekKey, luckScores) => {
  const key = `${weekKey}-result-${resultIndex}`;
  return (
    <div key={key} className={styles.result}>
      {result.players.map((player, index) =>
        renderResultPlayer(player, index, key, luckScores))}
    </div>
  );
};

const renderWeekResults = (weekResults, weekIndex) => {
  const key = `week-${weekIndex}`;
  const name = `Week ${weekResults[0].week}`;
  const luckScores = flatten(weekResults.map(result =>
    result.players.map(player => player.extras.luckScore)))
    .sort((a, b) => {
      return a > b ? 1 : -1;
    });

  return (
    <div key={key} className={styles.weekResults}>
      <hr />
      <h4 className={typography.harvey}>{name}</h4>
      {weekResults.map((result, index) => renderResult(result, index, key, luckScores))}
    </div>
  );
};

class FplContainer extends Component {

  static defaultProps = {
    results: null,
    standings: null,
    fixtures: null,
    loadingContent: null,
    preContent: null
  }

  componentWillMount() {
    this.props.loadFplDetails();
  }

  render() {
    const { results, fixtures, standings, loadingState, loadingContent, preContent } = this.props;

    if (loadingState !== loadingStates.COMPLETE) {
      if (loadingContent) {
        return (<Content markdown={loadingContent} />);
      }
      return (<div>Loading data from FPL...</div>);
    }

    console.log(standings);
    console.log(results);
    console.log(fixtures);
        //
        // rank: 4
        // last_rank: 2
        // extras.name: "Steve Lifgren"
        // extras.teamName: "Schmeichel Jackson"
        // matches_played: 38
        // matches_won: 6
        // matches_lost: 6
        // matches_drawn: 0
        // points_for: 555
        // points_against: 561
        // total: 18
        // extras.totalLuckScore: 20
        // extras.totalProbPoints: 30
    /*
     */
    return (
      <div>
        { preContent ? (<Content markdown={preContent} />) : null }
        <h2 className={classnames(typography.ben, styles.withMargins)}>Standings</h2>
        <hr />
        <h3 className={classnames(typography.beau, styles.withMargins)}>The Official table</h3>
        <p>ahem, Fake news!</p>
        <table className={styles.table}>
          <thead>
            <tr>
              <th />
              <th />
              <th>Pl</th>
              <th>W</th>
              <th>L</th>
              <th>D</th>
              <th>F</th>
              <th>A</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>
            {
              standings.map((p, i) => (<tr>
                <td>{i + 1}</td>
                <td>{p.extras.teamName}</td>
                <td>{p.matches_played}</td>
                <td>{p.matches_won}</td>
                <td>{p.matches_lost}</td>
                <td>{p.matches_drawn}</td>
                <td>{p.points_for}</td>
                <td>{p.points_against}</td>
                <td>{p.total}</td>
              </tr>))
            }
          </tbody>
        </table>


        <h3 className={classnames(typography.beau, styles.withMargins)}>
          The people’s championship table</h3>
        <p>The true table, points that should have been won but probably weren’t.
          Based on a highly sophisticated, non-biased and uncontroversial algorithm</p>
        <table className={styles.table}>
          <thead>
            <tr>
              <th />
              <th />
              <th>Pl</th>
              <th>W</th>
              <th>L</th>
              <th>D</th>
              <th>F</th>
              <th>A</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>
            {
              standings
                .sort((a, b) => {
                  return a.extras.totalProbPoints < b.extras.totalProbPoints ? 1 : -1;
                })
                .map((p, i) => (<tr>
                  <td>{i + 1}</td>
                  <td>{p.extras.teamName}</td>
                  <td>{p.matches_played}</td>
                  <td>{p.extras.totalProbWin}</td>
                  <td>{p.extras.totalProbLose}</td>
                  <td>{p.extras.totalProbDraw}</td>
                  <td>{p.points_for}</td>
                  <td>{p.points_against}</td>
                  <td>{p.extras.totalProbPoints}</td>
                </tr>))
            }
          </tbody>
        </table>


        <h3 className={classnames(typography.beau, styles.withMargins)}>
          The lucky f@$&ers table</h3>
        <p>🍀 Just how lucky have the managers been? 🍀</p>
        <table className={styles.table}>
          <thead>
            <tr>
              <th />
              <th />
              <th />
              <th>Pl</th>
              <th>Total 🍀</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>
            {
              standings
                .sort((a, b) => {
                  return a.extras.totalLuckScore < b.extras.totalLuckScore ? 1 : -1;
                })
                .map((p, i) => (<tr>
                  <td>{i + 1}</td>
                  <td>{p.extras.name}</td>
                  <td>{p.extras.teamName}</td>
                  <td>{p.matches_played}</td>
                  <td>{p.extras.totalLuckScore}</td>
                  <td>{p.total - p.extras.totalProbPoints} {p.total - p.extras.totalProbPoints > 0 ? '🍀' : '🍇'}</td>
                </tr>))
            }
          </tbody>
        </table>
        <hr />
        <h2 className={typography.ben}>Results</h2>
        { results.reverse().map(renderWeekResults) }
      </div>
    );
  }
}

FplContainer.propTypes = {
  loadFplDetails: PropTypes.func.isRequired,
  loadingContent: PropTypes.string,
  preContent: PropTypes.string,
  /* eslint react/forbid-prop-types: 0 */
  results: PropTypes.arrayOf(PropTypes.object),
  loadingState: PropTypes.string,
  standings: PropTypes.arrayOf(PropTypes.object),
  fixtures: PropTypes.arrayOf(PropTypes.object)
};

export default connect(mapStateToProps, mapDispatchToProps)(FplContainer);
