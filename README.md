# Swaler

Swaler makes you easy and simple to log message in your web app, but not only that!

## Installation

```bash
npm install swaler
```

## Usage

```typescript
import { Logger } from "swaler";

const logger = new Logger("Dalaran");

logger.debug("WOTLK has been detected..."); // [Dalaran] WOTLK has been detected...
logger.info("Time to go to Northrend.");
logger.warn("Attention to take off!");
logger.error("A crater has been found!");
```

# API

```typescript
const logger = new Logger(context, opts);
```

## context

type: `string`

default: `null`

Give the logger a specific context that will be prompt between brackets

#

## Contributing

You are welcome to contribute, see [Contributing](https://github.com/imsamdez/swaler/blob/master/.github/CONTRIBUTING.md).

## License

[MIT](https://choosealicense.com/licenses/mit/)
