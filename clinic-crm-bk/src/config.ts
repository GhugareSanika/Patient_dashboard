export const config = {
  port: process.env.PORT || 3001,
  db: {
    uri: process.env.DB_URI || "mongodb://localhost:27017/weightloss-dashboard",
  },
};
