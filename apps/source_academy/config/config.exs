use Mix.Config

config :source_academy, ecto_repos: [SourceAcademy.Repo]

import_config "#{Mix.env}.exs"
