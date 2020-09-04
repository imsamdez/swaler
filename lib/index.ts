/**
 * Swaler Enumerations
 *  - types: List of log type that can be done
 *  - levels: List of log level that can set up
 */
export enum SwalerTypes {
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export enum SwalerLevels {
  TRACE = 1, // Do not start at 0 because 0 can be considered falsy in some case
  DEBUG = 2,
  INFO = 3,
  WARN = 4,
  ERROR = 5,
}

/**
 * Options that can be passed to Swaler constructor
 */
export interface SwalerOptions {
  level?: SwalerLevels;
}

/**
 * Options that can be passed when calling a log functions (trace, debug, info, warn, error)
 */
export interface SwalerLogOptions {
  ignoreLevel?: boolean; // If true, log function will ignore the level checking
}

/**
 * Define the console function to call for each type of log
 */
export const handlers = {
  [SwalerTypes.TRACE]: console.trace,
  [SwalerTypes.DEBUG]: console.debug,
  [SwalerTypes.INFO]: console.info,
  [SwalerTypes.WARN]: console.warn,
  [SwalerTypes.ERROR]: console.error,
};

let defaultLevel = SwalerLevels.DEBUG;

export class Swaler {
  private _level: SwalerLevels | null;
  private _logOpts: SwalerLogOptions | null;

  constructor(
    private _context: string | null = null,
    opts: SwalerOptions = {}
  ) {
    this._level = opts.level || null;
    this._logOpts = null;
  }

  private shouldLog(level: SwalerLevels) {
    const logOpts = this._logOpts || {};

    // Should log if ignoreLevel is set to true
    if (logOpts.ignoreLevel === true) {
      return true;
    }
    // Use the logger instance level if defined
    if (this._level != null) {
      return this._level <= level;
    }
    // Otherwise, use the global default level
    return defaultLevel <= level;
  }
  private log(callerArgs: IArguments, type: SwalerTypes, level: SwalerLevels) {
    const handler = handlers[type];
    let handlerArgs = [...callerArgs];

    if (this._context != null) {
      handlerArgs = [`[${this._context}]`].concat([...handlerArgs]);
    }
    if (this.shouldLog(level) === true) {
      handler.apply(null, [...handlerArgs] as [any, ...any[]]);
    }
    this._logOpts = null;
  }

  public withLogOptions(opts: SwalerLogOptions) {
    this._logOpts = opts;
    return this;
  }
  public trace(...data: any[]): void {
    this.log(arguments, SwalerTypes.TRACE, SwalerLevels.TRACE);
  }
  public debug(...data: any[]): void {
    this.log(arguments, SwalerTypes.DEBUG, SwalerLevels.DEBUG);
  }
  public info(...data: any[]): void {
    this.log(arguments, SwalerTypes.INFO, SwalerLevels.INFO);
  }
  public warn(...data: any[]): void {
    this.log(arguments, SwalerTypes.WARN, SwalerLevels.WARN);
  }
  public error(...data: any[]): void {
    this.log(arguments, SwalerTypes.ERROR, SwalerLevels.ERROR);
  }

  set level(level: SwalerLevels | null) {
    this._level = level;
  }
  get level(): SwalerLevels | null {
    return this._level;
  }
  get logOpts(): SwalerLogOptions | null {
    return this._logOpts;
  }
  get context(): string | null {
    return this._context;
  }

  static set defaultLevel(level: SwalerLevels) {
    defaultLevel = level;
  }
  static get defaultLevel() {
    return defaultLevel;
  }
}

/**
 * Utils provided only for testing purposes
 */
export const testsUtils = {
  handlers, // Tests need to mock handlers, so let's export it
};
