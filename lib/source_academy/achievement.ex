defmodule SourceAcademy.Achievement do
  @moduledoc false
  use Ecto.Schema
  import Ecto.Changeset

  alias SourceAcademy.Repo

  schema "achievements" do
    field :title, :string
    field :description, :string
    field :points, :integer
    field :display_order, :integer
    field :image_src, :string
    field :category, :string
    field :query, :string

    timestamps()
  end

  @required_fields ~w(title description category)a
  @optional_fields ~w(query image_src points display_order)a

  def build(params) do
    changeset(%__MODULE__{}, params)
  end

  def create(params) do
    achievement = build(params)
    Repo.insert(achievement)
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
    |> validate_number(:points, greater_than_or_equal_to: 0)
  end
end
