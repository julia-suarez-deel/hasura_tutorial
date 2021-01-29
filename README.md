# Hasura GraphQL Engine Practical Guide

This repository is a playground to build a GraphQL API over an existing postgres database using docker and nodeJS meant to teach you how to build and extend your API.

## Install
1. Clone the repository
2. Run `npm install`
3. Run `npm run database:clone`
4. Run `docker-compose up -d`
5. Run `npx hasura console --project=hasura-final`

Then you will have a GrahQL API ready for manual testing.

If you are interested in [learning about different hasura features using this database](https://paper.dropbox.com/doc/Hasura-GraphQL-Engine-Practical-Guide--BEHE2I7r2EaFtN1TCFIgS7d~AQ-e4ILLnhkCsEPtkFukgXky), checkout this tutorial to understand an overview about how to build a GraphQL API using hasura.
