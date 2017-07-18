defmodule SourceAcademy.Material.Category do
  use Ecto.Schema
  import Ecto.Changeset

  alias SourceAcademy.Repo
  alias SourceAcademy.Material

  schema "materials_category" do
    field :name, :string
    field :is_shown, :boolean, default: true

    has_many :materials, Material, on_delete: :delete_all

    timestamps()
  end

  @required_fields ~w(name)a
  @optional_fields ~w()a

  def build(params) do
    changeset(%__MODULE__{}, params)
  end

  def create(params) do
    build(params)
    |> Repo.insert
  end

  def delete(category) do
    Repo.get(__MODULE__, category.id)
    |> Repo.delete
  end

  def find_by_id(category_id) do
    Repo.get(__MODULE__, category_id)
  end

  def all() do
    Repo.all(__MODULE__)
  end

  def changeset(category, params \\ :empty) do
    category
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
  end
end
