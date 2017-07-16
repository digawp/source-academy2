defmodule Backoffice.Web.Router do
  use Backoffice.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers

    plug Guardian.Plug.VerifySession
    plug Guardian.Plug.LoadResource
    plug Backoffice.Plug.AssignCurrentUser
  end

  pipeline :browser_auth do
    plug Guardian.Plug.EnsurePermissions, handler: Backoffice.Web.AuthController, backoffice: [:access]
    plug Backoffice.Plug.AssignUseSidebarFlag
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Backoffice.Web do
    pipe_through [:browser, :browser_auth]

    get "/", PageController, :index
    resources "/users", UserController, except: [:new]
    resources "/students", StudentController do
      resources "/xp_history", GiveXPController, only: [:create, :delete]
    end
    get "/students/:student_id/toggle_phantom", StudentController, :toggle_phantom
  end

  scope "/auth", Backoffice.Web do
    pipe_through [:browser]

    get "/login", AuthController, :login
    get "/logout", AuthController, :logout
    get "/signup", UserController, :new
    get "/:provider", AuthController, :request
    get "/:provider/callback", AuthController, :callback
    post "/identity/callback", AuthController, :identity_callback
  end
  # Other scopes may use custom stacks.
  # scope "/api", Backoffice.Web do
  #   pipe_through :api
  # end
end
