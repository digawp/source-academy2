defmodule Backoffice.Web.AuthController do
  @moduledoc """
  Handles the Überauth integration.
  This controller implements the request and callback phases for all providers.
  The actual creation and lookup of users/authorizations is handled by UserFromAuth
  """
  use Backoffice.Web, :controller

  alias SourceAcademy.Repo
  alias SourceAcademy.Auth
  alias SourceAcademy.User

  plug Ueberauth

  def login(conn, _params) do
    current_user = conn.assigns[:current_user]
    if current_user do
      redirect(conn, to: user_path(conn, :show, current_user.id))
    else
      render(conn, "login.html", current_user: current_user,
        current_auths: User.authorizations(current_user))
    end
  end

  def callback(conn, _params) do
    fails = conn.assigns[:ueberauth_failure]
    current_user = conn.assigns[:current_user]

    conn
    |> put_flash(:error, hd(fails.errors).message)
    |> render("login.html",
         current_user: current_user,
         current_auths: User.authorizations(current_user))
  end

  def identity_callback(conn, _params) do
    current_user = conn.assigns[:current_user]

    case Auth.Identity.authenticate(conn) do
      {:ok, user} ->
        conn
        |> guardian_sign_in(user)
        |> put_flash(:info, "Signed in as #{user.first_name}")
        |> redirect(to: user_path(conn, :show, user.id))
      {:error, reason} ->
        conn
        |> put_flash(:error, "Could not authenticate. Error: #{reason}")
        |> render("login.html", current_user: current_user,
            current_auths: Auth.get_authorizations(current_user))
    end
  end

  def logout(conn, _params) do
    current_user = conn.assigns[:current_user]

    if current_user do
      conn
      |> Guardian.Plug.sign_out
      |> put_flash(:info, "Signed out")
      |> redirect(to: "/")
    else
      conn
      |> put_flash(:info, "Not logged in")
      |> redirect(to: "/")
    end
  end

  def unauthorized(conn, _params) do
    conn
    |> put_view(Backoffice.Web.AuthView)
    |> render("unauthorized.html", layout: {Backoffice.Web.LayoutView, "app.html"})
  end

  defp guardian_sign_in(conn, user) do
    if user.role == "staff" || user.role == "admin" do
      Guardian.Plug.sign_in(conn, user, :access, perms: %{
        default: Guardian.Permissions.max,
        backoffice: [:access]
      })
    else
      Guardian.Plug.sign_in(conn, user, :access, perms: %{default: Guardian.Permissions.max})
    end
  end
end
