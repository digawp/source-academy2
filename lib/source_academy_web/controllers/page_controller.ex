defmodule SourceAcademyWeb.PageController do
  use SourceAcademyWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
