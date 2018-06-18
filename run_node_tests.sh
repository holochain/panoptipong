#!/bin/bash
counter=1
n_agents=2
initial_port=4140

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

  hcdev -agentID=$counter -bootstrapServer=localhost:3142 web $((initial_port + counter)) > ./hcdevlog.txt & 

  sleep 10

  cd ..

  ((counter++))
done

counter=1
while [ $counter -le $n_agents ]
do

  sleep 10

  cd ./pongChain$counter

  node ./test/nodeTests/testHolochainRuntime.js $((initial_port + counter)) > ./agentlog.txt &


  cd ..

  ((counter++))
done



echo Test Complete
