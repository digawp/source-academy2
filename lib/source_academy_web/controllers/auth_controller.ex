defmodule SourceAcademyWeb.AuthController do
  @moduledoc false
  use SourceAcademyWeb, :controller

  alias SourceAcademyWeb.AuthView
  alias SourceAcademyWeb.LayoutView
  alias SourceAcademy.Repo
  alias SourceAcademy.Auth
  alias SourceAcademy.Authorization.Identity
  alias SourceAcademy.User
  alias Guardian.Plug, as: GPlug
  alias Guardian.Permissions

  plug Ueberauth

  def login(conn, _params) do
    redirect_if_logged_in conn, fn conn ->
      changeset = Identity.build_login(%{})
      action = auth_path(conn, :callback, "identity", type: "login")
      render(conn, "login.html", changeset: changeset, action: action)
    end
  end

  def signup(conn, _params) do
    redirect_if_logged_in conn, fn conn ->
      changeset = User.build_registration(%{})
      action = auth_path(conn, :callback, "identity", type: "register")
      render(conn, "signup.html", changeset: changeset, action: action)
    end
  end

  def callback(conn, %{"type" => "register", "user" => params}) do
    action = auth_path(conn, :callback, "identity", type: "register")

    case Identity.register(params) do
      {:ok, user} ->
        conn
        |> guardian_sign_in(user)
        |> put_flash(:info, "Signed in as #{user.first_name}")
        |> redirect(to: page_path(conn, :index))
      {:error, changeset} ->
        render(conn, "signup.html", action: action, changeset: changeset)
    end
  end

  def callback(conn, %{"type" => "login", "authorization" => params}) do
    changeset = Identity.build_login(params)
    action = auth_path(conn, :callback, "identity", type: "login")

    case Identity.sign_in(params) do
      {:ok, user} ->
        conn
        |> guardian_sign_in(user)
        |> put_flash(:info, "Signed in as #{user.first_name}")
        |> redirect(to: page_path(conn, :index))
      {:error, reason} ->
        conn
        |> put_flash(:error, "Could not authenticate. Error: #{reason}")
        |> render("login.html", action: action, changeset: changeset)
    end
  end

  def callback(%{assigns: %{ueberauth_failure: fails}} = conn, %{"type" => "login"}) do
    fails = conn.assigns[:ueberauth_failure]
    params = fails.extra.raw_info["authorization"]
    changeset = Identity.build_login(params)
    action = auth_path(conn, :callback, "identity", type: "login")

    conn
    |> put_flash(:error, hd(fails.errors).message)
    |> render("login.html", changeset: changeset, action: action)
  end

  def logout(conn, _params) do
    current_user = conn.assigns[:current_user]

    if current_user do
      conn
      |> GPlug.sign_out
      |> put_flash(:info, "Signed out")
      |> redirect(to: auth_path(conn, :login))
    else
      conn
      |> put_flash(:info, "Not logged in")
      |> redirect(to: auth_path(conn, :login))
    end
  end

  def unauthorized(conn, _params) do
    conn
    |> put_view(AuthView)
    |> render("unauthorized.html",
        layout: {LayoutView, "app.html"},
        current_user: conn.assigns[:current_user])
  end

  defp guardian_sign_in(conn, user) do
    if user.role == "staff" || user.role == "admin" do
      GPlug.sign_in(conn, user, :access, perms: %{
        default: Permissions.max,
        admin: [:access]
      })
    else
      GPlug.sign_in(conn, user, :access, perms: %{default: Permissions.max})
    end
  end

  defp redirect_if_logged_in(conn, otherwise) do
    current_user = conn.assigns[:current_user]
    if current_user do
      redirect(conn, to: page_path(conn, :index))
    else
      otherwise.(conn)
    end
  end
end
