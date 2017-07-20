defmodule Api.Router do
  use Api, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api/v1", Api do
    pipe_through :api

    resources "/status", StatusController, only: [:index]
    resources "/announcements", AnnouncementController, only: [:index]
  end
end
