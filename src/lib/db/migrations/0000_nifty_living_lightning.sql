CREATE TABLE IF NOT EXISTS "users" (
	"userId" serial PRIMARY KEY NOT NULL,
	"fullName" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"isAdmin" boolean DEFAULT false,
	"userCreated" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
