defmodule SourceAcademyWeb.StudentController do
  use SourceAcademyWeb, :controller

  import Ecto.Query

  alias SourceAcademy.Repo
  alias SourceAcademy.Student
  alias SourceAcademy.XPHistory

  def index(conn, params) do
    tab = Map.get(params, "tab", "Student")
    students = case tab do
      "Student" ->
        Repo.all(
          from s in Student,
          order_by: [desc: s.experience_point],
          where: s.is_phantom == false)
      "Phantom" ->
        Repo.all(
          from s in Student,
          where: s.is_phantom == true)
    end
    students = Repo.preload(students, :user)
    render(conn, "index.html",
      active_tab: tab,
      students: students)
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
