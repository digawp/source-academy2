defmodule SourceAcademyWeb.UserController do
  use SourceAcademyWeb, :controller

  alias SourceAcademy.Repo
  alias SourceAcademy.User

  def show(conn, %{"id" => id}) do
    user = Repo.get!(User, id)
    render(conn, "show.html", user: user)
  end

  def edit(conn, %{"id" => id}) do
    user = Repo.get!(User, id)
    changeset = User.changeset(user)
    render(conn, "edit.html", user: user, changeset: changeset)
  end
end
