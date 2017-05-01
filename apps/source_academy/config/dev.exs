use Mix.Config

# Configure your database
config :source_academy, SourceAcademy.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "source_academy_dev",
  hostname: "localhost",
  pool_size: 10
