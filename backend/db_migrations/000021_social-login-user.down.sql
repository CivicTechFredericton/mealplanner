begin;
	
	-- DROP TABLE: app.social_login_user
	DROP TABLE app.social_login_user;

	-- DROP ENUM: app.login_mode ('Google', 'Facebook'), app.user_status  ('pending', 'active',  'inactive')
	DROP TYPE app.login_mode;
	DROP TYPE app.user_status;

COMMIT;