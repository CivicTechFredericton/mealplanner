/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHQL_TOKEN?: string
  readonly VITE_GRAPHQL_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
