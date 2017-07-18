defmodule Backoffice.Web.Router do
  use Backoffice.Web, :router

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
    plug Backoffice.Plug.AssignCurrentUser
  end

  pipeline :ensure_staff do
    plug Guardian.Plug.EnsurePermissions, handler: Backoffice.Web.AuthController, backoffice: [:access]
    plug Backoffice.Plug.AssignUseSidebarFlag
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Backoffice.Web do
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

  scope "/auth", Backoffice.Web do
    pipe_through [:browser, :browser_auth]

    get "/login", AuthController, :login
    get "/logout", AuthController, :logout
    get "/signup", AuthController, :signup
    get "/:provider", AuthController, :request
    get "/:provider/callback", AuthController, :callback
    post "/identity/callback", AuthController, :identity_callback
  end
  # Other scopes may use custom stacks.
  # scope "/api", Backoffice.Web do
  #   pipe_through :api
  # end
end
