import pg from "pg";

/*export const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "bdhotel",
  password: "admin",
  port: 5432,
});*/

export const pool = new pg.Pool({
  user: "admin",
  host: "localhost",
  database: "hotel_db",
  password: "admin123",
  port: 5432,
});
