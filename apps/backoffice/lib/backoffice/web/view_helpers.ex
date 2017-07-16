defmodule Backoffice.Web.ViewHelpers do
  def display_name(%SourceAcademy.User{} = user) do
    user.first_name <> " " <> user.last_name
  end

  def display_name(%SourceAcademy.Student{} = student) do
    display_name(student.user)
  end
end
