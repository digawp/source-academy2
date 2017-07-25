defmodule SourceAcademy.Application do
  @moduledoc false
  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    Supervisor.start_link([
      worker(SourceAcademy.Repo, []),
    ], strategy: :one_for_one, name: SourceAcademy.Supervisor)
  end
end
