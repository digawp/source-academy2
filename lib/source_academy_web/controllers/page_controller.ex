defmodule SourceAcademy.Web.PageController do
  use SourceAcademy.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
