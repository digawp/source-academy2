defmodule Backoffice.Web.StudentController do
  use Backoffice.Web, :controller

  alias SourceAcademy.Repo
  alias SourceAcademy.Student
  alias SourceAcademy.GiveXP

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
    render(conn, "show.html",
      student: student,
      give_xp_changeset: give_xp_changeset
    )
  end
end
