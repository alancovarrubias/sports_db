#!/bin/bash
for (( ; ; ))
do
  RAILS_ENV=production rake rating
done
