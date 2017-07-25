defmodule SourceAcademyWeb.PageController do
  use SourceAcademyWeb, :controller
  alias SourceAcademyWeb.LayoutView

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
