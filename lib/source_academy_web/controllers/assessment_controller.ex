defmodule SourceAcademyWeb.AssessmentController do
  use SourceAcademyWeb, :controller

  alias SourceAcademy.Assessment
  alias SourceAcademy.Assessment.Question
  alias SourceAcademy.Repo

  def index(conn, _params) do
    assessments = Assessment.all()
    render(conn, "index.html", assessments: assessments)
  end

  def new(conn, _params) do
    changeset = Assessment.build(%{})
    render(conn, "new.html", changeset: changeset)
  end

  def show(conn, %{"id" => id}) do
    assessment = Repo.get(Assessment, id)
    question_changeset = Question.build(%{})
    render(conn, "show.html", assessment: assessment,
      question_changeset: question_changeset)
  end

  def edit(conn, %{"id" => id}) do
    assessment = Repo.get(Assessment, id)
    changeset = Assessment.changeset(assessment, %{})
    render(conn, "edit.html", id: id, changeset: changeset)
  end

  def create(conn, %{"assessment" => assessment_params}) do
    case Assessment.create(assessment_params) do
      {:ok, _} -> redirect(conn, to: assessment_path(conn, :index))
      {:error, changeset} -> render(conn, "new.html", changeset: changeset)
    end
  end

  def update(conn, %{"id" => id, "assessment" => params}) do
    assessment = Repo.get(Assessment, id)
    case Repo.update(Assessment.changeset(assessment, params)) do
      {:ok, _} -> conn
        |> put_flash(:info, "Assessment updated")
        |> redirect(to: assessment_path(conn, :index))
      {:error, changeset} ->
        conn
        |> assign(:changeset, changeset)
        |> redirect(to: assessment_path(conn, :edit, id))
    end
  end
end
