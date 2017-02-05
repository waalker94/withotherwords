const { playerPrivateFields } = require('./player')

const gamePrivateFields = [
  'sessionId',
  {
    players: playerPrivateFields
  }
]

async function getGameBySession (sessionId, db, connection) {
  const gamesCursor = await db
        .table('games')
        .filter(game => game('players').contains(player => player('sessionId').eq(sessionId)))
        .without(gamePrivateFields)
        .run(connection)

  const games = await gamesCursor.toArray()
  if (games.length > 0) {
    return games[0]
  }
  return {}
}

async function incrementWordIndex (sessionId, db, connection, game) {
  return db
    .table('games')
    .get(game.id)
    .update({
      wordIndex: game.wordIndex + 1
    })
    .run(connection)
}

module.exports = {
  getGameBySession,
  gamePrivateFields,
  incrementWordIndex
}
