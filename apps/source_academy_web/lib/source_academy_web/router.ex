defmodule SourceAcademy.Web.Router do
  use SourceAcademy.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", SourceAcademy.Web do
    pipe_through :api
  end
end
