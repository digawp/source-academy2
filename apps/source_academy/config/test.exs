use Mix.Config

# Configure your database
config :source_academy, SourceAcademy.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "source_academy_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
