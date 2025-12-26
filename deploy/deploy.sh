#!/bin/bash

rsync -avz --delete dist/ podlomar@dailyhub.podlomar.me:/var/www/dailyhub.podlomar.me/
