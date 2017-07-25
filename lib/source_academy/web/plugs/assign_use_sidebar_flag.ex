defmodule SourceAcademy.Plug.AssignUseSidebarFlag do
  @moduledoc false
  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _opts) do
    assign(conn, :use_sidebar, true)
  end
end
