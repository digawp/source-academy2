use Mix.Config

config :source_academy, SourceAcademy.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "source_academy_dev",
  hostname: "localhost",
  pool_size: 10

config :source_academy, SourceAcademyWeb.Endpoint,
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
  watchers: [
    node: [
      "scripts/start.js",
      cd: Path.expand("../priv/frontend", __DIR__)
    ]
  ],
  live_reload: [
    patterns: [
      ~r{priv/gettext/.*(po)$},
      ~r{lib/source_academy_web/views/.*(ex)$},
      ~r{lib/source_academy_web/templates/.*(eex)$}
    ]
  ]

  # Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development. Avoid configuring such
# in production as building large stacktraces may be expensive.
config :phoenix, :stacktrace_depth, 20
