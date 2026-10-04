#!/usr/bin/env bash
# Starts the Organic Origin site locally and prints the URL to open.
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")"

PORT="${PORT:-5173}"

if ! command -v node >/dev/null 2>&1; then
  echo "node not found on PATH. If you just set this up, open a new terminal" >&2
  echo "(or run: source ~/.bashrc) and try again." >&2
  exit 1
fi

port_in_use() {
  curl -s -o /dev/null --max-time 1 "http://localhost:$1"
}

# If something is already answering on $PORT, assume a previous run of this
# script is still serving the site there and just reuse it.
if port_in_use "$PORT"; then
  echo ""
  echo "Already running:"
  echo "  -> http://localhost:${PORT}"
  echo ""
  exit 0
fi

if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm install
fi

# Port is free but something unrelated might still be bound to it and not
# respond to plain HTTP (rare) -- fall back to the next few ports if so.
for candidate in "$PORT" $((PORT + 1)) $((PORT + 2)) $((PORT + 3)); do
  if ! (exec 3<>"/dev/tcp/127.0.0.1/$candidate") 2>/dev/null; then
    PORT="$candidate"
    break
  fi
  exec 3>&- 2>/dev/null || true
done

echo ""
echo "Starting dev server..."
echo "  -> http://localhost:${PORT}"
echo ""

exec npm run dev -- --port "$PORT" --strictPort
