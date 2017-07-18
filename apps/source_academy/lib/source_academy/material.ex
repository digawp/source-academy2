defmodule SourceAcademy.Material do
  use Ecto.Schema
  use Arc.Ecto.Schema
  import Ecto.Changeset

  alias SourceAcademy.Repo
  alias SourceAcademy.User
  alias SourceAcademy.Material.File
  alias SourceAcademy.Material.Category

  require Logger

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
    build(params)
    |> put_assoc(:uploader, uploader)
    |> put_assoc(:category, category)
    |> Repo.insert!
  end

  def delete(material) do
    Repo.get(__MODULE__, material.id)
    |> Repo.delete
  end

  def find_by_id(material_id) do
    Repo.get(__MODULE__, material_id)
  end

  def update(material, params) do
    changeset(material, params)
    |> Repo.update
  end

  def all() do
    Repo.all(__MODULE__)
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
