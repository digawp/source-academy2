defmodule SourceAcademyWeb.StudentController do
  use SourceAcademyWeb, :controller

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
    achievements = Enum.map(student_achievements, &(&1.achievement))
    render(conn, "show.html",
      student: student,
      xp_history_changeset: xp_history_changeset)
  end

  def toggle_phantom(conn, %{"student_id" => student_id}) do
    student = Student.find_by_id(student_id)
    Student.toggle_phantom(student)
    redirect(conn, to: student_path(conn, :index))
  end
end
