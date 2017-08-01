defmodule SourceAcademyWeb.AssessmentController do
  use SourceAcademyWeb, :controller

  alias SourceAcademy.Assessment
  alias SourceAcademy.Repo

  def index(conn, _params) do
    assessments = Assessment.all()
    render(conn, "index.html", assessments: assessments)
  end

  def new(conn, _params) do
    changeset = Assessment.build(%{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"assessment" => assessment_params}) do
    case Assessment.create(assessment_params) do
      {:ok, _} -> redirect(conn, to: assessment_path(conn, :index))
      {:error, changeset} -> render(conn, "new.html", changeset: changeset)
    end
  end

  def update(conn, %{"id" => assessment_id, "assessment" => assessment_params}) do
    assessment = Repo.get(Assessment, assessment_id)
    {:ok, _} = Assessment.update(assessment, assessment_params)
    redirect(conn, to: assessment_path(conn, :show, assessment_id))
  end

  def edit(conn, %{"id" => assessment_id}) do
    assessment = Repo.get(Assessment, assessment_id)
    assessment_changeset = Assessment.changeset(assessment, %{})

    render(conn, "edit.html",
      assessment: assessment,
      assessment_changeset: assessment_changeset
    )
  end
end
