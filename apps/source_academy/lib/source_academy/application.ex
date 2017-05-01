defmodule SourceAcademy.Application do
  @moduledoc """
  The SourceAcademy Application Service.

  The source_academy system business domain lives in this application.

  Exposes API to clients such as the `SourceAcademy.Web` application
  for use in channels, controllers, and elsewhere.
  """
  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    Supervisor.start_link([
      worker(SourceAcademy.Repo, []),
    ], strategy: :one_for_one, name: SourceAcademy.Supervisor)
  end
end
