// The Meeting That Should Have Been an Email — program/v1 entry.
//
// One sharp line about a meeting that should have been an email.
// The program prints the line and writes it (no trailing newline) to
// $MAKEFUN_OUTPUT_DIR/entry.txt (or /output/entry.txt as a fallback),
// enforcing the entry gate: exactly one line, 1-200 chars, non-blank.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "We spent an hour in a room called Focus to agree that the email would have taken thirty seconds to read.";

const MAX_CHARS = 200;

function gate(line: string): void {
  if (!line || line.trim().length === 0) {
    throw new Error("entry must be non-blank");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} chars, got ${line.length}`);
  }
  if (/\s{2,}/.test(line)) {
    throw new Error("entry must not contain doubled whitespace");
  }
  if (!/[.!?]$/.test(line)) {
    throw new Error("entry must end with terminal punctuation");
  }
}

gate(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");

console.log(LINE);
console.log(`(${LINE.length} chars)`);
