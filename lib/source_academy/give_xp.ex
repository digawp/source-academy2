defmodule SourceAcademy.GiveXP do
  @moduledoc false
  use Ecto.Schema
  import Ecto.Changeset

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
      give_xp = build(params)
      changeset = give_xp
        |> put_assoc(:user, giver)
        |> put_assoc(:student, student)
      {:ok, give_xp} = Repo.insert(changeset)
      {:ok, _} = Student.increase_xp(student, give_xp.amount)
      give_xp
    end
  end

  def changeset(give_xp, params) do
    give_xp
    |> cast(params, @required_fields)
    |> validate_required(@required_fields)
    |> validate_length(:reason, min: 1)
  end
end
