import {
  Swaler,
  SwalerLevels,
  SwalerLogOptions,
  SwalerTypes,
  testsUtils,
} from '../lib';

describe('Create a logger', () => {
  it('Pass a context should create a logger with a context', () => {
    const ctx = 'Context';
    const logger = new Swaler(ctx);

    expect(logger.context).toEqual(ctx);
  });
  it('Pass options should create a logger with options', () => {
    const logger = new Swaler(null, {level: SwalerLevels.ERROR});

    expect(logger.level).toEqual(SwalerLevels.ERROR);
  });
});

describe('Handlers', () => {
  const logger = new Swaler(null, {level: SwalerLevels.TRACE});

  it('logger.trace should call console.trace with expected parameters', () => {
    expect(testsUtils.handlers[SwalerTypes.TRACE]).toEqual(console.trace);
    const mockHandlerTrace = jest.spyOn(testsUtils.handlers, SwalerTypes.TRACE);

    expect(mockHandlerTrace).not.toHaveBeenCalled();
    logger.trace('A', 'trace', 'message');
    expect(mockHandlerTrace).toHaveBeenCalledWith('A', 'trace', 'message');
    mockHandlerTrace.mockRestore();
  });
  it('logger.debug should call console.debug with expected parameters', () => {
    expect(testsUtils.handlers[SwalerTypes.DEBUG]).toEqual(console.debug);
    const mockHandlerDebug = jest.spyOn(testsUtils.handlers, SwalerTypes.DEBUG);

    expect(mockHandlerDebug).not.toHaveBeenCalled();
    logger.debug('A', 'debug', 'message');
    expect(mockHandlerDebug).toHaveBeenCalledWith('A', 'debug', 'message');
    mockHandlerDebug.mockRestore();
  });
  it('logger.info should call console.info with expected parameters', () => {
    expect(testsUtils.handlers[SwalerTypes.INFO]).toEqual(console.info);
    const mockHandlerInfo = jest.spyOn(testsUtils.handlers, SwalerTypes.INFO);

    expect(mockHandlerInfo).not.toHaveBeenCalled();
    logger.info('An', 'info', 'message');
    expect(mockHandlerInfo).toHaveBeenCalledWith('An', 'info', 'message');
    mockHandlerInfo.mockRestore();
  });
  it('logger.warn should call console.warn with expected parameters', () => {
    expect(testsUtils.handlers[SwalerTypes.WARN]).toEqual(console.warn);
    const mockHandlerWarn = jest.spyOn(testsUtils.handlers, SwalerTypes.WARN);

    expect(mockHandlerWarn).not.toHaveBeenCalled();
    logger.warn('A', 'warn', 'message');
    expect(mockHandlerWarn).toHaveBeenCalledWith('A', 'warn', 'message');
    mockHandlerWarn.mockRestore();
  });
  it('logger.error should call console.error with expected parameters', () => {
    expect(testsUtils.handlers[SwalerTypes.ERROR]).toEqual(console.error);
    const mockHandlerError = jest.spyOn(testsUtils.handlers, SwalerTypes.ERROR);

    expect(mockHandlerError).not.toHaveBeenCalled();
    logger.error('An', 'error', 'message');
    expect(mockHandlerError).toHaveBeenCalledWith('An', 'error', 'message');
    mockHandlerError.mockRestore();
  });
});

describe('Level', () => {
  const logger = new Swaler(null);
  let mockHandlerTrace = null;
  let mockHandlerDebug = null;
  let mockHandlerInfo = null;
  let mockHandlerWarn = null;
  let mockHandlerError = null;

  beforeAll(() => {
    mockHandlerTrace = jest.spyOn(testsUtils.handlers, SwalerTypes.TRACE);
    mockHandlerDebug = jest.spyOn(testsUtils.handlers, SwalerTypes.DEBUG);
    mockHandlerInfo = jest.spyOn(testsUtils.handlers, SwalerTypes.INFO);
    mockHandlerWarn = jest.spyOn(testsUtils.handlers, SwalerTypes.WARN);
    mockHandlerError = jest.spyOn(testsUtils.handlers, SwalerTypes.ERROR);
  });
  afterAll(() => {
    mockHandlerTrace.mockRestore();
    mockHandlerDebug.mockRestore();
    mockHandlerInfo.mockRestore();
    mockHandlerWarn.mockRestore();
    mockHandlerError.mockRestore();
  });
  beforeEach(() => {
    expect(mockHandlerTrace).not.toHaveBeenCalled();
    expect(mockHandlerDebug).not.toHaveBeenCalled();
    expect(mockHandlerInfo).not.toHaveBeenCalled();
    expect(mockHandlerWarn).not.toHaveBeenCalled();
    expect(mockHandlerError).not.toHaveBeenCalled();
  });
  afterEach(() => {
    mockHandlerTrace.mockReset();
    mockHandlerDebug.mockReset();
    mockHandlerInfo.mockReset();
    mockHandlerWarn.mockReset();
    mockHandlerError.mockReset();
  });

  it('"defaultLevel" should be DEBUG by default', () => {
    expect(Swaler.defaultLevel).toEqual(SwalerLevels.DEBUG);
  });
  it('"Swaler.setDefaultLevel" should update "defaultLevel"', () => {
    expect(Swaler.defaultLevel).toEqual(SwalerLevels.DEBUG);
    Swaler.defaultLevel = SwalerLevels.INFO;
    expect(Swaler.defaultLevel).toEqual(SwalerLevels.INFO);
  });
  it('"Swaler.getDefaultLevel" should return "defaultLevel"', () => {
    Swaler.defaultLevel = SwalerLevels.ERROR;
    expect(Swaler.defaultLevel).toEqual(SwalerLevels.ERROR);
  });
  it('"defaultLevel" set to "SwalerLevel.TRACE" mode should log only expected logs', () => {
    Swaler.defaultLevel = SwalerLevels.TRACE;
    logger.trace('A', 'trace', 'log');
    logger.debug('A', 'debug', 'log');
    logger.info('An', 'info', 'log');
    logger.warn('A', 'warn', 'log');
    logger.error('An', 'error', 'log');
    expect(mockHandlerTrace).toHaveBeenCalled();
    expect(mockHandlerDebug).toHaveBeenCalled();
    expect(mockHandlerInfo).toHaveBeenCalled();
    expect(mockHandlerWarn).toHaveBeenCalled();
    expect(mockHandlerError).toHaveBeenCalled();
  });
  it('"defaultLevel" set to "SwalerLevel.DEBUG"  mode should log only expected logs', () => {
    Swaler.defaultLevel = SwalerLevels.DEBUG;
    logger.trace('A', 'trace', 'log');
    logger.debug('A', 'debug', 'log');
    logger.info('An', 'info', 'log');
    logger.warn('A', 'warn', 'log');
    logger.error('An', 'error', 'log');
    expect(mockHandlerTrace).not.toHaveBeenCalled();
    expect(mockHandlerDebug).toHaveBeenCalled();
    expect(mockHandlerInfo).toHaveBeenCalled();
    expect(mockHandlerWarn).toHaveBeenCalled();
    expect(mockHandlerError).toHaveBeenCalled();
  });
  it('"defaultLevel" set to "SwalerLevel.INFO"  mode should log only expected logs', () => {
    Swaler.defaultLevel = SwalerLevels.INFO;
    logger.trace('A', 'trace', 'log');
    logger.debug('A', 'debug', 'log');
    logger.info('An', 'info', 'log');
    logger.warn('A', 'warn', 'log');
    logger.error('An', 'error', 'log');
    expect(mockHandlerTrace).not.toHaveBeenCalled();
    expect(mockHandlerDebug).not.toHaveBeenCalled();
    expect(mockHandlerInfo).toHaveBeenCalled();
    expect(mockHandlerWarn).toHaveBeenCalled();
    expect(mockHandlerError).toHaveBeenCalled();
  });
  it('"defaultLevel" set to "SwalerLevel.WARN"  mode should log only expected logs', () => {
    Swaler.defaultLevel = SwalerLevels.WARN;
    logger.trace('A', 'trace', 'log');
    logger.debug('A', 'debug', 'log');
    logger.info('An', 'info', 'log');
    logger.warn('A', 'warn', 'log');
    logger.error('An', 'error', 'log');
    expect(mockHandlerTrace).not.toHaveBeenCalled();
    expect(mockHandlerDebug).not.toHaveBeenCalled();
    expect(mockHandlerInfo).not.toHaveBeenCalled();
    expect(mockHandlerWarn).toHaveBeenCalled();
    expect(mockHandlerError).toHaveBeenCalled();
  });
  it('"defaultLevel" set to "SwalerLevel.ERROR"  mode should log only expected logs', () => {
    Swaler.defaultLevel = SwalerLevels.ERROR;
    logger.trace('A', 'trace', 'log');
    logger.debug('A', 'debug', 'log');
    logger.info('An', 'info', 'log');
    logger.warn('A', 'warn', 'log');
    logger.error('An', 'error', 'log');
    expect(mockHandlerTrace).not.toHaveBeenCalled();
    expect(mockHandlerDebug).not.toHaveBeenCalled();
    expect(mockHandlerInfo).not.toHaveBeenCalled();
    expect(mockHandlerWarn).not.toHaveBeenCalled();
    expect(mockHandlerError).toHaveBeenCalled();
  });
  it('"logger.setLevel" should set while "logger.getLevel" should return the instantiate logger level', () => {
    logger.level = SwalerLevels.INFO;
    expect(logger.level).toEqual(SwalerLevels.INFO);
  });
  it('"logger.shouldLog" should use logger.level if set instead of default level', () => {
    Swaler.defaultLevel = SwalerLevels.INFO;
    logger.level = SwalerLevels.ERROR;
    logger.trace('A', 'trace', 'log');
    logger.debug('A', 'debug', 'log');
    logger.info('An', 'info', 'log');
    logger.warn('A', 'warn', 'log');
    logger.error('An', 'error', 'log');
    expect(mockHandlerTrace).not.toHaveBeenCalled();
    expect(mockHandlerDebug).not.toHaveBeenCalled();
    expect(mockHandlerInfo).not.toHaveBeenCalled();
    expect(mockHandlerWarn).not.toHaveBeenCalled();
    expect(mockHandlerError).toHaveBeenCalled();
  });
  it('"logger.level" set to "SwalerLevels.TRACE" mode should log only expected logs', () => {
    logger.level = SwalerLevels.TRACE;
    logger.trace('A', 'trace', 'log');
    logger.debug('A', 'debug', 'log');
    logger.info('An', 'info', 'log');
    logger.warn('A', 'warn', 'log');
    logger.error('An', 'error', 'log');
    expect(mockHandlerTrace).toHaveBeenCalled();
    expect(mockHandlerDebug).toHaveBeenCalled();
    expect(mockHandlerInfo).toHaveBeenCalled();
    expect(mockHandlerWarn).toHaveBeenCalled();
    expect(mockHandlerError).toHaveBeenCalled();
  });
  it('"logger.level" set to "SwalerLevels.DEBUG" mode should log only expected logs', () => {
    logger.level = SwalerLevels.DEBUG;
    logger.trace('A', 'trace', 'log');
    logger.debug('A', 'debug', 'log');
    logger.info('An', 'info', 'log');
    logger.warn('A', 'warn', 'log');
    logger.error('An', 'error', 'log');
    expect(mockHandlerTrace).not.toHaveBeenCalled();
    expect(mockHandlerDebug).toHaveBeenCalled();
    expect(mockHandlerInfo).toHaveBeenCalled();
    expect(mockHandlerWarn).toHaveBeenCalled();
    expect(mockHandlerError).toHaveBeenCalled();
  });
  it('"logger.level" set to "SwalerLevels.INFO" mode should log only expected logs', () => {
    logger.level = SwalerLevels.INFO;
    logger.trace('A', 'trace', 'log');
    logger.debug('A', 'debug', 'log');
    logger.info('An', 'info', 'log');
    logger.warn('A', 'warn', 'log');
    logger.error('An', 'error', 'log');
    expect(mockHandlerTrace).not.toHaveBeenCalled();
    expect(mockHandlerDebug).not.toHaveBeenCalled();
    expect(mockHandlerInfo).toHaveBeenCalled();
    expect(mockHandlerWarn).toHaveBeenCalled();
    expect(mockHandlerError).toHaveBeenCalled();
  });
  it('"logger.level" set to "SwalerLevels.WARN" mode should log only expected logs', () => {
    logger.level = SwalerLevels.WARN;
    logger.trace('A', 'trace', 'log');
    logger.debug('A', 'debug', 'log');
    logger.info('An', 'info', 'log');
    logger.warn('A', 'warn', 'log');
    logger.error('An', 'error', 'log');
    expect(mockHandlerTrace).not.toHaveBeenCalled();
    expect(mockHandlerDebug).not.toHaveBeenCalled();
    expect(mockHandlerInfo).not.toHaveBeenCalled();
    expect(mockHandlerWarn).toHaveBeenCalled();
    expect(mockHandlerError).toHaveBeenCalled();
  });
  it('"logger.level" set to "SwalerLevels.ERROR" mode should log only expected logs', () => {
    logger.level = SwalerLevels.ERROR;
    logger.trace('A', 'trace', 'log');
    logger.debug('A', 'debug', 'log');
    logger.info('An', 'info', 'log');
    logger.warn('A', 'warn', 'log');
    logger.error('An', 'error', 'log');
    expect(mockHandlerTrace).not.toHaveBeenCalled();
    expect(mockHandlerDebug).not.toHaveBeenCalled();
    expect(mockHandlerInfo).not.toHaveBeenCalled();
    expect(mockHandlerWarn).not.toHaveBeenCalled();
    expect(mockHandlerError).toHaveBeenCalled();
  });
});

describe('Log with options', () => {
  const logger = new Swaler(null);
  let mockHandlerTrace = null;
  let mockHandlerDebug = null;
  let mockHandlerInfo = null;
  let mockHandlerWarn = null;
  let mockHandlerError = null;

  beforeAll(() => {
    mockHandlerTrace = jest.spyOn(testsUtils.handlers, SwalerTypes.TRACE);
    mockHandlerDebug = jest.spyOn(testsUtils.handlers, SwalerTypes.DEBUG);
    mockHandlerInfo = jest.spyOn(testsUtils.handlers, SwalerTypes.INFO);
    mockHandlerWarn = jest.spyOn(testsUtils.handlers, SwalerTypes.WARN);
    mockHandlerError = jest.spyOn(testsUtils.handlers, SwalerTypes.ERROR);
  });
  afterAll(() => {
    mockHandlerTrace.mockRestore();
    mockHandlerDebug.mockRestore();
    mockHandlerInfo.mockRestore();
    mockHandlerWarn.mockRestore();
    mockHandlerError.mockRestore();
  });
  beforeEach(() => {
    expect(mockHandlerTrace).not.toHaveBeenCalled();
    expect(mockHandlerDebug).not.toHaveBeenCalled();
    expect(mockHandlerInfo).not.toHaveBeenCalled();
    expect(mockHandlerWarn).not.toHaveBeenCalled();
    expect(mockHandlerError).not.toHaveBeenCalled();
  });
  afterEach(() => {
    mockHandlerTrace.mockReset();
    mockHandlerDebug.mockReset();
    mockHandlerInfo.mockReset();
    mockHandlerWarn.mockReset();
    mockHandlerError.mockReset();
  });
  it('"Swaler.withOptions" should set Swaler.logOpts and calling a log should reset log options', () => {
    const logOpts: SwalerLogOptions = {ignoreLevel: true};

    logger.withLogOptions(logOpts);
    expect(logger.logOpts).toEqual(logOpts);
    logger.withLogOptions(logOpts).info('An', 'info', 'log');
    expect(logger.logOpts).toBeNull();
  });
  it('"opts.ignoreLevel" should make the log ignoring the "logger.level" or "defaultLevel"', () => {
    const logOpts: SwalerLogOptions = {ignoreLevel: true};

    logger.level = SwalerLevels.ERROR;
    logger.withLogOptions(logOpts).trace('A', 'trace', 'log');
    logger.withLogOptions(logOpts).debug('A', 'debug', 'log');
    logger.withLogOptions(logOpts).info('An', 'info', 'log');
    logger.withLogOptions(logOpts).warn('A', 'warn', 'log');
    logger.withLogOptions(logOpts).error('An', 'error', 'log');
    expect(mockHandlerTrace).toHaveBeenCalled();
    expect(mockHandlerDebug).toHaveBeenCalled();
    expect(mockHandlerInfo).toHaveBeenCalled();
    expect(mockHandlerWarn).toHaveBeenCalled();
    expect(mockHandlerError).toHaveBeenCalled();
  });
});
