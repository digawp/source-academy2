use Mix.Config

config :source_academy, SourceAcademyWeb.Endpoint,
  on_init: {SourceAcademyWeb.Endpoint, :load_from_system_env, []},
  url: [host: "example.com", port: 80],
  cache_static_manifest: "priv/static/cache_manifest.json"

  # Do not print debug messages in production
config :logger, level: :info

import_config "prod.secret.exs"
