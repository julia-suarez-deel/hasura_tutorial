# Run final API

## Steps
1. Go to the `.env` file and set the env variable `HASURA_SETTING_FOLDER` to `hasura-final`
2. Run `docker-compose down` at the root of the project
3. Run `docker-compose up -d`

With these simple steps we have told hasura via an environment variable that's used in the `docker-compose.yml` to use the `hasura-final` folder to get the metadata/migrations settings and for these changes to take effect we have deleted the old containers and created them from scratch.

To use the hasura console, te procedure is the same as explained in the tutorial, but we need to change the name of the folder with the settings:

`npx hasura console --project=hasura-final`
