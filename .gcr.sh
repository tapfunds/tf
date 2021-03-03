#!/bin/bash

# tag images
docker tag tf_auth gcr.io/tapfunds-293118/auth
docker tag tf_tfclient gcr.io/tapfunds-293118/tfclient
docker tag tf_objectmapper gcr.io/tapfunds-293118/objectmapper
docker tag tf_plaid gcr.io/tapfunds-293118/plaid

# push images
docker push gcr.io/tapfunds-293118/auth
docker push gcr.io/tapfunds-293118/tfclient
docker push gcr.io/tapfunds-293118/objectmapper
docker push gcr.io/tapfunds-293118/plaid
