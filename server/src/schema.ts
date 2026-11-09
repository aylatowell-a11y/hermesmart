import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  category: text("category").notNull(),
  subcategory: text("subcategory").notNull().default(""),
  theme: text("theme").notNull().default(""),
  line: text("line").notNull().default(""),
  material: text("material").notNull().default(""),
  modelSize: text("model_size").notNull().default(""),
  metallicFinish: text("metallic_finish").notNull().default(""),
  colors: text("colors").notNull().default("[]"),
  price: integer("price").notNull().default(0),
  priceLabel: text("price_label").notNull().default(""),
  status: text("status", { enum: ["available", "available_soon", "out_of_stock", "in_store_only"] }).notNull().default("available"),
  description: text("description").notNull().default(""),
  story: text("story").notNull().default(""),
  tone: text("tone").notNull().default("#e9ede8"),
  glyph: text("glyph").notNull().default("◆"),
  refCode: text("ref_code").notNull().default(""),
  galleryViews: text("gallery_views").notNull().default(""),
  applePay: integer("apple_pay").notNull().default(1),
  sizeOptions: text("size_options").notNull().default(""),
  accordions: text("accordions").notNull().default(""),
  shippingDelay: text("shipping_delay").notNull().default(""),
  detailLines: text("detail_lines").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
});

export const settings = sqliteTable("settings", {
  id: integer("id").primaryKey(),
  storeName: text("store_name").notNull().default("HERMÈS PARIS"),
  phone: text("phone").notNull().default("800-441-4488"),
  heroTitle: text("hero_title").notNull().default("Threading ideas"),
  heroText: text("hero_text").notNull().default(""),
  shipTo: text("ship_to").notNull().default("UNITED STATES"),
  deliveryText: text("delivery_text").notNull().default(""),
  returnsText: text("returns_text").notNull().default(""),
  paymentMethods: text("payment_methods").notNull().default(""),
  bgColor: text("bg_color").notNull().default("#f7f2ec"),
  serviceHours: text("service_hours").notNull().default("Monday to Saturday 10 AM - 9 PM"),
  logoMode: text("logo_mode").notNull().default("both"),
  logoBlobKey: text("logo_blob_key").notNull().default(""),
});

export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  customerName: text("customer_name").notNull().default(""),
  email: text("email").notNull().default(""),
  items: text("items").notNull().default("[]"),
  total: integer("total").notNull().default(0),
  status: text("status").notNull().default("Placed"),
  address: text("address").notNull().default(""),
  paymentMethod: text("payment_method").notNull().default(""),
  deliveryOption: text("delivery_option").notNull().default(""),
  viewedByAdmin: integer("viewed_by_admin").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
});

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().default(""),
  email: text("email").notNull(),
  password: text("password").notNull().default(""),
  disabled: integer("disabled").notNull().default(0),
  viewedByAdmin: integer("viewed_by_admin").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
});

export const visits = sqliteTable("visits", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  visitorKey: text("visitor_key").notNull(),
  day: text("day").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
});
export const productViews = sqliteTable("product_views", {
  productId: integer("product_id").primaryKey(),
  views: integer("views").notNull().default(0),
});
export const wishlist = sqliteTable("wishlist", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull(),
  productId: integer("product_id").notNull().default(0),
  productName: text("product_name").notNull().default(""),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
});
export const returnRequests = sqliteTable("return_requests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  orderId: integer("order_id").notNull().default(0),
  email: text("email").notNull().default(""),
  reason: text("reason").notNull().default(""),
  status: text("status").notNull().default("Requested"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
});

export const newsletter = sqliteTable("newsletter", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
});

export const notifyRequests = sqliteTable("notify_requests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  productId: integer("product_id").notNull().default(0),
  productName: text("product_name").notNull().default(""),
  email: text("email").notNull().default(""),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
});
