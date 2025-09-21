// import express, { Request, Response } from "express";
// import passport from "passport";
// import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";

// const express = require("express");
const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
// import fetch from "node-fetch";

// type SocialLoginUser = {
// 	provider: string;
// 	provider_user_id: string;
// 	email: string | null;
// 	full_name: string | null;
// 	access_token: string;
// 	refresh_token: string;
// 	id_token: string;
// 	token_response: any;
// };

// // You must implement this to save the user in the database
// async function upsertSocialLogin(user: SocialLoginUser): Promise<void> {
// 	// TODO: Replace this with actual PostGraphile mutation or DB logic
// 	console.log("Saving to DB:", user);
// }

function getFrontendOrigin(req) {
	const proto = req.headers["x-forwarded-proto"] || req.protocol;
	const host = req.headers["x-forwarded-host"] || req.get("host");
	return `${proto}://${host}`;
}




console.log('google.ts')
function setUpGoogleAuth(app) {
	console.log("[auth] Google routes registered");

	async function fetchUserinfo(accessToken) {
		if (!accessToken) return {};
		try {
			const resp = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			return resp.ok ? await resp.json() : {};
		} catch (err) {
			console.log(`Error in fetchUserinfo: ${err}`);
			return {};
		}
	}

	passport.use(new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
			passReqToCallback: true //Enabled to receive id_token
		},
		async (req, access_token, refresh_token, params, profile, done) => {
			// const id_token = params?.id_token; // <-- OIDC JWT
			// return done(null, { provider: "Google" }, { accessToken, refreshToken, id_token, profile });
			try {
				let email = profile.emails && profile.emails.length ? profile.emails[0].value : null;
				let fullName = profile.displayName || null;
				let accessToken = access_token ?? null;
				if (!email || !fullName) {
					const user = await fetchUserinfo(accessToken);
					email = email || user.email || null;
					fullName = fullName || user?.name ||
						[user?.given_name, user?.family_name].filter(Boolean).join(" ") || null;
				}

				const expires_in = params?.expires_in ?? null;
				const expires_at = (expires_in != null) ? new Date(Date.now() + expires_in * 1000) : null;
				console.log(`expires_in: ${expires_in}, expires_at: ${expires_at}`)
				let data = {
					provider: "Google",
					provider_user_id: profile.id,
					access_token: accessToken,
					refresh_token: refresh_token ?? null,
					id_token: params?.id_token ?? null,
					token_response: { params, profile }
				}
				console.log(JSON.parse(JSON.stringify(data)))
				// console.log(JSON.parse(JSON.stringify(data.token_response)))
				// const payload: SocialLoginUser = {
				// 	provider: "Google",
				// 	provider_user_id,
				// 	email,
				// 	full_name,
				// 	access_token: access_token,
				// 	refresh_token: refresh_token ?? null,
				// 	id_token: params?.id_token ?? null,
				// 	expires_at,
				// 	token_response: {
				// 		params,
				// 		profile,
				// 	},
				// };

				// Persist to DB
				// const { personId, role } = await upsertSocialLogin(payload);

				// Log the user into your app by setting your app session
				// req.session.person_id = personId;
				// req.session.role = role;
				let user = {
					email,
					fullName: fullName,
					idToken: params?.id_token ?? null,
					accessToken,
				};
				console.log("[GoogleStrategy] success user:", user);
				return done(null, user);
			} catch (err) {
				return done(err);
			}
		}

	));

	app.get("/auth/google",
		passport.authenticate("google", {
			scope: ["profile", "email", "openid"], //'openid' ensures OIDC id_token
			accessType: "offline", // request refresh_token
			prompt: "consent", // Ensures refresh_token is returned
			session: false, // Passport session not needed
			state: true // CSRF protection (Passport can manage state)
		})
	);

	app.get("/auth/google/callback",
		passport.authenticate("google", {
			session: false,
			failureRedirect: "/login"
		}),
		async (req, res) => {
			try {
				console.log("[Callback handler] SUCCESS, req.user:", req.user);

				const query = `
				mutation($userEmail: String!) {
					authenticateGoogle(input: { userEmail: $userEmail }) {
						jwtToken {
							role
							personId
						}
					}
				}
			`;

				console.log("email", req.user?.email);

				const endpoint = process.env.GRAPHQL_ENDPOINT || "http://localhost:4000/graphql";
				const payload = { query, variables: { userEmail: req.user?.email } };

				console.log("GraphQL endpoint:", endpoint);
				console.log("Request body:", JSON.stringify(payload));

				const pgResp = await fetch(endpoint, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						cookie: req.headers.cookie || "", // Pass cookies so LoginPlugin can attach new one
					},
					body: JSON.stringify(payload),
				});

				console.log("pgResp status:", pgResp.status, pgResp.statusText);

				const text = await pgResp.text();
				console.log("pgResp raw:", text);

				let data;
				try {
					data = JSON.parse(text);
				} catch (err) {
					console.error("JSON parse error", err);
					throw err;
				}

				// const data = await pgResp.json();
				const jwtToken = data.data?.authenticateGoogle?.jwtToken;

				if (!jwtToken) {
					return res.redirect("/login?error=notfound");
				}

				console.log("[Google callback] JWT claims:", jwtToken);

				// if (!email) return res.redirect("/login");
				// const email = req.user?.email;
				// res.cookie("google_email", email, {
				// 	httpOnly: true,
				// 	secure: true,
				// 	sameSite: "lax",
				// 	maxAge: 5 * 60 * 1000, // 5 minutes
				// });
				// req.session.person_id = /* your person id */;
				// req.session.role = /* your role */;
				// console.log('frontend-origin', process.env.FRONTEND_ORIGIN)
				// const FRONTEND = process.env.FRONTEND_ORIGIN || "http://localhost:3333";
				// res.redirect(`${FRONTEND}/#/mealplans`);

				const origin = getFrontendOrigin(req);
				console.log('origin', origin)
				const path = "/#/mealplans";
				console.log(`${origin}${path}`);
				res.redirect(`${origin}${path}`);

			} catch (err) {
				console.error("Error in Google callback:", err.stack);
				return res.redirect("/login?error=server");
			}
		}
	);

}
// const setUpGoogleAuth = passport.use(new GoogleStrategy(
// 	{
// 		clientID: process.env.GOOGLE_CLIENT_ID!,
// 		clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
// 		callbackURL: "auth/google/callback",
// 		passReqToCallback: true //Enabled to receive id_token
// 	}, 
// 	async (req, access_token, refresh_token, profile, done) => {
// 	}

// ));

// app.get("/auth/google/callback", (req, res, next) => {
// 	passport.authenticate("google", { session: false }, async (err, user, info) => {
// 		if (err || !info) return res.redirect("/login");

// 		// Example: set what PostGraphile expects in pgSettings
// 		req.session.person_id = /* your person id */;
// 		req.session.role = /* your role */;

// 		const FRONTEND = process.env.FRONTEND_ORIGIN || "http://localhost:3333";
// 		return res.redirect(`${FRONTEND}/#/mealplans`); // HashRouter target
// 	})(req, res, next);
// });

// const peopleApiResponse = await fetch("https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses", {
// 	headers: {
// 		Authorization: `Bearer ${accessToken}`
// 	}
// });
// const data = await peopleApiResponse.json();

module.exports = { setUpGoogleAuth };