defmodule SourceAcademy.StudentAchievement do
  @moduledoc false
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query, only: [from: 2]

  alias SourceAcademy.Repo
  alias SourceAcademy.Student
  alias SourceAcademy.Achievement

  schema "student_achievements" do
    belongs_to :student, Student
    belongs_to :achievement, Achievement

    timestamps()
  end

  def build do
    changeset(%__MODULE__{}, %{})
  end

  def grant_achievement(student_id, achievement_id) do
    Repo.transaction fn ->
      student = Student.find_by_id(student_id)
      achievement = Achievement.find_by_id(achievement_id)
      student_achievement = build()
      changeset = student_achievement
        |> put_assoc(:student, student)
        |> put_assoc(:achievement, achievement)
      {:ok, student_achievement} = Repo.insert(changeset)
      student_achievement
    end
  end

  def find_by_student_id(student_id) do
    query = from sa in __MODULE__, where: sa.student_id == ^student_id
    Repo.preload(Repo.all(query), :achievement)
  end

  def changeset(student_achievement, params) do
    cast(student_achievement, params, [])
  end
end
