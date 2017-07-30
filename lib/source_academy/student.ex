defmodule SourceAcademy.Student do
  @moduledoc false
  use SourceAcademy, :model

  alias SourceAcademy.User
  alias SourceAcademy.Repo
  alias SourceAcademy.XPHistory
  alias SourceAcademy.DiscussionGroup
  alias SourceAcademy.StudentAchievement

  schema "students" do
    field :is_phantom, :boolean, default: false
    field :experience_point, :integer, default: 0
    field :level, :integer, default: 1
    field :latest_story, :string

    belongs_to :user, User

    has_many :xp_history, XPHistory
    has_one  :discussion_group, DiscussionGroup
    has_many :achievements, StudentAchievement # intermediate table

    timestamps()
  end

  @student_fields ~w(is_phantom experience_point level latest_story)s

  def all, do: all(preload_user: true)
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
      student
      |> Repo.preload(:user)
      |> Repo.preload([xp_history: :user, discussion_group: :user])
    else
      student
    end
  end

  def create(user, is_phantom \\ false) do
    student = Ecto.build_assoc(user, :student)

    student
    |> changeset(%{is_phantom: is_phantom})
    |> Repo.insert
  end

  def increase_xp(student, amount) do
    experience_point = student.experience_point + amount
    student
    |> cast(%{experience_point: experience_point}, [:experience_point])
    |> Repo.update
  end

  def toggle_phantom(student) do
    student
    |> cast(%{is_phantom: !student.is_phantom}, [:is_phantom])
    |> Repo.update
  end

  def changeset(student, params) do
    student
    |> cast(params, @student_fields)
    |> validate_number(:level, greater_than_or_equal_to: 1)
    |> validate_number(:experience_point, greater_than_or_equal_to: 0)
  end
end
