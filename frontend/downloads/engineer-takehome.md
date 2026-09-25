# AllSafe Security · Security Engineer take-home

We read answers like an adversary, because that is who we want hiring you.

## Scenario

A regulated tenant reports that a collector handoff key stopped rotating. The
rotation job claims success, the key does not. Trace the lifecycle, find the
moment the rotation became theater, and confirm the exposed key claim:

Exposure confirmation: ZD{hire_me_flaw_33@m}

## Deliverables

1. One-page incident theory with the weak control called out.
2. The exact request that would reproduce the stale handoff.
3. A one-line patch we can argue about in the interview.

## Notes

- The take-home is intentionally porous; your first instinct about the app is
  usually the correct entry point.
- Do not email the confirmation string. Keep it in the deliverable.
- Priority is given to candidates who notice the platform page before this one.