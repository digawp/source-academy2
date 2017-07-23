defmodule SourceAcademy.Student do
  use Ecto.Schema
  import Ecto.Changeset

  alias SourceAcademy.User
  alias SourceAcademy.Repo
  alias SourceAcademy.GiveXP
  alias SourceAcademy.StudentAchievement

  schema "students" do
    field :is_phantom, :boolean, default: false
    field :experience_point, :integer, default: 0
    field :level, :integer, default: 1
    field :latest_story, :string

    belongs_to :user, User

    has_many :give_xp, GiveXP

    has_many :_achievements, StudentAchievement # intermediate table
    has_many :achievements, through: [:_achievements, :achievement]

    timestamps()
  end

  @student_fields ~w(is_phantom experience_point level latest_story)s

  def all(), do: all(preload_user: true)
  def all(preload_user: with_user) do
    students = Repo.all(__MODULE__)
    if with_user do
      Repo.preload(students, :user)
    else
      students
    end
  end

  def find_by_id(id), do: find_by_id(id, preload_user: true)
  def find_by_id(id, preload_user: with_user) do
    student = Repo.get(__MODULE__, id)
    if with_user do
      Repo.preload(student, :user)
    else
      student
    end
  end

  def create(user, is_phantom \\ false) do
    Ecto.build_assoc(user, :student)
    |> changeset(%{is_phantom: is_phantom})
    |> Repo.insert
  end

  def increase_xp(student, amount) do
    student
    |> cast(%{experience_point: student.experience_point + amount }, [:experience_point])
    |> Repo.update
  end

  def toggle_phantom(student) do
    student
    |> cast(%{is_phantom: !student.is_phantom}, [:is_phantom] )
    |> Repo.update
  end

  def changeset(student, params) do
    student
    |> cast(params, @student_fields)
    |> validate_number(:level, greater_than_or_equal_to: 1)
    |> validate_number(:experience_point, greater_than_or_equal_to: 0)
  end
end
