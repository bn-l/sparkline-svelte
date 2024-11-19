# Test API Reference | Vitest
Test API Reference ​
-------------------------------------------

The following types are used in the type signatures below

ts

```
type Awaitable<T> = T | PromiseLike<T>
type TestFunction = () => Awaitable<void>

interface TestOptions {
  /**
   * Will fail the test if it takes too long to execute
   */
  timeout?: number
  /**
   * Will retry the test specific number of times if it fails
   *
   * @default 0
   */
  retry?: number
  /**
   * Will repeat the same test several times even if it fails each time
   * If you have "retry" option and it fails, it will use every retry in each cycle
   * Useful for debugging random failings
   *
   * @default 0
   */
  repeats?: number
}
```


When a test function returns a promise, the runner will wait until it is resolved to collect async expectations. If the promise is rejected, the test will fail.

TIP

In Jest, `TestFunction` can also be of type `(done: DoneCallback) => void`. If this form is used, the test will not be concluded until `done` is called. You can achieve the same using an `async` function, see the Migration guide Done Callback section.

Most options support both dot-syntax and object-syntax allowing you to use whatever style you prefer.

dot-syntaxobject-syntax

ts

```
import { test } from 'vitest'

test.skip('skipped test', () => {
  // some logic that fails right now
})
```


ts

```
import { test } from 'vitest'

test('skipped test', { skip: true }, () => {
  // some logic that fails right now
})
```


test ​
---------------

*   **Alias:** `it`

`test` defines a set of related expectations. It receives the test name and a function that holds the expectations to test.

Optionally, you can provide a timeout (in milliseconds) for specifying how long to wait before terminating. The default is 5 seconds, and can be configured globally with testTimeout

ts

```
import { expect, test } from 'vitest'

test('should work as expected', () => {
  expect(Math.sqrt(4)).toBe(2)
})
```


### test.extend ​

*   **Alias:** `it.extend`

Use `test.extend` to extend the test context with custom fixtures. This will return a new `test` and it's also extendable, so you can compose more fixtures or override existing ones by extending it as you need. See Extend Test Context for more information.

ts

```
import { expect, test } from 'vitest'

const todos = []
const archive = []

const myTest = test.extend({
  todos: async ({ task }, use) => {
    todos.push(1, 2, 3)
    await use(todos)
    todos.length = 0
  },
  archive
})

myTest('add item', ({ todos }) => {
  expect(todos.length).toBe(3)

  todos.push(4)
  expect(todos.length).toBe(4)
})
```


### test.skip ​

*   **Alias:** `it.skip`

If you want to skip running certain tests, but you don't want to delete the code due to any reason, you can use `test.skip` to avoid running them.

ts

```
import { assert, test } from 'vitest'

test.skip('skipped test', () => {
  // Test skipped, no error
  assert.equal(Math.sqrt(4), 3)
})
```


You can also skip test by calling `skip` on its context dynamically:

ts

```
import { assert, test } from 'vitest'

test('skipped test', (context) => {
  context.skip()
  // Test skipped, no error
  assert.equal(Math.sqrt(4), 3)
})
```


### test.skipIf ​

*   **Alias:** `it.skipIf`

In some cases you might run tests multiple times with different environments, and some of the tests might be environment-specific. Instead of wrapping the test code with `if`, you can use `test.skipIf` to skip the test whenever the condition is truthy.

ts

```
import { assert, test } from 'vitest'

const isDev = process.env.NODE_ENV === 'development'

test.skipIf(isDev)('prod only test', () => {
  // this test only runs in production
})
```


WARNING

You cannot use this syntax, when using Vitest as type checker.

### test.runIf ​

*   **Alias:** `it.runIf`

Opposite of test.skipIf.

ts

```
import { assert, test } from 'vitest'

const isDev = process.env.NODE_ENV === 'development'

test.runIf(isDev)('dev only test', () => {
  // this test only runs in development
})
```


WARNING

You cannot use this syntax, when using Vitest as type checker.

### test.only ​

*   **Alias:** `it.only`

Use `test.only` to only run certain tests in a given suite. This is useful when debugging.

Optionally, you can provide a timeout (in milliseconds) for specifying how long to wait before terminating. The default is 5 seconds, and can be configured globally with testTimeout.

ts

```
import { assert, test } from 'vitest'

test.only('test', () => {
  // Only this test (and others marked with only) are run
  assert.equal(Math.sqrt(4), 2)
})
```


Sometimes it is very useful to run `only` tests in a certain file, ignoring all other tests from the whole test suite, which pollute the output.

In order to do that run `vitest` with specific file containing the tests in question.

```
# vitest interesting.test.ts
```


### test.concurrent ​

*   **Alias:** `it.concurrent`

`test.concurrent` marks consecutive tests to be run in parallel. It receives the test name, an async function with the tests to collect, and an optional timeout (in milliseconds).

ts

```
import { describe, test } from 'vitest'

// The two tests marked with concurrent will be run in parallel
describe('suite', () => {
  test('serial test', async () => { /* ... */ })
  test.concurrent('concurrent test 1', async () => { /* ... */ })
  test.concurrent('concurrent test 2', async () => { /* ... */ })
})
```


`test.skip`, `test.only`, and `test.todo` works with concurrent tests. All the following combinations are valid:

ts

```
test.concurrent(/* ... */)
test.skip.concurrent(/* ... */) // or test.concurrent.skip(/* ... */)
test.only.concurrent(/* ... */) // or test.concurrent.only(/* ... */)
test.todo.concurrent(/* ... */) // or test.concurrent.todo(/* ... */)
```


When running concurrent tests, Snapshots and Assertions must use `expect` from the local Test Context to ensure the right test is detected.

ts

```
test.concurrent('test 1', async ({ expect }) => {
  expect(foo).toMatchSnapshot()
})
test.concurrent('test 2', async ({ expect }) => {
  expect(foo).toMatchSnapshot()
})
```


WARNING

You cannot use this syntax, when using Vitest as type checker.

### test.sequential ​

*   **Alias:** `it.sequential`

`test.sequential` marks a test as sequential. This is useful if you want to run tests in sequence within `describe.concurrent` or with the `--sequence.concurrent` command option.

ts

```
import { describe, test } from 'vitest'

// with config option { sequence: { concurrent: true } }
test('concurrent test 1', async () => { /* ... */ })
test('concurrent test 2', async () => { /* ... */ })

test.sequential('sequential test 1', async () => { /* ... */ })
test.sequential('sequential test 2', async () => { /* ... */ })

// within concurrent suite
describe.concurrent('suite', () => {
  test('concurrent test 1', async () => { /* ... */ })
  test('concurrent test 2', async () => { /* ... */ })

  test.sequential('sequential test 1', async () => { /* ... */ })
  test.sequential('sequential test 2', async () => { /* ... */ })
})
```


### test.todo ​

*   **Alias:** `it.todo`

Use `test.todo` to stub tests to be implemented later. An entry will be shown in the report for the tests so you know how many tests you still need to implement.

ts

```
// An entry will be shown in the report for this test
test.todo('unimplemented test')
```


### test.fails ​

*   **Alias:** `it.fails`

Use `test.fails` to indicate that an assertion will fail explicitly.

ts

```
import { expect, test } from 'vitest'

function myAsyncFunc() {
  return new Promise(resolve => resolve(1))
}
test.fails('fail test', async () => {
  await expect(myAsyncFunc()).rejects.toBe(1)
})
```


WARNING

You cannot use this syntax, when using Vitest as type checker.

### test.each ​

*   **Alias:** `it.each`

TIP

While `test.each` is provided for Jest compatibility, Vitest also has `test.for` with an additional feature to integrate `TestContext`.

Use `test.each` when you need to run the same test with different variables. You can inject parameters with printf formatting in the test name in the order of the test function parameters.

*   `%s`: string
*   `%d`: number
*   `%i`: integer
*   `%f`: floating point value
*   `%j`: json
*   `%o`: object
*   `%#`: index of the test case
*   `%%`: single percent sign ('%')

ts

```
import { expect, test } from 'vitest'

test.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])('add(%i, %i) -> %i', (a, b, expected) => {
  expect(a + b).toBe(expected)
})

// this will return
// ✓ add(1, 1) -> 2
// ✓ add(1, 2) -> 3
// ✓ add(2, 1) -> 3
```


You can also access object properties with `$` prefix, if you are using objects as arguments:

ts

```
test.each([
  { a: 1, b: 1, expected: 2 },
  { a: 1, b: 2, expected: 3 },
  { a: 2, b: 1, expected: 3 },
])('add($a, $b) -> $expected', ({ a, b, expected }) => {
  expect(a + b).toBe(expected)
})

// this will return
// ✓ add(1, 1) -> 2
// ✓ add(1, 2) -> 3
// ✓ add(2, 1) -> 3
```


You can also access Object attributes with `.`, if you are using objects as arguments:

ts

```
test.each`
a               | b      | expected
${{ val: 1 }}   | ${'b'} | ${'1b'}
${{ val: 2 }}   | ${'b'} | ${'2b'}
${{ val: 3 }}   | ${'b'} | ${'3b'}
`('add($a.val, $b) -> $expected', ({ a, b, expected }) => {
  expect(a.val + b).toBe(expected)
})

// this will return
// ✓ add(1, b) -> 1b
// ✓ add(2, b) -> 2b
// ✓ add(3, b) -> 3b
```


Starting from Vitest 0.25.3, you can also use template string table.

*   First row should be column names, separated by `|`;
*   One or more subsequent rows of data supplied as template literal expressions using `${value}` syntax.

ts

```
import { expect, test } from 'vitest'

test.each`
  a               | b      | expected
  ${1}            | ${1}   | ${2}
  ${'a'}          | ${'b'} | ${'ab'}
  ${[]}           | ${'b'} | ${'b'}
  ${{}}           | ${'b'} | ${'[object Object]b'}
  ${{ asd: 1 }}   | ${'b'} | ${'[object Object]b'}
`('returns $expected when $a is added $b', ({ a, b, expected }) => {
  expect(a + b).toBe(expected)
})
```


TIP

Vitest processes `$values` with Chai `format` method. If the value is too truncated, you can increase chaiConfig.truncateThreshold in your config file.

WARNING

You cannot use this syntax, when using Vitest as type checker.

### test.for ​

*   **Alias:** `it.for`

Alternative of `test.each` to provide `TestContext`.

The difference from `test.each` is how array case is provided in the arguments. Other non array case (including template string usage) works exactly same.

ts

```
// `each` spreads array case
test.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])('add(%i, %i) -> %i', (a, b, expected) => { 
  expect(a + b).toBe(expected)
})

// `for` doesn't spread array case
test.for([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])('add(%i, %i) -> %i', ([a, b, expected]) => { 
  expect(a + b).toBe(expected)
})
```


2nd argument is `TestContext` and it can be used for concurrent snapshot, for example,

ts

```
test.concurrent.for([
  [1, 1],
  [1, 2],
  [2, 1],
])('add(%i, %i)', ([a, b], { expect }) => {
  expect(a + b).matchSnapshot()
})
```


bench ​
-----------------

*   **Type:** `(name: string | Function, fn: BenchFunction, options?: BenchOptions) => void`

`bench` defines a benchmark. In Vitest terms benchmark is a function that defines a series of operations. Vitest runs this function multiple times to display different performance results.

Vitest uses `tinybench` library under the hood, inheriting all its options that can be used as a third argument.

ts

```
import { bench } from 'vitest'

bench('normal sorting', () => {
  const x = [1, 5, 4, 2, 3]
  x.sort((a, b) => {
    return a - b
  })
}, { time: 1000 })
```


ts

```
export interface Options {
  /**
   * time needed for running a benchmark task (milliseconds)
   * @default 500
   */
  time?: number

  /**
   * number of times that a task should run if even the time option is finished
   * @default 10
   */
  iterations?: number

  /**
   * function to get the current timestamp in milliseconds
   */
  now?: () => number

  /**
   * An AbortSignal for aborting the benchmark
   */
  signal?: AbortSignal

  /**
   * Throw if a task fails (events will not work if true)
   */
  throws?: boolean

  /**
   * warmup time (milliseconds)
   * @default 100ms
   */
  warmupTime?: number

  /**
   * warmup iterations
   * @default 5
   */
  warmupIterations?: number

  /**
   * setup function to run before each benchmark task (cycle)
   */
  setup?: Hook

  /**
   * teardown function to run after each benchmark task (cycle)
   */
  teardown?: Hook
}
```


After the test case is run, the output structure information is as follows:

```
  name                      hz     min     max    mean     p75     p99    p995    p999     rme  samples
· normal sorting  6,526,368.12  0.0001  0.3638  0.0002  0.0002  0.0002  0.0002  0.0004  ±1.41%   652638
```


ts

```
export interface TaskResult {
  /*
   * the last error that was thrown while running the task
   */
  error?: unknown

  /**
   * The amount of time in milliseconds to run the benchmark task (cycle).
   */
  totalTime: number

  /**
   * the minimum value in the samples
   */
  min: number
  /**
   * the maximum value in the samples
   */
  max: number

  /**
   * the number of operations per second
   */
  hz: number

  /**
   * how long each operation takes (ms)
   */
  period: number

  /**
   * task samples of each task iteration time (ms)
   */
  samples: number[]

  /**
   * samples mean/average (estimate of the population mean)
   */
  mean: number

  /**
   * samples variance (estimate of the population variance)
   */
  variance: number

  /**
   * samples standard deviation (estimate of the population standard deviation)
   */
  sd: number

  /**
   * standard error of the mean (a.k.a. the standard deviation of the sampling distribution of the sample mean)
   */
  sem: number

  /**
   * degrees of freedom
   */
  df: number

  /**
   * critical value of the samples
   */
  critical: number

  /**
   * margin of error
   */
  moe: number

  /**
   * relative margin of error
   */
  rme: number

  /**
   * median absolute deviation
   */
  mad: number

  /**
   * p50/median percentile
   */
  p50: number

  /**
   * p75 percentile
   */
  p75: number

  /**
   * p99 percentile
   */
  p99: number

  /**
   * p995 percentile
   */
  p995: number

  /**
   * p999 percentile
   */
  p999: number
}
```


### bench.skip ​

*   **Type:** `(name: string | Function, fn: BenchFunction, options?: BenchOptions) => void`

You can use `bench.skip` syntax to skip running certain benchmarks.

ts

```
import { bench } from 'vitest'

bench.skip('normal sorting', () => {
  const x = [1, 5, 4, 2, 3]
  x.sort((a, b) => {
    return a - b
  })
})
```


### bench.only ​

*   **Type:** `(name: string | Function, fn: BenchFunction, options?: BenchOptions) => void`

Use `bench.only` to only run certain benchmarks in a given suite. This is useful when debugging.

ts

```
import { bench } from 'vitest'

bench.only('normal sorting', () => {
  const x = [1, 5, 4, 2, 3]
  x.sort((a, b) => {
    return a - b
  })
})
```


### bench.todo ​

*   **Type:** `(name: string | Function) => void`

Use `bench.todo` to stub benchmarks to be implemented later.

ts

```
import { bench } from 'vitest'

bench.todo('unimplemented test')
```


describe ​
-----------------------

When you use `test` or `bench` in the top level of file, they are collected as part of the implicit suite for it. Using `describe` you can define a new suite in the current context, as a set of related tests or benchmarks and other nested suites. A suite lets you organize your tests and benchmarks so reports are more clear.

ts

```
// basic.spec.ts
// organizing tests

import { describe, expect, test } from 'vitest'

const person = {
  isActive: true,
  age: 32,
}

describe('person', () => {
  test('person is defined', () => {
    expect(person).toBeDefined()
  })

  test('is active', () => {
    expect(person.isActive).toBeTruthy()
  })

  test('age limit', () => {
    expect(person.age).toBeLessThanOrEqual(32)
  })
})
```


ts

```
// basic.bench.ts
// organizing benchmarks

import { bench, describe } from 'vitest'

describe('sort', () => {
  bench('normal', () => {
    const x = [1, 5, 4, 2, 3]
    x.sort((a, b) => {
      return a - b
    })
  })

  bench('reverse', () => {
    const x = [1, 5, 4, 2, 3]
    x.reverse().sort((a, b) => {
      return a - b
    })
  })
})
```


You can also nest describe blocks if you have a hierarchy of tests or benchmarks:

ts

```
import { describe, expect, test } from 'vitest'

function numberToCurrency(value: number | string) {
  if (typeof value !== 'number') {
    throw new TypeError('Value must be a number')
  }

  return value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

describe('numberToCurrency', () => {
  describe('given an invalid number', () => {
    test('composed of non-numbers to throw error', () => {
      expect(() => numberToCurrency('abc')).toThrowError()
    })
  })

  describe('given a valid number', () => {
    test('returns the correct currency format', () => {
      expect(numberToCurrency(10000)).toBe('10,000.00')
    })
  })
})
```


### describe.skip ​

*   **Alias:** `suite.skip`

Use `describe.skip` in a suite to avoid running a particular describe block.

ts

```
import { assert, describe, test } from 'vitest'

describe.skip('skipped suite', () => {
  test('sqrt', () => {
    // Suite skipped, no error
    assert.equal(Math.sqrt(4), 3)
  })
})
```


### describe.skipIf ​

*   **Alias:** `suite.skipIf`

In some cases, you might run suites multiple times with different environments, and some of the suites might be environment-specific. Instead of wrapping the suite with `if`, you can use `describe.skipIf` to skip the suite whenever the condition is truthy.

ts

```
import { describe, test } from 'vitest'

const isDev = process.env.NODE_ENV === 'development'

describe.skipIf(isDev)('prod only test suite', () => {
  // this test suite only runs in production
})
```


WARNING

You cannot use this syntax when using Vitest as type checker.

### describe.runIf ​

*   **Alias:** `suite.runIf`

Opposite of describe.skipIf.

ts

```
import { assert, describe, test } from 'vitest'

const isDev = process.env.NODE_ENV === 'development'

describe.runIf(isDev)('dev only test suite', () => {
  // this test suite only runs in development
})
```


WARNING

You cannot use this syntax, when using Vitest as type checker.

### describe.only ​

*   **Type:** `(name: string | Function, fn: TestFunction, options?: number | TestOptions) => void`

Use `describe.only` to only run certain suites

ts

```
import { assert, describe, test } from 'vitest'

// Only this suite (and others marked with only) are run
describe.only('suite', () => {
  test('sqrt', () => {
    assert.equal(Math.sqrt(4), 3)
  })
})

describe('other suite', () => {
  // ... will be skipped
})
```


Sometimes it is very useful to run `only` tests in a certain file, ignoring all other tests from the whole test suite, which pollute the output.

In order to do that run `vitest` with specific file containing the tests in question.

```
# vitest interesting.test.ts
```


### describe.concurrent ​

*   **Alias:** `suite.concurrent`

`describe.concurrent` runs all inner suites and tests in parallel

ts

```
import { describe, test } from 'vitest'

// All suites and tests within this suite will be run in parallel
describe.concurrent('suite', () => {
  test('concurrent test 1', async () => { /* ... */ })
  describe('concurrent suite 2', async () => {
    test('concurrent test inner 1', async () => { /* ... */ })
    test('concurrent test inner 2', async () => { /* ... */ })
  })
  test.concurrent('concurrent test 3', async () => { /* ... */ })
})
```


`.skip`, `.only`, and `.todo` works with concurrent suites. All the following combinations are valid:

ts

```
describe.concurrent(/* ... */)
describe.skip.concurrent(/* ... */) // or describe.concurrent.skip(/* ... */)
describe.only.concurrent(/* ... */) // or describe.concurrent.only(/* ... */)
describe.todo.concurrent(/* ... */) // or describe.concurrent.todo(/* ... */)
```


When running concurrent tests, Snapshots and Assertions must use `expect` from the local Test Context to ensure the right test is detected.

ts

```
describe.concurrent('suite', () => {
  test('concurrent test 1', async ({ expect }) => {
    expect(foo).toMatchSnapshot()
  })
  test('concurrent test 2', async ({ expect }) => {
    expect(foo).toMatchSnapshot()
  })
})
```


WARNING

You cannot use this syntax, when using Vitest as type checker.

### describe.sequential ​

*   **Alias:** `suite.sequential`

`describe.sequential` in a suite marks every test as sequential. This is useful if you want to run tests in sequence within `describe.concurrent` or with the `--sequence.concurrent` command option.

ts

```
import { describe, test } from 'vitest'

describe.concurrent('suite', () => {
  test('concurrent test 1', async () => { /* ... */ })
  test('concurrent test 2', async () => { /* ... */ })

  describe.sequential('', () => {
    test('sequential test 1', async () => { /* ... */ })
    test('sequential test 2', async () => { /* ... */ })
  })
})
```


### describe.shuffle ​

*   **Alias:** `suite.shuffle`

Vitest provides a way to run all tests in random order via CLI flag `--sequence.shuffle` or config option `sequence.shuffle`, but if you want to have only part of your test suite to run tests in random order, you can mark it with this flag.

ts

```
import { describe, test } from 'vitest'

describe.shuffle('suite', () => {
  test('random test 1', async () => { /* ... */ })
  test('random test 2', async () => { /* ... */ })
  test('random test 3', async () => { /* ... */ })
})
// order depends on sequence.seed option in config (Date.now() by default)
```


`.skip`, `.only`, and `.todo` works with random suites.

WARNING

You cannot use this syntax, when using Vitest as type checker.

### describe.todo ​

*   **Alias:** `suite.todo`

Use `describe.todo` to stub suites to be implemented later. An entry will be shown in the report for the tests so you know how many tests you still need to implement.

ts

```
// An entry will be shown in the report for this suite
describe.todo('unimplemented suite')
```


### describe.each ​

*   **Alias:** `suite.each`

Use `describe.each` if you have more than one test that depends on the same data.

ts

```
import { describe, expect, test } from 'vitest'

describe.each([
  { a: 1, b: 1, expected: 2 },
  { a: 1, b: 2, expected: 3 },
  { a: 2, b: 1, expected: 3 },
])('describe object add($a, $b)', ({ a, b, expected }) => {
  test(`returns ${expected}`, () => {
    expect(a + b).toBe(expected)
  })

  test(`returned value not be greater than ${expected}`, () => {
    expect(a + b).not.toBeGreaterThan(expected)
  })

  test(`returned value not be less than ${expected}`, () => {
    expect(a + b).not.toBeLessThan(expected)
  })
})
```


Starting from Vitest 0.25.3, you can also use template string table.

*   First row should be column names, separated by `|`;
*   One or more subsequent rows of data supplied as template literal expressions using `${value}` syntax.

ts

```
import { describe, expect, test } from 'vitest'

describe.each`
  a               | b      | expected
  ${1}            | ${1}   | ${2}
  ${'a'}          | ${'b'} | ${'ab'}
  ${[]}           | ${'b'} | ${'b'}
  ${{}}           | ${'b'} | ${'[object Object]b'}
  ${{ asd: 1 }}   | ${'b'} | ${'[object Object]b'}
`('describe template string add($a, $b)', ({ a, b, expected }) => {
  test(`returns ${expected}`, () => {
    expect(a + b).toBe(expected)
  })
})
```


WARNING

You cannot use this syntax, when using Vitest as type checker.

Setup and Teardown ​
-------------------------------------------

These functions allow you to hook into the life cycle of tests to avoid repeating setup and teardown code. They apply to the current context: the file if they are used at the top-level or the current suite if they are inside a `describe` block. These hooks are not called, when you are running Vitest as a type checker.

### beforeEach ​

*   **Type:** `beforeEach(fn: () => Awaitable<void>, timeout?: number)`

Register a callback to be called before each of the tests in the current context runs. If the function returns a promise, Vitest waits until the promise resolve before running the test.

Optionally, you can pass a timeout (in milliseconds) defining how long to wait before terminating. The default is 5 seconds.

ts

```
import { beforeEach } from 'vitest'

beforeEach(async () => {
  // Clear mocks and add some testing data after before each test run
  await stopMocking()
  await addUser({ name: 'John' })
})
```


Here, the `beforeEach` ensures that user is added for each test.

`beforeEach` also accepts an optional cleanup function (equivalent to `afterEach`).

ts

```
import { beforeEach } from 'vitest'

beforeEach(async () => {
  // called once before each test run
  await prepareSomething()

  // clean up function, called once after each test run
  return async () => {
    await resetSomething()
  }
})
```


### afterEach ​

*   **Type:** `afterEach(fn: () => Awaitable<void>, timeout?: number)`

Register a callback to be called after each one of the tests in the current context completes. If the function returns a promise, Vitest waits until the promise resolve before continuing.

Optionally, you can provide a timeout (in milliseconds) for specifying how long to wait before terminating. The default is 5 seconds.

ts

```
import { afterEach } from 'vitest'

afterEach(async () => {
  await clearTestingData() // clear testing data after each test run
})
```


Here, the `afterEach` ensures that testing data is cleared after each test runs.

TIP

Vitest 1.3.0 added `onTestFinished` hook. You can call it during the test execution to cleanup any state after the test has finished running.

### beforeAll ​

*   **Type:** `beforeAll(fn: () => Awaitable<void>, timeout?: number)`

Register a callback to be called once before starting to run all tests in the current context. If the function returns a promise, Vitest waits until the promise resolve before running tests.

Optionally, you can provide a timeout (in milliseconds) for specifying how long to wait before terminating. The default is 5 seconds.

ts

```
import { beforeAll } from 'vitest'

beforeAll(async () => {
  await startMocking() // called once before all tests run
})
```


Here the `beforeAll` ensures that the mock data is set up before tests run.

`beforeAll` also accepts an optional cleanup function (equivalent to `afterAll`).

ts

```
import { beforeAll } from 'vitest'

beforeAll(async () => {
  // called once before all tests run
  await startMocking()

  // clean up function, called once after all tests run
  return async () => {
    await stopMocking()
  }
})
```


### afterAll ​

*   **Type:** `afterAll(fn: () => Awaitable<void>, timeout?: number)`

Register a callback to be called once after all tests have run in the current context. If the function returns a promise, Vitest waits until the promise resolve before continuing.

Optionally, you can provide a timeout (in milliseconds) for specifying how long to wait before terminating. The default is 5 seconds.

ts

```
import { afterAll } from 'vitest'

afterAll(async () => {
  await stopMocking() // this method is called after all tests run
})
```


Here the `afterAll` ensures that `stopMocking` method is called after all tests run.

Test Hooks ​
---------------------------

Vitest provides a few hooks that you can call _during_ the test execution to cleanup the state when the test has finished runnning.

WARNING

These hooks will throw an error if they are called outside of the test body.

### onTestFinished ​

This hook is always called after the test has finished running. It is called after `afterEach` hooks since they can influence the test result. It receives a `TaskResult` object with the current test result.

ts

```
import { onTestFinished, test } from 'vitest'

test('performs a query', () => {
  const db = connectDb()
  onTestFinished(() => db.close())
  db.query('SELECT * FROM users')
})
```


WARNING

If you are running tests concurrently, you should always use `onTestFinished` hook from the test context since Vitest doesn't track concurrent tests in global hooks:

ts

```
import { test } from 'vitest'

test.concurrent('performs a query', ({ onTestFinished }) => {
  const db = connectDb()
  onTestFinished(() => db.close())
  db.query('SELECT * FROM users')
})
```


This hook is particularly useful when creating reusable logic:

ts

```
// this can be in a separate file
function getTestDb() {
  const db = connectMockedDb()
  onTestFinished(() => db.close())
  return db
}

test('performs a user query', async () => {
  const db = getTestDb()
  expect(
    await db.query('SELECT * from users').perform()
  ).toEqual([])
})

test('performs an organization query', async () => {
  const db = getTestDb()
  expect(
    await db.query('SELECT * from organizations').perform()
  ).toEqual([])
})
```


TIP

This hook is always called in reverse order and is not affected by `sequence.hooks` option.

### onTestFailed ​

This hook is called only after the test has failed. It is called after `afterEach` hooks since they can influence the test result. It receives a `TaskResult` object with the current test result. This hook is useful for debugging.

ts

```
import { onTestFailed, test } from 'vitest'

test('performs a query', () => {
  const db = connectDb()
  onTestFailed((e) => {
    console.log(e.result.errors)
  })
  db.query('SELECT * FROM users')
})
```


WARNING

If you are running tests concurrently, you should always use `onTestFailed` hook from the test context since Vitest doesn't track concurrent tests in global hooks:

ts

```
import { test } from 'vitest'

test.concurrent('performs a query', ({ onTestFailed }) => {
  const db = connectDb()
  onTestFailed((result) => {
    console.log(result.errors)
  })
  db.query('SELECT * FROM users')
})
```



# Testing • Docs • Svelte
Testing helps you write and maintain your code and guard against regressions. Testing frameworks help you with that, allowing you to describe assertions or expectations about how your code should behave. Svelte is unopinionated about which testing framework you use — you can write unit tests, integration tests, and end-to-end tests using solutions like Vitest, Jasmine, Cypress and Playwright.

Unit and integration testing using Vitest[](#Unit-and-integration-testing-using-Vitest)
---------------------------------------------------------------------------------------

Unit tests allow you to test small isolated parts of your code. Integration tests allow you to test parts of your application to see if they work together. If you’re using Vite (including via SvelteKit), we recommend using Vitest.

To get started, install Vitest:

Then adjust your `vite.config.js`:

vite.config

```
import { defineConfig } from 'vitest/config';

export default defineConfig({
	// ...
	// Tell Vitest to use the `browser` entry points in `package.json` files, even though it's running in Node
	resolve: process.env.VITEST
		? {
				conditions: ['browser']
			}
		: undefined
});
```


> If loading the browser version of all your packages is undesirable, because (for example) you also test backend libraries, you may need to resort to an alias configuration

You can now write unit tests for code inside your `.js/.ts` files:

multiplier.svelte.test

```
import { flushSync } from 'svelte';
import { expect, test } from 'vitest';
import { multiplier } from './multiplier.js';

test('Multiplier', () => {
	let double = multiplier(0, 2);

	expect(double.value).toEqual(0);

	double.set(5);

	expect(double.value).toEqual(10);
});
```


### Using runes inside your test files[](#Unit-and-integration-testing-using-Vitest-Using-runes-inside-your-test-files)

It is possible to use runes inside your test files. First ensure your bundler knows to route the file through the Svelte compiler before running the test by adding `.svelte` to the filename (e.g `multiplier.svelte.test.js`). After that, you can use runes inside your tests.

multiplier.svelte.test

```
import { flushSync } from 'svelte';
import { expect, test } from 'vitest';
import { multiplier } from './multiplier.svelte.js';

test('Multiplier', () => {
	let count = $state(0);
	let double = multiplier(() => count, 2);

	expect(double.value).toEqual(0);

	count = 5;

	expect(double.value).toEqual(10);
});
```


If the code being tested uses effects, you need to wrap the test inside `$effect.root`:

logger.svelte.test

```
import { flushSync } from 'svelte';
import { expect, test } from 'vitest';
import { logger } from './logger.svelte.js';

test('Effect', () => {
	const cleanup = $effect.root(() => {
		let count = $state(0);

		// logger uses an $effect to log updates of its input
		let log = logger(() => count);

		// effects normally run after a microtask,
		// use flushSync to execute all pending effects synchronously
		flushSync();
		expect(log.value).toEqual([0]);

		count = 1;
		flushSync();

		expect(log.value).toEqual([0, 1]);
	});

	cleanup();
});
```


### Component testing[](#Unit-and-integration-testing-using-Vitest-Component-testing)

It is possible to test your components in isolation using Vitest.

> Before writing component tests, think about whether you actually need to test the component, or if it’s more about the logic _inside_ the component. If so, consider extracting out that logic to test it in isolation, without the overhead of a component

To get started, install jsdom (a library that shims DOM APIs):

Then adjust your `vite.config.js`:

vite.config

```
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		/* ... */
	],
	test: {
		// If you are testing components client-side, you need to setup a DOM environment.
		// If not all your files should have this environment, you can use a
		// `// @vitest-environment jsdom` comment at the top of the test files instead.
		environment: 'jsdom'
	},
	// Tell Vitest to use the `browser` entry points in `package.json` files, even though it's running in Node
	resolve: process.env.VITEST
		? {
				conditions: ['browser']
			}
		: undefined
});
```


After that, you can create a test file in which you import the component to test, interact with it programmatically and write expectations about the results:

component.test

```
import { flushSync, mount, unmount } from 'svelte';
import { expect, test } from 'vitest';
import Component from './Component.svelte';

test('Component', () => {
	// Instantiate the component using Svelte's `mount` API
	const component = mount(Component, {
		target: document.body, // `document` exists because of jsdom
		props: { initial: 0 }
	});

	expect(document.body.innerHTML).toBe('<button>0</button>');

	// Click the button, then flush the changes so you can synchronously write expectations
	document.body.querySelector('button').click();
	flushSync();

	expect(document.body.innerHTML).toBe('<button>1</button>');

	// Remove the component from the DOM
	unmount(component);
});
```


While the process is very straightforward, it is also low level and somewhat brittle, as the precise structure of your component may change frequently. Tools like @testing-library/svelte can help streamline your tests. The above test could be rewritten like this:

component.test

```
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import Component from './Component.svelte';

test('Component', async () => {
	const user = userEvent.setup();
	render(Component);

	const button = screen.getByRole('button');
	expect(button).toHaveTextContent(0);

	await user.click(button);
	expect(button).toHaveTextContent(1);
});
```


When writing component tests that involve two-way bindings, context or snippet props, it’s best to create a wrapper component for your specific test and interact with that. `@testing-library/svelte` contains some examples.

E2E tests using Playwright[](#E2E-tests-using-Playwright)
---------------------------------------------------------

E2E (short for ‘end to end’) tests allow you to test your full application through the eyes of the user. This section uses Playwright as an example, but you can also use other solutions like Cypress or NightwatchJS.

To get start with Playwright, either let you guide by their VS Code extension, or install it from the command line using `npm init playwright`. It is also part of the setup CLI when you run `npx sv create`.

After you’ve done that, you should have a `tests` folder and a Playwright config. You may need to adjust that config to tell Playwright what to do before running the tests - mainly starting your application at a certain port:

playwright.config

```
const config = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/
};

export default config;
```


You can now start writing tests. These are totally unaware of Svelte as a framework, so you mainly interact with the DOM and write assertions.

tests/hello-world.spec

```
import { expect, test } from '@playwright/test';

test('home page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('h1')).toBeVisible();
});
```