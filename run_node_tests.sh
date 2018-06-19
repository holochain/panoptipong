#!/bin/bash
counter=1
n_agents=2
initial_port=4140
initial_dht_port=6000

killall hcdev
killall bs

bs &

sleep 10

while [ $counter -le $n_agents ]
do
  mkdir ./pongChain$counter
  cp -r PostPongChain/dna ./pongChain$counter
  cp -r PostPongChain/test ./pongChain$counter
  cd  ./pongChain$counter

  hcdev -agentID=$counter -bootstrapServer=localhost:3142 -DHTport=$((initial_dht_port + counter)) web $((initial_port + counter)) > ./hcdevlog.txt & 

  sleep 2

  cd ..

  ((counter++))
done

counter=1
while [ $counter -le $n_agents ]
do

  sleep 0.5

  cd ./pongChain$counter/test/nodeTests

  node testHolochainRuntime.js $((initial_port + counter)) > ../../agentlog.txt &

  cd ../../../

  ((counter++))
done



echo Test Complete
