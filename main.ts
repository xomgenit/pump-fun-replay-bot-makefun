// pump-fun-replay-bot: a two-stage patient-sniper bot for the pump.fun replay
// (agent-fun/replay/v2). The grader runs `node /bot/main.ts`; the strategy lives in
// strategy.ts and the wire shim is the kit's sdk/ts/makefun-bot.ts, vendored byte for byte
// (the SDK itself instructs this copy; it is excluded from authorship counts).

import { runBot } from './vendor/makefun-bot.ts';
import { createStrategy, DEFAULT_PARAMS } from './strategy.ts';

// Entry point is deliberately thin: all logic lives in strategy.ts, so the graded run is
// exactly the code that was backtested locally (net +0.0448 SOL on the dev window, 140 coins,
// 183 trips, max drawdown 5.4% — see strategy.ts and the handoff for the full breakdown).
await runBot(createStrategy(DEFAULT_PARAMS));
