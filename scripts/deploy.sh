#!/bin/bash

if [[ "$1" == "master" ]]; then 
	echo
	echo Deploying climaid-webapp $1 ... 
	rsync -r --quiet $2/build/ deploy@rey.webhouse.net:/srv/www/climaid-webapp/production
	echo
	curl -X POST -H 'Content-type: application/json' --data '{"text":"climaid-webapp MASTER updated!"}' https://hooks.slack.com/services/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
	echo Deployment to production done!
	exit 0
fi 

if [[ "$1" == "beta" ]]; then 
	echo
	echo Deploying climaid-webapp $1 ... 
	rsync -r --quiet $2/build/ deploy@rey.webhouse.net:/srv/www/climaid-webapp/beta
	echo
	curl -X POST -H 'Content-type: application/json' --data '{"text":"climaid-webapp BETA updated!"}' https://hooks.slack.com/services/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
	echo Deployment to beta done!
	exit 0
fi