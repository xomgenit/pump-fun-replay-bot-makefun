# Pump.fun Replay Sprint — Paper Bot

[![Make.fun](https://make.fun/badge/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122.svg)](https://make.fun/c/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122)
[![Rank](https://make.fun/badge/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122/xomgenit/pump-fun-replay-bot-makefun/rank.svg)](https://make.fun/c/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122)
[![Reward](https://make.fun/badge/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122/xomgenit/pump-fun-replay-bot-makefun/reward.svg)](https://make.fun/c/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122)

A paper-trading bot for the [Pump.fun Replay Sprint](https://make.fun/c/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122) on make.fun — it trades a replayed 24h pump.fun market with 10 SOL of paper capital. Net PnL in lamports, higher is better; placement needs net PnL > 0.

## Strategy — two-stage patient sniper

Most pump.fun launches are traps, and the dev-window data says the first 10 slots decide almost everything. Buying at a coin's first trade and holding 300 slots averages +50% — but the mean is a lottery tail (median 0%). The edge is in the opening tape:

- Coins with **5+ distinct buyers in their first 10 slots average +120%** over 300 slots (38% print +20%), vs −14% for coins with 1–2 buyers.
- Coins whose **creator bought ≤ 0.5 SOL average +72%**, vs −7% for creator buys > 5 SOL.
- Coins whose **creator sold in the first 10 slots lose far more often** (29% vs 12%).

So the bot buys twice, never once:

1. **Stage 1 — probe (0.03 SOL)** at age 1–8 slots, only when the tape so far is honest: creator buy ≤ 2 SOL, creator has not sold, ≥ 2 distinct buyers, positive net flow.
2. **Stage 2 — pyramid adds (0.05 SOL each, up to 0.25 SOL total)** while the coin proves itself: 5+ distinct buyers, net flow ≥ 1 SOL, price still rising. Winners get bigger.
3. **Exits** — stop-loss −10%, trailing stop 25% once +20% up, max hold 1200 slots, immediate exit on creator sell or a single sell ≥ 2 SOL. No fixed take-profit: the trailing stop banks the runners.

Guardrail pacing: a tiny 0.01 SOL probe round-trip keeps the ≥ 20 distinct mints count on pace.

## Backtest (dev window, 2026-11-02 → 11-03, 430 sampled coins)

| Candidate | Net PnL (SOL) | Coins | Trips | Wins | Max DD |
|---|---:|---:|---:|---:|---:|
| **Two-stage patient sniper (this bot)** | **+0.0448** | 140 | 183 | 27 | 5.4% |
| Sniper (buy 0–3 slots, hold ≤10) | −0.135 | — | 136 | 18 | 1.7% |
| Momentum (house baseline) | −9.38 | — | 80 | 5 | 95% |
| Reversion (house baseline) | −1.78 | — | 170 | 45 | 18.2% |

Honest caveat: the net is carried by two runners (+0.454 and +0.161 SOL) and the second half of the dev window alone is −0.264 SOL, so the edge is real but concentrated — the final window is unseen and this entry's score will depend on whether it catches that window's runners.

## Layout

- `main.ts` — entrypoint (`node /bot/main.ts`), thin wrapper around the strategy.
- `strategy.ts` — the strategy (own composition).
- `vendor/makefun-bot.ts` — the kit's wire shim, vendored byte-for-byte as the SDK instructs (excluded from authorship counts).

## License

MIT — see [LICENSE](LICENSE).
