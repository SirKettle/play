import { createSelector } from 'reselect';
import { reduce } from 'ramda';

// utils

export const getGameWeekMatches = (matches, eventId) =>
  matches.filter(match => match.event === eventId);

const eventToFixture = (event, playerEntries) => {
  const pl1Won =
    event.league_entry_1_points > event.league_entry_2_points;
  const pl2Won =
    event.league_entry_2_points > event.league_entry_1_points;
  const isDraw =
    event.league_entry_1_points === event.league_entry_2_points;

  const player1Entry = playerEntries.find(entry => entry.id === event.league_entry_1);
  const player2Entry = playerEntries.find(entry => entry.id === event.league_entry_2);

  return {
    started: event.started,
    finished: event.finished,
    week: event.event,
    players: [
      {
        id: event.league_entry_1,
        points: event.league_entry_1_points,
        ...(
          event.finished ? {
            won: pl1Won,
            draw: isDraw
          } : {}
        ),
        name: player1Entry ? `${player1Entry.player_first_name} ${player1Entry.player_last_name}` : 'loading',
        teamName: player1Entry ? player1Entry.entry_name : 'loading'
      },
      {
        id: event.league_entry_2,
        points: event.league_entry_2_points,
        ...(
          event.finished ? {
            won: pl2Won,
            draw: isDraw
          } : {}
        ),
        name: player2Entry ? `${player2Entry.player_first_name} ${player2Entry.player_last_name}` : 'loading',
        teamName: player2Entry ? player2Entry.entry_name : 'loading'
      }
    ]
  };
};

// schema
// <Luck>
// {
//   win: 5,
//   lose: 3,
//   draw: 0,
//   probWon: 0.667,
//   luckScore: 2,
//   probPoints: 3
// }
const getLuck = (weekPlayers, currentPlayer) => {
  const currentPlayerIndex = weekPlayers.findIndex(wkPly => wkPly.id === currentPlayer.id);
  const others = weekPlayers.filter((ply, index) => index !== currentPlayerIndex);
  const win = others.filter(ply => currentPlayer.points > ply.points).length;
  const lose = others.filter(ply => currentPlayer.points < ply.points).length;
  const draw = others.length - win - lose;
  const probWon = win / others.length;
  const isProbWin = probWon > 0.5;
  const isProbLose = probWon < 0.5;
  const isProbDraw = probWon === 0.5;
  const winNotch = isProbWin ? 1 : 0;
  const loseNotch = isProbLose ? 1 : 0;
  const drawNotch = isProbDraw ? 1 : 0;
  const pointIfNotWin = isProbLose ? 0 : 1;
  const probPoints = isProbWin ? 3 : pointIfNotWin;
  const drawLoseLuckScore = currentPlayer.draw
    ? win - lose
    : -win;
  const luckScore = currentPlayer.won
    ? lose
    : drawLoseLuckScore;
  return {
    win,
    lose,
    draw,
    probWon,
    luckScore,
    probPoints,
    winNotch,
    loseNotch,
    drawNotch
  };
};

const getWeekPlayers = weekFixtures => reduce((acc, fixture) => {
  return [
    ...acc,
    ...fixture.players
  ];
}, [], weekFixtures);

const weekFixturesWithExtras = weekFixtures => reduce((acc, fixture) => {
  const weekPlayers = getWeekPlayers(weekFixtures);
  return [
    ...acc,
    {
      ...fixture,
      players: fixture.players.map(ply => ({
        ...ply,
        extras: getLuck(weekPlayers, ply)
      }))
    }
  ];
}, [], weekFixtures);

// utils end


export const modelSelector = state => state.fpl;

export const detailsSelector = createSelector(
  modelSelector,
  model => model.get('data'));

export const detailsLoadingSelector = createSelector(
  modelSelector,
  model => model.get('loadingState'));

export const playersSelector = createSelector(
  detailsSelector,
  details => details.league_entries);

export const standingsSelector = createSelector(
  detailsSelector,
  details => details.standings);

export const matchesSelector = createSelector(
  detailsSelector,
  details => details.matches);

// schema
// <Fixtures>
// [
//   // weekFixtures
//   [
//     // fixture
//     {
//       started: true,
//       finished: true,
//       players: []
//     }
//   ]
// ]
export const decoratedMatchesSelector = createSelector(
    matchesSelector,
    playersSelector,
  (matches, players) => {
    // decorate matches with luck, probability scores etc...
    const allFixtures = matches.reduce((acc, match) => {
      const fixtures = acc.slice();
      const weekIndex = match.event - 1;
      const weekFixtures = fixtures[weekIndex] || [];
      const fixture = eventToFixture(match, players);
      fixtures[weekIndex] = [...weekFixtures, fixture];
      return fixtures;
    }, []);

    return allFixtures;
  });


// schema
// <ResultsWithExtras>
// [
//   // weekResults
//   [
//     // result
//     {
//       started: true,
//       finished: true,
//       players: [
//         // playerScore
//         {
//           playerId: 123,
//           points: 10,
//           won: true,
//           extras: <Luck>
//         },
//         {
//           playerId: 456,
//           points: 9,
//           won: false,
//           extras: <Luck>
//         }
//       ]
//     }
//   ]
// ]
export const resultsSelector = createSelector(
  decoratedMatchesSelector,
  decoratedMatches =>
    decoratedMatches
      .filter(weekFixtures => weekFixtures.every(fixture => fixture.finished))
      .map(weekFixturesWithExtras)
);


const addPlayerResult = (resultsByPlayer, playerScore) => {
  const playerId = playerScore.id;
  const playerScores = resultsByPlayer[playerId] || [];

  return {
    ...resultsByPlayer,
    [playerId]: [
      ...playerScores,
      playerScore
    ]
  };
};

export const resultsByPlayerSelector = createSelector(
  resultsSelector,
  results => results.reduce((resultsByPlayer, weekResults) => {
    const weekPlayers = getWeekPlayers(weekResults);
    return weekPlayers.reduce(addPlayerResult, resultsByPlayer);
  }, {})
);

const getTally = key => (tally, item) => {
  return tally + item.extras[key];
};

export const decoratedStandingsSelector = createSelector(
  resultsByPlayerSelector,
  standingsSelector,
  (resultsByPlayer, standings) => {
    console.log(resultsByPlayer);

    return standings.map((playerStanding) => {
      const playerResults = resultsByPlayer[playerStanding.league_entry];
      return {
        ...playerStanding,
        extras: {
          totalLuckScore: playerResults.reduce(getTally('luckScore'), 0),
          totalProbPoints: playerResults.reduce(getTally('probPoints'), 0),
          totalProbWin: playerResults.reduce(getTally('winNotch'), 0),
          totalProbLose: playerResults.reduce(getTally('loseNotch'), 0),
          totalProbDraw: playerResults.reduce(getTally('drawNotch'), 0),
          name: playerResults[0].name,
          teamName: playerResults[0].teamName
        }
      };
    });
  }
);

// schema
// <Fixtures>
// [
//   // weekFixtures
//   [
//     // fixture
//     {
//       started: false,
//       finished: false,
//       players: []
//     }
//   ]
// ]
export const fixturesSelector = createSelector(
  decoratedMatchesSelector,
  decoratedMatches =>
    decoratedMatches.filter(weekFixtures => weekFixtures.every(fixture => !fixture.finished)));
