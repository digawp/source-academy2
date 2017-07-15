defmodule SourceAcademy.Student do
  use Ecto.Schema
  import Ecto.Changeset

  alias SourceAcademy.User
  alias SourceAcademy.Repo

  schema "students" do
    field :is_phantom, :boolean, default: false
    field :experience_point, :integer, default: 0
    field :level, :integer, default: 1
    field :latest_story, :string

    belongs_to :user, User

    timestamps()
  end

  @required_fields ~w(is_phantom experience_point level)s
  @optional_fields ~w(latest_story)s

  def create(user, is_phantom \\ false) do
    Ecto.build_assoc(user, :student)
    |> changeset(%{is_phantom: is_phantom})
    |> Repo.insert
  end

  def changeset(student, params) do
    student
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_number(:level, greater_than_or_equal_to: 1)
    |> validate_number(:experience_point, greater_than_or_equal_to: 0)
  end
end
