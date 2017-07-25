defmodule SourceAcademyWeb.StudentAchievementController do
  use SourceAcademyWeb, :controller

  alias SourceAcademy.Achievement
  alias SourceAcademy.Student
  alias SourceAcademy.StudentAchievement

  def new(conn, _params) do
    changeset = StudentAchievement.build()
    students = Student.all()
    achievements = Achievement.all()
    render(conn, "new.html", changeset: changeset,
      students: students, achievements: achievements)
  end

  def create(conn, %{"student_achievement" => %{"student_id" => student_id, "achievement_id" => achievement_id}}) do
    student = Student.find_by_id(student_id)

    case StudentAchievement.grant_achievement(student_id, achievement_id) do
      {:ok, student_achievement} ->
        conn
        |> put_flash(:info, "Achievement granted successfully.")
        |> redirect(to: student_path(conn, :show, student_id))
      {:error, changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end
end
