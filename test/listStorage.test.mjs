import assert from 'node:assert/strict'
import test from 'node:test'
import { loadList } from '../src/listStorage.js'

test('returns saved tasks when Lista contains a JSON array', () => {
  const tasks = [{ text: 'Estudar React', isCompleted: false }]
  const storage = { getItem: () => JSON.stringify(tasks) }

  assert.deepEqual(loadList(storage), tasks)
})

test('starts with an empty list when Lista is malformed JSON', () => {
  const storage = { getItem: () => '{not valid JSON' }

  assert.deepEqual(loadList(storage), [])
})

test('starts with an empty list when Lista is not an array', () => {
  const storage = { getItem: () => JSON.stringify({ text: 'not a list' }) }

  assert.deepEqual(loadList(storage), [])
})
