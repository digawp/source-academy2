defmodule SourceAcademyWeb.XPHistoryController do
  use SourceAcademyWeb, :controller

  alias SourceAcademy.Repo
  alias SourceAcademy.Student
  alias SourceAcademy.XPHistory

  def create(conn, %{"xp_history" => xp_history_params, "student_id" => student_id}) do
    giver = conn.assigns.current_user
    case XPHistory.create(xp_history_params, student_id, giver) do
      {:ok, xp_history} -> redirect_to_student(conn, student_id)
      {:error, reason} ->
        conn
        |> put_flash(:error, reason)
        |> redirect_to_student(student_id)
    end
  end

  defp redirect_to_student(conn, student_id) do
    redirect(conn, to: student_path(conn, :show, student_id))
  end
end
