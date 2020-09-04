# Swaler

![build](https://github.com/imsamdez/swaler/workflows/build/badge.svg?branch=master)
![Publish to NPM](https://github.com/imsamdez/swaler/workflows/Publish%20to%20NPM/badge.svg)

Swaler makes you easy and simple to log message in your web app, but not only that!

It has been developed on top of javascript [console](https://developer.mozilla.org/en-US/docs/Web/API/console) and support the following methods: `.trace`, `.debug`, `.info`, `.warn`, `.error`

## Installation

```bash
npm install swaler
```

## Usage

```typescript
import {Logger} from 'swaler';

// A simple logger
const logger = new Logger();

logger.debug('Hello there!'); // Hello there!

// A logger with a Context
const loggerWithCtx = new Logger('Dalaran');

loggerWithCtx.debug('A new expansion has been detected...');
loggerWithCtx.info(`Time to go to Northrend.`);
loggerWithCtx.warn('Attention', 'to', 'take off!');
loggerWithCtx.error('A %s has been found!', 'crater');

// [Dalaran] A new expansion has been detected...
// [Dalaran] Time to go to Northrend.
// [Dalaran] Attention to take off!
// [Dalaran] A crater has been found!
```

# Create a logger

```typescript
// Several ways to create a logger
const logger = new Logger();
const logger = new Logger(context);
const logger = new Logger(null, opts);
const logger = new Logger(context, opts);
```

## context

type: `string`

default: `null`

Give the logger a specific context that will be prompt between brackets

Very useful when, for examples, you want to log messages in some of your components without having to specify the component name each time you log something!

```typescript
// Example using Context

import {Swaler} from 'swaler';

class AuthService {
  constructor() {
    this.logger = new Swaler('AuthService');
  }

  signIn() {
    // ... your awesome sign in implementation ...

    this.logger.info('User has successfully signed in!');
    // ... or maybe ...
    this.logger.error('An error occurred when trying to sign in user');
  }
}

// [AuthService] User has successfully signed in!
// [AuthService] An error occurred when trying to sign in user!
```

## opts.level

type: `SwalerLevel`

default: `null`

Set the minimal level of log to display

```typescript
import {Swaler, SwalerLevels} from 'swaler';

const logger = new Swaler(null, {level: SwalerLevels.WARN});

logger.debug("Won't be logged!");
logger.info("Won't be logged!");
logger.warn('Will be logged!');
logger.error('Will be logged!');
```

# Log

All log methods are built on top of [console](https://developer.mozilla.org/en-US/docs/Web/API/console) which means that each Swaler log methods act the same way than [console](https://developer.mozilla.org/en-US/docs/Web/API/console) methods!

## logger.trace

Display a trace log

```typescript
logger.trace('A trace message');
```

## logger.debug

Display a debug message

```typescript
logger.debug('A debug message');
```

## logger.info

Display an info message

```typescript
logger.info('A info message');
```

## logger.warn

Display a warn message

```typescript
logger.warn('A warn message');
```

## logger.error

Display a error message

```typescript
logger.error('An error message');
```

# Log with options

Sometimes, you may need to pass options when calling a log. To do so, use `withLogOptions()` methods

```typescript
logger
  .withLogOptions({
    ignoreLevel: boolean,
  })
  .info('An info message with options');
```

### Available options

| options     | Type    | Description                                   |
| ----------- | ------- | --------------------------------------------- |
| ignoreLevel | boolean | Make the log ignoring the level of the logger |

<br>

### SwalerLogOptions.ignoreLevel

```typescript
const logger = new Logger('AuthModule', {level: SwalerLevels.WARN});

logger
  .withLogOptions({ignoreLevel: true})
  .info('Will be logged despite the WARN levels!');
```

# Misc

## Swaler.defaultLevel

type: `SwalerLevels`

default: `SwalerLevels.DEBUG`

By default, all loggers will use the `defaultLevel` if you do not pass a `opts.level`.

```typescript
import {Swaler, SwalerLevels} from 'swaler';

Swaler.defaultLevel =
  process.env.NODE_ENV === 'production'
    ? SwalerLevels.WARN
    : SwalerLevels.DEBUG;

const logger = new Swaler();
const loggerWithLevel = new Swaler(null, {level: SwalerLevels.INFO});

logger.info("Won't be logged");
loggerWithLevel.info('Will be logged');
```

### Why are you using `process.env` here ?

Check [this article on how to manage front-end js env variable](https://www.robertcooper.me/front-end-javascript-environment-variables)

#

## Contributing

You are welcome to contribute, see [Contributing](https://github.com/imsamdez/swaler/blob/master/.github/CONTRIBUTING.md).

## License

[MIT](https://choosealicense.com/licenses/mit/)
