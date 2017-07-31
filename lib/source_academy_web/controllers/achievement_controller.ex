defmodule SourceAcademyWeb.AchievementController do
  use SourceAcademyWeb, :controller
  import Ecto.Query
  import Ecto.Changeset

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
      {:ok, _} ->
        conn
        |> put_flash(:info, "Achievement created successfully.")
        |> redirect(to: achievement_path(conn, :index))
      {:error, changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def edit(conn, %{"id" => id}) do
    achievement = Achievement.find_by_id(id)
    changeset = Achievement.changeset(achievement, %{})
    render(conn, "edit.html", achievement: achievement, changeset: changeset)
  end

  def update(conn, %{"id" => id, "achievement" => achievement_params}) do
    achievement = Achievement.find_by_id(id)
    changeset = Achievement.changeset(achievement, achievement_params)

    case Repo.update(changeset) do
      {:ok, _} ->
        conn
        |> put_flash(:info, "Achievement updated successfully.")
        |> redirect(to: achievement_path(conn, :index))
      {:error, changeset} ->
        render(conn, "edit.html", achievement: achievement, changeset: changeset)
    end
  end

  def move_up(conn, %{"id" => id}) do
    achievement = Achievement.find_by_id(id)
    result = Repo.transaction fn ->
      previous_display_order = achievement.display_order - 1
      previous_achievement =
        Repo.one(from u in Achievement,
          where: u.display_order == ^previous_display_order)
      if previous_achievement != nil do
        Repo.update!(change(achievement, %{
          display_order: achievement.display_order - 1
        }))
        Repo.update!(change(previous_achievement, %{
          display_order: previous_achievement.display_order + 1
        }))
      end
    end
    case result do
      {:ok, _} -> redirect(conn, to: achievement_path(conn, :index))
      {:error, _} ->
         conn
         |> put_flash(:error, "Error when updating achievement")
         |> redirect(to: achievement_path(conn, :index))
    end
  end

  def move_down(conn, %{"id" => id}) do
    achievement = Achievement.find_by_id(id)
    result = Repo.transaction fn ->
      next_display_order = achievement.display_order + 1
      next_achievement =
        Repo.one(
          from u in Achievement,
          where: u.display_order == ^next_display_order)
      if next_achievement != nil do
        Repo.update!(change(achievement, %{
          display_order: achievement.display_order + 1
        }))
        Repo.update!(change(next_achievement, %{
          display_order: next_achievement.display_order - 1
        }))
      end
    end
    case result do
      {:ok, _} -> redirect(conn, to: achievement_path(conn, :index))
      {:error, _} ->
         conn
         |> put_flash(:error, "Error when updating achievement")
         |> redirect(to: achievement_path(conn, :index))
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
