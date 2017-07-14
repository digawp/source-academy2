defmodule Api.StatusController do
  use Api, :controller

  def index(conn, _params) do
    render conn, "status.json"
  end
end
