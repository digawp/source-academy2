defmodule Backoffice.Plug.AssignUseSidebarFlag do
  def init(opts), do: opts

  def call(conn, _opts) do
    Plug.Conn.assign(conn, :use_sidebar, true)
  end
end
