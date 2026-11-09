ALTER TABLE `settings` ADD COLUMN `logo_mode` text DEFAULT 'both' NOT NULL;
--> statement-breakpoint
ALTER TABLE `settings` ADD COLUMN `logo_blob_key` text DEFAULT '' NOT NULL;
