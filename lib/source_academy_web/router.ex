defmodule SourceAcademy.Web.Router do
  use SourceAcademy.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]

    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :browser_auth do
    plug Guardian.Plug.VerifySession
    plug Guardian.Plug.LoadResource
    plug SourceAcademy.Plug.AssignCurrentUser
  end

  pipeline :ensure_staff do
    plug Guardian.Plug.EnsurePermissions,
      handler: SourceAcademy.Web.AuthController,
      admin: [:access]
    plug SourceAcademy.Plug.AssignUseSidebarFlag
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :api_auth do
    plug Guardian.Plug.VerifyHeader
    plug Guardian.Plug.LoadResource
  end

  scope "/api/v1", SourceAcademy.Api, as: :api_v1 do
    pipe_through [:api, :api_auth]

    resources "/announcements", AnnouncementController, only: [:index]
  end

  scope "/" do
    pipe_through [:browser, :browser_auth]
  end

  scope "/admin", SourceAcademy.Web do
    pipe_through [:browser, :browser_auth, :ensure_staff]

    get "/", PageController, :index

    resources "/users", UserController, except: [:new]
    resources "/students", StudentController do
      resources "/xp_history", GiveXPController, only: [:create, :delete]
    end

    resources "/announcements", AnnouncementController, except: [:show]
    get "/announcements/:announcement_id/toggle_pin", AnnouncementController, :toggle_pin
    get "/announcements/:announcement_id/toggle_publish", AnnouncementController, :toggle_publish

    resources "/discussion_groups", DiscussionGroupController, only: [:index, :create]
    resources "/achievements", AchievementController, except: [:show]
    resources "/student_achievements", StudentAchievementController, only: [:new, :create]

    resources "/materials", MaterialController, only: [:index, :new, :create, :delete]
    get "/materials/:id/delete", MaterialController, :delete_entry
    post "/materials_category", MaterialController, :create_category
    delete "/materials_category", MaterialController, :delete_category

    get "/students/:discussion_group_id/delete", DiscussionGroupController, :delete_entry
    get "/students/:student_id/toggle_phantom", StudentController, :toggle_phantom
  end

  scope "/auth", SourceAcademy.Web do
    pipe_through [:browser, :browser_auth]

    get "/login", AuthController, :login
    get "/logout", AuthController, :logout
    get "/signup", AuthController, :signup
    get "/:provider", AuthController, :request
    get "/:provider/callback", AuthController, :callback
    post "/identity/callback", AuthController, :callback
  end
end
