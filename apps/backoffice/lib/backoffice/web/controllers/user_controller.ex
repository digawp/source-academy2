defmodule Backoffice.Web.UserController do

  use Backoffice.Web, :controller
  use Guardian.Phoenix.Controller
  alias SourceAcademy.Repo
  alias SourceAcademy.User

  plug Guardian.Plug.EnsureAuthenticated,
    [handler: __MODULE__, typ: "access"] when action in [:edit, :index]

  def index(conn, _params, current_user, _claims) do
    users = Repo.all(User)
    render(conn, "index.html", current_user: current_user, users: users)
  end

  def new(conn, _params, _current_user, _claims) do
    render(conn, "new.html")
  end

  def show(conn, _params, current_user, _claims) do
    render(conn, "show.html", current_user: current_user)
  end

  def unauthenticated(conn, _params) do
    conn
    |> put_flash(:error, "Authentication required")
    |> redirect(to: auth_path(conn, :login))
  end

  def edit(conn, %{"id" => id}, current_user, _claims) do
    user = Repo.get!(User, id)
    changeset = User.changeset(current_user)
    render(conn, "edit.html", user: current_user, changeset: changeset)
  end

  # def update(conn, %{"id" => id, "user" => user_params}, current_user, _claims) do
  #   user = Repo.get!(User, id)

  #   case Accounts.update_user(user, user_params) do
  #     {:ok, user} ->
  #       conn
  #       |> put_flash(:info, "User updated successfully.")
  #       |> redirect(to: user_path(conn, :show, user))
  #     {:error, %Ecto.Changeset{} = changeset} ->
  #       render(conn, "edit.html", user: user, changeset: changeset)
  #   end
  # end

  # def delete(conn, %{"id" => id}, current_user, _claims) do
  #   user = Accounts.get_user!(id)
  #   {:ok, _user} = Accounts.delete_user(user)

  #   conn
  #   |> put_flash(:info, "User deleted successfully.")
  #   |> redirect(to: user_path(conn, :index))
  # end
end
