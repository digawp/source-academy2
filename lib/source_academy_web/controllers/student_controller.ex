defmodule SourceAcademyWeb.StudentController do
  use SourceAcademyWeb, :controller

  alias SourceAcademy.Student
  alias SourceAcademy.GiveXP
  alias SourceAcademy.StudentAchievement

  def index(conn, _params) do
    students = Student.all(preload_user: true)
    render(conn, "index.html", students: students)
  end

  def show(conn, %{"id" => student_id}) do
    student = Student.find_by_id(student_id)
    give_xp_changeset = GiveXP.build(%{
      amount: 0,
      reason: ""
    })
    student_achievements = StudentAchievement.find_by_student_id(student_id)
    achievements = Enum.map(student_achievements, &(&1.achievement))

    render(conn, "show.html",
      student: student,
      give_xp_changeset: give_xp_changeset,
      achievements: achievements
    )
  end

  def toggle_phantom(conn, %{"student_id" => student_id}) do
    student = Student.find_by_id(student_id)
    Student.toggle_phantom(student)
    redirect(conn, to: student_path(conn, :index))
  end
end
