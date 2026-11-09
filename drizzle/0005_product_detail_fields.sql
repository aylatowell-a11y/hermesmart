ALTER TABLE `products` ADD COLUMN `ref_code` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `products` ADD COLUMN `gallery_views` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `products` ADD COLUMN `apple_pay` integer DEFAULT 1 NOT NULL;
--> statement-breakpoint
ALTER TABLE `products` ADD COLUMN `size_options` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `products` ADD COLUMN `accordions` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `products` ADD COLUMN `shipping_delay` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `products` ADD COLUMN `detail_lines` text DEFAULT '' NOT NULL;
