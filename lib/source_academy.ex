defmodule SourceAcademy do
  @moduledoc false
  def model do
    quote do
      use Ecto.Schema
      use Timex.Ecto.Timestamps

      import Ecto.Changeset
      import Ecto.Query, only: [from: 2]
    end
  end

  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end
