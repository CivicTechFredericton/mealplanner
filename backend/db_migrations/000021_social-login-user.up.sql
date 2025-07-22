begin;

-- Login mode options
CREATE TYPE app.login_mode AS ENUM ('Google', 'Facebook');

-- User status options
CREATE TYPE app.user_status AS ENUM ('pending', 'active',  'inactive');

-- Role type is reused from the existing app.person table
-- Already created: app.role_type AS ENUM ('app_user', 'app_meal_designer', 'app_admin');

CREATE TABLE app.social_login_user (
    id bigserial NOT NULL,
    full_name text NOT NULL,
    email text NOT NULL,
    status app.user_status DEFAULT 'pending'::app.user_status NOT NULL,
    role app.role_type DEFAULT 'app_user'::app.role_type NOT NULL,
    login_mode app.login_mode NOT NULL,
    created_at timestamp DEFAULT now() NOT NULL,
    updated_at timestamp DEFAULT now() NOT NULL,
    CONSTRAINT social_login_user_email_key UNIQUE (email),
    CONSTRAINT social_login_user_pkey PRIMARY KEY (id)
);

create trigger tg_social_login_user_set_updated_at before update
on app.social_login_user 
for each row execute function app.set_updated_at();

create trigger tg_social_login_user_set_created_at before insert
on app.social_login_user for each row execute function app.set_created_at();

COMMIT;