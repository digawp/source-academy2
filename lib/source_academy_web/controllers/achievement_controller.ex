defmodule SourceAcademyWeb.AchievementController do
  use SourceAcademyWeb, :controller

  alias SourceAcademy.Repo
  alias SourceAcademy.Achievement

  def index(conn, _params) do
    achievements = Achievement.all()
    render(conn, "index.html", achievements: achievements)
  end

  def new(conn, _params) do
    changeset = Achievement.build(%{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"achievement" => achievement_params}) do
    case Achievement.create(achievement_params) do
      {:ok, achievement} ->
        conn
        |> put_flash(:info, "Achievement created successfully.")
        |> redirect(to: achievement_path(conn, :index))
      {:error, changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def edit(conn, %{"id" => id}) do
    achievement = Achievement.find_by_id(id)
    changeset = Achievement.build(Map.from_struct(achievement))
    render(conn, "edit.html", achievement: achievement, changeset: changeset)
  end

  def update(conn, %{"id" => id, "achievement" => achievement_params}) do
    achievement = Achievement.find_by_id(id)
    changeset = Achievement.changeset(achievement, achievement_params)

    case Repo.update(changeset) do
      {:ok, achievement} ->
        conn
        |> put_flash(:info, "Achievement updated successfully.")
        |> redirect(to: achievement_path(conn, :show, achievement))
      {:error, changeset} ->
        render(conn, "edit.html", achievement: achievement, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    achievement = Repo.get!(Achievement, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(achievement)

    conn
    |> put_flash(:info, "Achievement deleted successfully.")
    |> redirect(to: achievement_path(conn, :index))
  end
end
