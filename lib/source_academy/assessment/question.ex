defmodule SourceAcademy.Assessment.Question do
  @moduledoc false
  use SourceAcademy, :model

  import Ecto.Query

  alias SourceAcademy.Repo
  alias SourceAcademy.Assessment

  schema "assessment_questions" do
    field :title, :string
    field :display_order, :integer
    field :weight, :integer
    belongs_to :assessment, Assessment

    timestamps()
  end

  @required_fields ~w(title weight)a

  def build(params) do
    changeset(%__MODULE__{}, params)
  end

  def changeset(question, params) do
    question
    |> cast(params, @required_fields)
    |> validate_required(@required_fields)
    |> validate_number(:weight, greater_than: 0)
  end
end
