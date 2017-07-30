defmodule SourceAcademy.Achievement do
  @moduledoc false
  use SourceAcademy, :model
  use Arc.Ecto.Schema

  alias SourceAcademy.Repo
  alias SourceAcademy.Achievement.Image

  schema "achievements" do
    field :title, :string
    field :description, :string
    field :display_order, :integer
    field :image_url, Image.Type
    field :category, :string
    field :query, :string

    timestamps()
  end

  @required_fields ~w(title)a
  @optional_fields ~w(description query category)a

  @optional_file_fields ~w(image_url)a

  def build(params) do
    changeset(%__MODULE__{}, params)
  end

  def create(params) do
    achievement = build(params)
    Repo.transaction fn ->
      achievements = Repo.all(__MODULE__)
      if Enum.empty?(achievements) do
        achievement
        |> change(%{ display_order: 0 })
        |> Repo.insert!
      else
        last_achievement = Enum.max_by(achievements, &(&1.display_order))
        achievement
        |> change(%{
          display_order: last_achievement.display_order + 1
        })
        |> Repo.insert!
      end
    end
  end

  def all do
    Repo.all(__MODULE__)
  end

  def find_by_id(id) do
    Repo.get(__MODULE__, id)
  end

  def changeset(achievement, params) do
    achievement
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> cast_attachments(params, @optional_file_fields)
  end
end
