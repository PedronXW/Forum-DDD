import { test } from 'vitest'
import { Either, left, right } from './either'

function doSomething(shouldSuccess: boolean): Either<string, string> {
  if (shouldSuccess) {
    return right('success')
  } else {
    return left('error')
  }
}

test('success result', () => {
  const successResult = doSomething(true)

  expect(successResult.isRight()).toEqual(true)
})

test('error result', () => {
  const errorResult = doSomething(false)

  expect(errorResult.isLeft()).toEqual(true)
})
