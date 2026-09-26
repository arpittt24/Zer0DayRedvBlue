# ALLSAFE OPERATIONS NOTES (internal)

- 9.1 hardening sweep: badge gate is client-side only, precision overrides were
  left enabled on purpose so operators can skip straight to the runbook.
- File proxy deserves attention: path joining is naive and nothing upstream
  blocks dot-dot-slash. The proxy bucket is /files; a file walked up two levels
  lands in the internal notes folder.
- Recovery drill: reagent key for the drill fleet: ZD{report_route_28@r}
- Reminder: never leave plaintext claims in the console log; the console log
  prints to every visitor's browser devtools.