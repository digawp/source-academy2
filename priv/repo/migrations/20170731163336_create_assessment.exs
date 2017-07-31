defmodule SourceAcademy.Repo.Migrations.CreateAssessment do
  @moduledoc false
  use Ecto.Migration
  alias SourceAcademy.Assessment.TypeEnum

  def change do
    TypeEnum.create_type

    create table(:assessments) do
      add :name, :string
      add :title, :string
      add :description, :text
      add :briefing, :text
      add :type, :type

      add :cover_url, :string
      add :script_url, :string
      add :story_url, :string

      timestamps()
    end
  end
end
