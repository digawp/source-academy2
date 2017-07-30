defmodule SourceAcademyWeb.ViewHelpers do
  @moduledoc false
  alias SourceAcademy.User
  alias SourceAcademy.Student
  alias SourceAcademyWeb.HelperView
  alias Timex.Timezone

  require Logger

  def display_name(%Student{} = student), do: display_name(student.user)
  def display_name(%User{} = user) do
    user.first_name <> " " <> user.last_name
  end

  def display_datetime(date) do
    timezone = Timezone.get("Asia/Singapore", Timex.now)
    date = Timezone.convert(date, timezone)
    Logger.info inspect(date)
    Timex.format!(date, "%d/%m %H:%M", :strftime)
  end

  # Non Ideal State
  def non_ideal_state(title, condition, opts \\ []) do
    if condition do
      HelperView.render "non_ideal_state.html", title: title, description: opts[:description] || ""
    end
  end

  def admin_header(conn, title, controls \\ (fn -> "" end)) do
    HelperView.render "admin_header.html", conn: conn, title: title, controls: controls
  end
end
