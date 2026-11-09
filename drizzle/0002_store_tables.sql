DROP TABLE entries;
--> statement-breakpoint
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT NOT NULL DEFAULT '',
  theme TEXT NOT NULL DEFAULT '',
  line TEXT NOT NULL DEFAULT '',
  material TEXT NOT NULL DEFAULT '',
  model_size TEXT NOT NULL DEFAULT '',
  metallic_finish TEXT NOT NULL DEFAULT '',
  colors TEXT NOT NULL DEFAULT '[]',
  price INTEGER NOT NULL DEFAULT 0,
  price_label TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'available',
  description TEXT NOT NULL DEFAULT '',
  story TEXT NOT NULL DEFAULT '',
  tone TEXT NOT NULL DEFAULT '#e9ede8',
  glyph TEXT NOT NULL DEFAULT '◆',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL
);
--> statement-breakpoint
CREATE TABLE settings (
  id INTEGER PRIMARY KEY,
  store_name TEXT NOT NULL DEFAULT 'HERMÈS PARIS',
  phone TEXT NOT NULL DEFAULT '800-441-4488',
  hero_title TEXT NOT NULL DEFAULT 'Threading ideas',
  hero_text TEXT NOT NULL DEFAULT 'The blanket provides a canvas that can take any direction, from reimagining motifs to asserting a bold artistic signature. Its playful composition allows style to express itself on a larger scale.',
  ship_to TEXT NOT NULL DEFAULT 'UNITED STATES',
  delivery_text TEXT NOT NULL DEFAULT 'Free standard delivery on all orders. Complimentary ground shipping 1-10 business days up to $2,000; express required over $2,000; white-glove delivery over $25,000. Delivered in the orange box tied with Bolduc ribbon.',
  returns_text TEXT NOT NULL DEFAULT 'Free returns within 30 days of delivery.',
  payment_methods TEXT NOT NULL DEFAULT 'Visa, MasterCard, Amex, Discover, Diners, JCB, China Union Pay, PayPal, Apple Pay',
  bg_color TEXT NOT NULL DEFAULT '#f7f2ec',
  service_hours TEXT NOT NULL DEFAULT 'Monday to Saturday 10 AM - 9 PM'
);
--> statement-breakpoint
CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  items TEXT NOT NULL DEFAULT '[]',
  total INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Placed',
  address TEXT NOT NULL DEFAULT '',
  created_at INTEGER NOT NULL
);
--> statement-breakpoint
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL DEFAULT '',
  created_at INTEGER NOT NULL
);
--> statement-breakpoint
CREATE TABLE newsletter (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  created_at INTEGER NOT NULL
);
--> statement-breakpoint
CREATE TABLE notify_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL DEFAULT 0,
  product_name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  created_at INTEGER NOT NULL
);
