const { Pool } = require("pg");

const connectionString =
  process.env.OWNER_DATABASE_URL || process.env.DATABASE_URL;

const pool = new Pool({ connectionString });

async function resolveCognitoPerson(req, res, next) {
  if (!req.cognitoClaims) return next();

  try {
    const { sub, email, name } = req.cognitoClaims;

    const { rows } = await pool.query(
      "select id, role from app.upsert_person_from_cognito($1, $2, $3)",
      [sub, email, name]
    );

    if (!rows[0]) {
      return res.status(401).json({ error: "Unable to resolve app user" });
    }

    req.cognitoAuth = {
      person_id: rows[0].id,
      role: rows[0].role,
    };

    return next();
  } catch (err) {
    console.error("resolveCognitoPerson failed:", err);
    return res.status(500).json({ error: "Auth user resolution failed" });
  }
}

module.exports = { resolveCognitoPerson };
