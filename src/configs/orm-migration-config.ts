import { ConnectionOptions } from 'typeorm'

const DEFAULT_PSQL_HOST = 'localhost'
const DEFAULT_PSQL_PORT = 5432


const connectionOptions: ConnectionOptions = {
    type: 'postgres',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    database: process.env.PSQL_DATABASE,
    host: process.env.PSQL_HOST || DEFAULT_PSQL_HOST,
    port: parseInt(process.env.PSQL_PORT || `${DEFAULT_PSQL_PORT}`),
    ssl: {
        rejectUnauthorized: false,
    },
    username: process.env.PSQL_USERNAME,
    password: process.env.PSQL_PASSWORD,
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/migrations',
    },
}

export = connectionOptions