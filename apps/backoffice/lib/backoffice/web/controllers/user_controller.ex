defmodule Backoffice.Web.UserController do
  use Backoffice.Web, :controller

  alias SourceAcademy.Repo
  alias SourceAcademy.User

  plug Guardian.Plug.EnsureAuthenticated,
    [handler: __MODULE__, typ: "access"] when action in [:edit, :index]

  def show(conn, %{"id" => id}) do
    user = Repo.get!(User, id)
    render(conn, "show.html", user: user)
  end

  def edit(conn, %{"id" => id}) do
    user = Repo.get!(User, id)
    changeset = User.changeset(user)
    render(conn, "edit.html", user: user, changeset: changeset)
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
