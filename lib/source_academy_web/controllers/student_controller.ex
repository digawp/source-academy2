defmodule SourceAcademyWeb.StudentController do
  use SourceAcademyWeb, :controller

  alias SourceAcademy.Repo
  alias SourceAcademy.Student
  alias SourceAcademy.XPHistory
  alias SourceAcademy.StudentAchievement

  def index(conn, _params) do
    students = Student.all(preload_user: true)
    render(conn, "index.html", students: students)
  end

  def show(conn, %{"id" => student_id}) do
    student = Student.find_by_id(student_id)
    xp_history_changeset = XPHistory.build(%{
      amount: 0,
      reason: ""
    })
    render(conn, "show.html",
      student: student,
      xp_history_changeset: xp_history_changeset)
  end

  def my_student(conn, _params) do
    current_user = conn.assigns.current_user
    students = Student.all(preload_user: true)
      |> Repo.preload([discussion_group: :user])
      |> Enum.filter(&(
          (&1.discussion_group != nil) &&
          (&1.discussion_group.user.id == current_user.id)))
    render(conn, "my_student.html", students: students)
  end

  def toggle_phantom(conn, %{"student_id" => student_id}) do
    student = Student.find_by_id(student_id)
    Student.toggle_phantom(student)
    redirect(conn, to: student_path(conn, :index))
  end
end
