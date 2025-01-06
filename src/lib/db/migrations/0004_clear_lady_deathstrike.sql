ALTER TABLE "rental_properties" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "rental_properties" ADD COLUMN "country" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "rental_properties" ADD COLUMN "city" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "rental_properties" ADD COLUMN "isFeatured" boolean DEFAULT false;