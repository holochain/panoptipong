#!/bin/bash
counter=1
n_agents=2
initial_port=4141

while [ $counter -le $n_agents ]
do
  cp -r ./PostPongChain ./pongChain$counter
  cd  ./pongChain$counter

  hcdev web $((initial_port + counter)) &

  cd ..

  ((counter++))
done

sleep 5

counter=1
while [ $counter -le $n_agents ]
do
  cd ./pongChain$counter

  node ./test/nodeTests/testHolochainRuntime.js $((initial_port + counter)) &

  cd ..

  ((counter++))
done



echo Test Complete
