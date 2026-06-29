import posthog from "./posthog";

// ====================
// USER EVENTS
// ====================

export const trackLogin = (user) => {
  posthog.capture("User Logged In", {
    name: user.name,
    email: user.email,
    role: user.role,
  });
};

export const trackLogout = (user) => {
  posthog.capture("User Logged Out", {
    name: user.name,
    email: user.email,
    role: user.role,
  });
};

// ====================
// INVENTORY EVENTS
// ====================

export const trackProductAdded = (product) => {
  posthog.capture("Product Added", {
    productId: product.productId,
    name: product.name,
    category: product.category,
    quantity: product.quantity,
    shelf: product.shelf,
  });
};

export const trackProductUpdated = (product) => {
  posthog.capture("Product Updated", {
    productId: product.productId,
    name: product.name,
    quantity: product.quantity,
    shelf: product.shelf,
  });
};

export const trackProductDeleted = (product) => {
  posthog.capture("Product Deleted", {
    productId: product.productId,
    name: product.name,
    shelf: product.shelf,
  });
};

// ====================
// QR EVENTS
// ====================

export const trackQRGenerated = (product) => {
  posthog.capture("QR Generated", {
    productId: product.productId,
    name: product.name,
  });
};

export const trackQRScanned = (product) => {
  posthog.capture("QR Scanned", {
    productId: product.productId,
    name: product.name,
  });
};

// ====================
// SEARCH EVENTS
// ====================

export const trackSearch = (keyword) => {
  posthog.capture("Product Search", {
    keyword,
  });
};

// ====================
// PAGE EVENTS
// ====================

export const trackWarehouseViewed = () => {
  posthog.capture("Warehouse Map Viewed");
};

export const trackAnalyticsViewed = () => {
  posthog.capture("Analytics Viewed");
};

export const trackSettingsViewed = () => {
  posthog.capture("Settings Viewed");
};

// ====================
// AI EVENTS
// ====================

export const trackChatbotUsed = () => {
  posthog.capture("AI Chatbot Used");
};

export const trackReportGenerated = () => {
  posthog.capture("Report Generated");
};