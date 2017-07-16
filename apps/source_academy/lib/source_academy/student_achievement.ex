defmodule SourceAcademy.StudentAchievement do
  use Ecto.Schema
  import Ecto.Changeset

  alias SourceAcademy.Repo
  alias SourceAcademy.Student
  alias SourceAcademy.Achievement

  schema "student_achievements" do
    belongs_to :student, Student
    belongs_to :achievement, Achievement

    timestamps()
  end

  def build() do
    changeset(%__MODULE__{}, %{})
  end

  def grant_achievement(student_id, achievement_id) do
    Repo.transaction fn ->
      student = Student.find_by_id(student_id)
      achievement = Achievement.find_by_id(achievement_id)
      changeset = build()
        |> put_assoc(:student, student)
        |> put_assoc(:achievement, achievement)
      {:ok, student_achievement} = Repo.insert(changeset)
      student_achievement
    end
  end

  def changeset(student_achievement, params) do
    cast(student_achievement, params, [])
  end
end
