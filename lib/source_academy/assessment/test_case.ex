defmodule SourceAcademy.Assessment.TestCase do
  @moduledoc false
  use SourceAcademy, :model

  import Ecto.Query

  alias SourceAcademy.Repo
  alias SourceAcademy.Assessment.ProgrammingQuestion

  schema "assessment_test_cases" do
    field :is_private, :boolean, default: false
    field :code, :string
    field :expected_result, :string

    belongs_to :programming_question, ProgrammingQuestion

    timestamps()
  end

  @required_fields ~w(code expected_result)a

  def build(params) do
    changeset(%__MODULE__{}, params)
  end

  def changeset(test_case, params) do
    test_case
    |> cast(params, @required_fields)
    |> validate_required(@required_fields)
    |> unique_constraint(:programming_question,
        name: :assessment_test_cases_programming_question_id_index)
  end
end
