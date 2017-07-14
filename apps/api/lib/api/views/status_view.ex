defmodule Api.StatusView do
  use Api, :view

  def render("status.json", _params) do
    %{ status: "running" }
  end
end
