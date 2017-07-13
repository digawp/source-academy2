defmodule Backoffice.Web.AuthController do
  @moduledoc """
  Handles the Überauth integration.
  This controller implements the request and callback phases for all providers.
  The actual creation and lookup of users/authorizations is handled by UserFromAuth
  """
  use Backoffice.Web, :controller
  use SourceAcademy.Phoenix.Controller

  alias SourceAcademy.Repo
  alias SourceAcademy.Auth
  alias SourceAcademy.User

  plug Ueberauth

  def login(conn, _params, current_user, _claims) do
    if current_user do
      redirect(conn, to: user_path(conn, :show, current_user.id))
    else
      render(conn, "login.html", current_user: current_user,
        current_auths: User.authorizations(current_user))
    end
  end

  def callback(%{assigns: %{ueberauth_failure: fails}} = conn,
    _params, current_user, _claims) do
    conn
    |> put_flash(:error, hd(fails.errors).message)
    |> render("login.html", current_user: current_user,
         current_auths: User.authorizations(current_user))
  end

  def identity_callback(conn, _params, current_user, _claims) do
    case Auth.Identity.authenticate(conn) do
      {:ok, user} ->
        conn
        |> Guardian.Plug.sign_in(user, :access, perms: %{default: Guardian.Permissions.max})
        |> put_flash(:info, "Signed in as #{user.first_name}")
        |> redirect(to: user_path(conn, :show, user.id))
      {:error, reason} ->
        conn
        |> put_flash(:error, "Could not authenticate. Error: #{reason}")
        |> render("login.html", current_user: current_user,
            current_auths: Auth.get_authorizations(current_user))
    end
  end

  def logout(conn, _params, current_user, _claims) do
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
end
