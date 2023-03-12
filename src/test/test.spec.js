const { Pool } = require('pg');

const dbUser = 'blacksam';
const dbHost = 'postgresql-blacksam.alwaysdata.net';
const dbDatabase = 'blacksam_freecoders';
const dbPassword = 'blacksam1234..';
const dbPort = '5432';


describe('database connection', () => {
    let pool;

    beforeAll(() => {
        pool = new Pool({
            user: dbUser,
            host: dbHost,
            database: dbDatabase,
            password: dbPassword,
            port: dbPort,
        });
    });

    afterAll(() => {
        pool.end();
    });

    test('can connect to the database', async() => {
        const result = await pool.query('SELECT NOW()');
        expect(result.rows).toHaveLength(1);
    });

    test('select all from programadores returns 4 rows', async() => {
        const result = await pool.query('SELECT * FROM programadores');
        expect(result.rows).toHaveLength(4);
    });

    test('select from programadores where nombre is Gustavo, Sergio, Andrea, and Esteban', async() => {
        const result = await pool.query("SELECT * FROM programadores WHERE nombre IN ('Gustavo', 'Sergio', 'Andrea', 'Esteban')");
        expect(result.rows).toHaveLength(4);
    });

    test('can connect to the endpoint localhost:3600/home', async() => {
        const endpointPool = new Pool({
            user: dbUser,
            host: 'localhost',
            database: dbDatabase,
            password: dbPassword,
            port: 3600,
        });
        const result = await endpointPool.query('SELECT NOW()');
        expect(result.rows).toHaveLength(1);
        endpointPool.end();
    });

    test('can connect to the endpoint localhost:3600/perfil/1', async() => {
        const endpointPool = new Pool({
            user: dbUser,
            host: 'localhost',
            database: dbDatabase,
            password: dbPassword,
            port: 3600,
        });
        const result = await endpointPool.query('SELECT * FROM perfil WHERE id = 1');
        expect(result.rows).toHaveLength(1);
        endpointPool.end();
    });

    test('can connect to the endpoint localhost:3600/perfil/2', async() => {
        const endpointPool = new Pool({
            user: dbUser,
            host: 'localhost',
            database: dbDatabase,
            password: dbPassword,
            port: 3600,
        });
        const result = await endpointPool.query('SELECT * FROM perfil WHERE id = 2');
        expect(result.rows).toHaveLength(1);
        endpointPool.end();
    });

    test('can connect to the endpoint localhost:3600/perfil/3', async() => {
        const endpointPool = new Pool({
            user: dbUser,
            host: 'localhost',
            database: dbDatabase,
            password: dbPassword,
            port: 3600,
        });
        const result = await endpointPool.query('SELECT * FROM perfil WHERE id = 3');
        expect(result.rows).toHaveLength(1);
        endpointPool.end();
    });

    test('can connect to the endpoint localhost:3600/perfil/4', async() => {
        const endpointPool = new Pool({
            user: dbUser,
            host: 'localhost',
            database: dbDatabase,
            password: dbPassword,
            port: 3600,
        });
        const result = await endpointPool.query('SELECT * FROM perfil WHERE id = 4');
        expect(result.rows).toHaveLength(1);
        endpointPool.end();
    });
});