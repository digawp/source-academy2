defmodule SourceAcademyWeb.AssessmentQuestionController do
  use SourceAcademyWeb, :controller

  alias SourceAcademy.Repo
  alias SourceAcademy.Assessment
  alias SourceAcademy.Assessment.Question
  alias SourceAcademyWeb.AssessmentView

  def create(conn, %{
      "assessment_id" => assessment_id,
      "question" => params
    }) do
    assessment = Repo.get(Assessment, assessment_id)
    case Assessment.create_question(assessment, params) do
      {:ok, _} ->
        conn
        |> put_flash(:info, "Question Added Successfully")
        |> redirect(to: assessment_path(conn, :show, assessment_id))
      {:error, changeset} ->
        render(conn, AssessmentView, :show,
          assessment: assessment,
          question_changeset: changeset)
    end
  end
end
