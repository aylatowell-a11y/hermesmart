ALTER TABLE orders ADD COLUMN payment_method TEXT NOT NULL DEFAULT '';
--> statement-breakpoint
ALTER TABLE orders ADD COLUMN delivery_option TEXT NOT NULL DEFAULT '';
--> statement-breakpoint
ALTER TABLE orders ADD COLUMN viewed_by_admin INTEGER NOT NULL DEFAULT 0;
--> statement-breakpoint
ALTER TABLE users ADD COLUMN disabled INTEGER NOT NULL DEFAULT 0;
--> statement-breakpoint
ALTER TABLE users ADD COLUMN viewed_by_admin INTEGER NOT NULL DEFAULT 0;
--> statement-breakpoint
CREATE TABLE visits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  visitor_key TEXT NOT NULL,
  day TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX visits_visitor_day ON visits (visitor_key, day);
--> statement-breakpoint
CREATE TABLE product_views (
  product_id INTEGER PRIMARY KEY,
  views INTEGER NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE wishlist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  product_id INTEGER NOT NULL DEFAULT 0,
  product_name TEXT NOT NULL DEFAULT '',
  created_at INTEGER NOT NULL
);
--> statement-breakpoint
CREATE TABLE return_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL DEFAULT 0,
  email TEXT NOT NULL DEFAULT '',
  reason TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'Requested',
  created_at INTEGER NOT NULL
);
