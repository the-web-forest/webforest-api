# Database

## Creating Migrations
	npx typeorm migration:create ./migrations/MigrationName

## Running Migrations
	npx typeorm-ts-node-esm migration:run -d ./data-source.ts

# Errors
|Code|Description  |
|--|--|
|WF-0001 |User Already Registered|
|WF-0002 |User Not Found|
|WF-0003 |User Not Activated|
|WF-0004 |NickName Already Registered|
|WF-0005 |Biome Already Registered|
|WF-0006 |Volunteer Already Registered|