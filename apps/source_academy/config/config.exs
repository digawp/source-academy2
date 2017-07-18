use Mix.Config

config :source_academy, ecto_repos: [SourceAcademy.Repo]

config :ueberauth, Ueberauth,
  providers: [
    identity: {Ueberauth.Strategy.Identity, [callback_methods: ["POST"]]}
  ]

config :guardian, Guardian,
  issuer: "SourceAcademy",
  ttl: {30, :days},
  verify_issuer: true,
  serializer: SourceAcademy.GuardianSerializer,
  secret_key: "zw9PlP228KGFNba+bTaB1jwg3PKJOyPH5wvyZfyd5u6Qcb704HKDJpteip1hv0mI",
  hooks: GuardianDb,
  permissions: %{
    default: [
      :read_profile,
      :write_profile,
      :read_token,
      :revoke_token,
    ],
    backoffice: [
      :access
    ]
  }

config :guardian_db, GuardianDb,
  repo: SourceAcademy.Repo,
  sweep_interval: 60 # 60 minutes

config :arc,
  storage: Arc.Storage.Local

import_config "#{Mix.env}.exs"
