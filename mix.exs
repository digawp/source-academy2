defmodule SourceAcademy.Mixfile do
  use Mix.Project

  def project do
    [
      app: :source_academy,
      version: "2.0.0",
      elixir: "~> 1.4",
      elixirc_paths: elixirc_paths(Mix.env),
      compilers: [:phoenix, :gettext] ++ Mix.compilers,
      start_permanent: Mix.env == :prod,
      deps: deps(),
      aliases: aliases()
    ]
  end

  def application do
    [
      mod: {SourceAcademy.Application, []},
      extra_applications: [:logger, :runtime_tools]
    ]
  end

  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_),     do: ["lib"]

  # Type "mix help deps" for more examples and options.
  defp deps do
    [
      {:arc_ecto, "~> 0.7.0"},
      {:comeonin, "~> 3.1"},
      {:cors_plug, "~> 1.2"},
      {:cowboy, "~> 1.0"},
      {:credo, "~> 0.8"},
      {:ecto, "~> 2.1"},
      {:ecto_enum, "~> 1.0"},
      {:gettext, "~> 0.11"},
      {:guardian_db, "~> 0.8.0"},
      {:guardian, "~> 0.14"},
      {:phoenix_ecto, "~> 3.2"},
      {:phoenix_html, "~> 2.10"},
      {:phoenix_live_reload, "~> 1.0", only: :dev},
      {:phoenix_pubsub, "~> 1.0"},
      {:phoenix, "~> 1.3.0-rc", override: true},
      {:postgrex, ">= 0.0.0"},
      {:timex, "~> 3.0"},
      {:timex_ecto, "~> 3.0"},
      {:ueberauth_identity, "~> 0.2"},
      {:ueberauth, "~> 0.4"}
    ]
  end

  defp aliases do
    [
      "lint": ["credo --strict -a"],
      "ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      "test": ["ecto.create --quiet", "ecto.migrate", "test"]
    ]
  end
end
