defmodule Backoffice.Web.GiveXPController do
  use Backoffice.Web, :controller

  alias SourceAcademy.Repo
  alias SourceAcademy.Student
  alias SourceAcademy.GiveXP

  def create(conn, %{"give_xp" => give_xp_params, "student_id" => student_id}) do
    giver = conn.assigns.current_user
    case GiveXP.create(give_xp_params, student_id, giver) do
      {:ok, give_xp} -> redirect_to_student(conn, student_id)
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
