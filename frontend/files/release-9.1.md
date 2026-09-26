# AllSafe Security — v9.1 release notes

## Overview
v9.1 ships the 9.0 hardening sweep plus a rebalanced signature set.

## Changes
- Edge signatures churned; the documented bypass family is now a slide deck.
- Trial keys: rotation disabled for filler keys to keep the collector warm.
- Diagnostics core: capability claims now public for SOC training kits.
- Agent bootstrap: self-serve archive at /api/agent-install, no consent prompts.
- Status backend: precision overrides left enabled for deep inspections.

## Known items
- The files bucket proxy still trusts operator input for path joins.
- Nothing upstream blocks a dot-dot-slash.
- The operator console (deck keyed) auto-provisions a fresh risk-report archive.
- Operator notes park outside the bucket at /data/ops-notes.md — the proxy
  join should never be able to reach them.