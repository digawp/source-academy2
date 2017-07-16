defmodule Backoffice.Web.DiscussionGroupController do
  use Backoffice.Web, :controller

  alias SourceAcademy.User
  alias SourceAcademy.DiscussionGroup
  alias SourceAcademy.Student

  def index(conn, _params) do
    discussion_group_changeset = DiscussionGroup.build()
    discussion_groups = DiscussionGroup.all()
    staffs = User.all_staffs()
    students = Enum.filter(Student.all(), &(!&1.is_phantom))
      |> Enum.filter(&(Enum.find(discussion_groups, nil, fn dg ->
        dg.student.id == &1.id
      end) == nil))

    render(conn, "index.html",
      students: students,
      discussion_group_changeset: discussion_group_changeset,
      discussion_groups: discussion_groups,
      staffs: staffs)
  end

  def create(conn, %{"discussion_group" => %{"user_id" => staff_id, "student_id" => student_id}}) do
    DiscussionGroup.add_to(staff_id, student_id)
    redirect(conn, to: discussion_group_path(conn, :index))
  end

  def delete_entry(conn, %{"discussion_group_id" => id}) do
    DiscussionGroup.delete(id)
    redirect(conn, to: discussion_group_path(conn, :index))
  end
end
