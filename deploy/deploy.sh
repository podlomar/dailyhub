#!/bin/bash

# Check if ssh-agent is running
if [ -z "$SSH_AUTH_SOCK" ]; then
  echo "Starting ssh-agent..."
  eval "$(ssh-agent -s)"
  AGENT_STARTED=1
fi

# Check if key is already added
if ! ssh-add -l &>/dev/null; then
  echo "Adding SSH key to agent..."
  ssh-add
fi

# Run rsync
rsync -avz --delete \
  --include='dist/***' \
  --include='package.json' \
  --include='package-lock.json' \
  --exclude='*' \
  ./ podlomar@dailyhub.podlomar.me:/var/www/dailyhub.podlomar.me/
ssh -t podlomar@dailyhub.podlomar.me '
  bash -lc "cd /var/www/dailyhub.podlomar.me && npm install --omit=dev && sudo systemctl restart dailyhub.service"
'

# Kill agent if we started it
if [ "$AGENT_STARTED" = "1" ]; then
  echo "Stopping ssh-agent..."
  eval "$(ssh-agent -k)"
fi
