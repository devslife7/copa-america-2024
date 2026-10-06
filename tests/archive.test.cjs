const fs = require('node:fs')
const ts = require('typescript')
const assert = require('node:assert/strict')
const { test } = require('node:test')
// Load the project's TypeScript with its existing compiler, without another dependency.
for (const extension of ['.ts', '.tsx']) {
  require.extensions[extension] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText, filename)
}
const { buildArchive } = require('../lib/archive.ts')
const source = require('../data/fixtures2024-final.json')
const picks = require('../data/predictions-official.json')
const archive = buildArchive()

test('complete archive includes the final and correct knockout winners', () => {
  assert.equal(archive.fixtures.groupFixtures.length, 24)
  assert.deepEqual(archive.winners.quarterFinals, [26, 5529, 8, 7])
  assert.deepEqual(archive.winners.semiFinals, [26, 8])
  assert.deepEqual(archive.winners.champion, [26])
  assert.equal(archive.fixtures.upcomingFixtures.past.fixture.status.short, 'AET')
  assert.equal(archive.users.length, 17)
})
test('scores agree with independently recorded group outcomes and qualifiers', () => {
  const results = ['26','TIE','2379','16','2384','7','8','TIE','5529','26','2382','2379','11','7','8','6','26','TIE','2379','TIE','11','7','TIE','29']
  for (const user of picks) {
    const p = user.predictions
    const expected = p.group_stage.filter((pick, i) => pick === results[i]).length +
      p.quarter_final.filter(pick => [26,5529,2379,2382,7,11,8,6].includes(+pick)).length +
      p.semi_final.filter(pick => [26,5529,8,7].includes(+pick)).length +
      p.final.filter(pick => [26,8].includes(+pick)).length + Number(+p.champion === 26)
    assert.equal(archive.users.find(item => item.id === user.id).correctPredictions, expected, user.name)
  }
})
test('API ordering cannot alter prediction scoring and input remains unchanged', () => {
  const before = JSON.stringify(source)
  assert.deepEqual(buildArchive([...source].reverse()), archive)
  assert.equal(JSON.stringify(source), before)
})
test('dense rankings preserve ties and alphabetical ordering', () => {
  archive.users.forEach((user, i, users) => {
    if (!i) return assert.equal(user.userRanking.ranking, 1)
    const previous = users[i - 1]
    assert.ok(previous.correctPredictions >= user.correctPredictions)
    assert.equal(user.userRanking.ranking, previous.userRanking.ranking + Number(previous.correctPredictions !== user.correctPredictions))
    if (previous.correctPredictions === user.correctPredictions) assert.ok(previous.name.localeCompare(user.name, 'en') <= 0)
  })
})
test('incomplete or duplicate snapshots fail instead of producing misleading standings', () => {
  assert.throws(() => buildArchive(source.slice(0, 24)))
  assert.throws(() => buildArchive([...source.slice(1), source[1]]))
})
test('all team images are available locally', () => {
  for (const match of archive.fixtures.groupFixtures) {
    for (const team of [match.teams.home, match.teams.away]) assert.ok(fs.existsSync('public' + team.logo))
  }
})
