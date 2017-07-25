defmodule SourceAcademy.Material do
  @moduledoc false
  use Ecto.Schema
  use Arc.Ecto.Schema
  import Ecto.Changeset

  alias SourceAcademy.Repo
  alias SourceAcademy.User
  alias SourceAcademy.Material.File
  alias SourceAcademy.Material.Category

  schema "materials" do
    field :title, :string
    field :description, :string
    field :is_public, :boolean, default: true
    field :url, File.Type

    belongs_to :category, Category
    belongs_to :uploader, User

    timestamps()
  end

  @required_fields ~w(title)a
  @optional_fields ~w(description)a

  @required_file_fields ~w(url)a

  def build(params) do
    changeset(%__MODULE__{}, params)
  end

  def create(params, uploader, category) do
    material = build(params)

    material
    |> put_assoc(:uploader, uploader)
    |> put_assoc(:category, category)
    |> Repo.insert!
  end

  def delete(material) do
    material = Repo.get(__MODULE__, material.id)
    Repo.delete(material)
  end

  def find_by_id(material_id) do
    Repo.get(__MODULE__, material_id)
  end

  def update(material, params) do
    changeset = changeset(material, params)
    Repo.update(changeset)
  end

  def all do
    materials = Repo.all(__MODULE__)

    materials
    |> Repo.preload(:uploader)
    |> Repo.preload(:category)
    |> Enum.sort_by(&(&1.inserted_at))
    |> Enum.reverse
  end

  def changeset(material, params \\ :empty) do
    material
    |> cast(params, @required_fields ++ @optional_fields)
    |> cast_attachments(params, @required_file_fields)
    |> validate_required(@required_fields)
  end
end
