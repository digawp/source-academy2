defmodule SourceAcademy.AchievementDependency do
  use Ecto.Schema
  import Ecto.Changeset

  alias SourceAcademy.Repo
  alias SourceAcademy.Achievement

  schema "achievement_dependencies" do
    belongs_to :achievement, Achievement
    belongs_to :dependency, Achievement

    timestamps()
  end

  def build() do
    changeset(%__MODULE__{}, %{})
  end

  def add_dependency(achievement_id, dependency_id) do
    Repo.transaction fn ->
      achievement = Achievement.find_by_id(achievement_id)
      dependency = Achievement.find_by_id(dependency_id)
      changeset = build()
        |> put_assoc(:achievement, achievement)
        |> put_assoc(:dependency, dependency)
      {:ok, dep} = Repo.insert(changeset)
      dep
    end
  end

  def changeset(achievement_dep, params) do
    cast(achievement_dep, params, [])
  end
end
