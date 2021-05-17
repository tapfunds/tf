#!/bin/bash

# tag images
docker tag tf_goauth gcr.io/tapfunds-311512/auth
docker tag tf_client gcr.io/tapfunds-311512/client
docker tag tf_pyneo4j gcr.io/tapfunds-311512/neo4jmap
docker tag tf_plaid gcr.io/tapfunds-311512/plaid

# push images
docker push gcr.io/tapfunds-311512/auth
docker push gcr.io/tapfunds-311512/client
docker push gcr.io/tapfunds-311512/neo4jmap
docker push gcr.io/tapfunds-311512/plaid
