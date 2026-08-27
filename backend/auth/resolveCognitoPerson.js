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

    // A person who is not on the approved list makes the function return
    // null, which arrives here as a single row of nulls rather than as no
    // rows at all, so the id has to be checked and not just the row.
    if (!rows[0] || rows[0].id === null) {
      return res.status(401).json({
        error: "This account is not authorized to use the meal planner",
      });
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
