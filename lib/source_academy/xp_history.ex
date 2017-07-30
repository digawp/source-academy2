defmodule SourceAcademy.XPHistory do
  @moduledoc false
  use SourceAcademy, :model

  alias SourceAcademy.Repo
  alias SourceAcademy.Student
  alias SourceAcademy.User

  schema "xp_history" do
    field :reason, :string
    field :amount, :integer

    belongs_to :user, User, foreign_key: :giver_id
    belongs_to :student, Student
    timestamps()
  end

  @required_fields ~w(reason amount)a

  def build(params) do
    changeset(%__MODULE__{}, params)
  end

  def create(params, student_id, giver) do
    Repo.transaction fn ->
      student = Student.find_by_id(student_id)
      xp_history = build(params)
      changeset = xp_history
        |> put_assoc(:user, giver)
        |> put_assoc(:student, student)
      {:ok, xp_history} = Repo.insert(changeset)
      {:ok, _} = Student.increase_xp(student, xp_history.amount)
      xp_history
    end
  end

  def changeset(xp_history, params) do
    xp_history
    |> cast(params, @required_fields)
    |> validate_required(@required_fields)
    |> validate_length(:reason, min: 1)
  end
end
