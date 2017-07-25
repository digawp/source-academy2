defmodule SourceAcademyWeb.ViewHelpers do
  @moduledoc false
  alias SourceAcademy.User
  alias SourceAcademy.Student

  def display_name(%Student{} = student), do: display_name(student.user)
  def display_name(%User{} = user) do
    user.first_name <> " " <> user.last_name
  end
end
