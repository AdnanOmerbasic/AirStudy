CREATE TABLE IF NOT EXISTS "availability" (
	"id" serial PRIMARY KEY NOT NULL,
	"startDate" date NOT NULL,
	"endDate" date NOT NULL,
	"rentalPropertyId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"startDate" date NOT NULL,
	"endDate" date NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"rentalPropertyId" integer NOT NULL,
	"userId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "images" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"rentalId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rental_properties" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"country" varchar(100) NOT NULL,
	"city" varchar(100) NOT NULL,
	"address" text NOT NULL,
	"price" integer NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"isFeatured" boolean DEFAULT false,
	"ownerId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fullName" text,
	"email" text NOT NULL,
	"password" text,
	"isAdmin" boolean DEFAULT false,
	"userCreated" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "availability" ADD CONSTRAINT "availability_rentalPropertyId_rental_properties_id_fk" FOREIGN KEY ("rentalPropertyId") REFERENCES "public"."rental_properties"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings" ADD CONSTRAINT "bookings_rentalPropertyId_rental_properties_id_fk" FOREIGN KEY ("rentalPropertyId") REFERENCES "public"."rental_properties"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings" ADD CONSTRAINT "bookings_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "images" ADD CONSTRAINT "images_rentalId_rental_properties_id_fk" FOREIGN KEY ("rentalId") REFERENCES "public"."rental_properties"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rental_properties" ADD CONSTRAINT "rental_properties_ownerId_users_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
