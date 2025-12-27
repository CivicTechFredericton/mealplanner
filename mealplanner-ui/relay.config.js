module.exports = {
  src: "./src",
  schema: "../backend/schema.graphql",
  schemaExtensions: ["./src"],
  eagerEsModules: true,
  exclude: [
    "**/node_modules/**",
    "**/__mocks__/**",
    "**/__generated__/**"
  ],
  language: "typescript"
}
