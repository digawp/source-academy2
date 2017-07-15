defmodule Backoffice.Plug.AssignCurrentUser do
  def init(opts), do: opts

  def call(conn, _opts) do
    current_user = Guardian.Plug.current_resource(conn)
    if current_user != nil do
      Plug.Conn.assign(conn, :current_user, current_user)
    else
      conn
    end
  end
end
