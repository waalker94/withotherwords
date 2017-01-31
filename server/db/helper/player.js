const playerPrivateFields = ['sessionId']

async function getPlayerBySession (sessionId, db, connection) {

  const playerCursor = await db
        .table('games')
        .concatMap(game => game('players'))
        .filter(player => player('sessionId').eq(sessionId))
        .without(playerPrivateFields)
        .run(connection)

  const players = await playerCursor.toArray()
  if (players.length > 0) {
    return players[0]
  }
  return {}
}

module.exports = {
  getPlayerBySession,
  playerPrivateFields,
}