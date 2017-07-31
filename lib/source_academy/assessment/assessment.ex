defmodule SourceAcademy.Assessment do
  @moduledoc false
  use SourceAcademy, :model
  use Arc.Ecto.Schema

  import Ecto.Query

  alias SourceAcademy.Repo
  alias SourceAcademy.Assessment.Attachment
  alias SourceAcademy.Assessment.TypeEnum

  schema "assessments" do
    field :name, :string
    field :title, :string
    field :description, :string
    field :briefing, :string
    field :type, TypeEnum

    field :cover_url, Attachment.Type
    field :script_url, Attachment.Type
    field :story_url, Attachment.Type

    timestamps()
  end

  @required_fields ~w(name title type)a
  @optional_fields ~w(description briefing)a

  @optional_file_fields ~w(cover_url script_url story_url)a

  def build(params) do
    changeset(%__MODULE__{}, params)
  end

  def create(params) do
    changeset = build(params)
    Repo.insert(changeset)
  end

  def all do
    Repo.all(__MODULE__)
  end

  def all([type: type]) do
    Repo.all(from s in __MODULE__, where: s.type == ^type)
  end

  def changeset(assessment, params) do
    assessment
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> cast_attachments(params, @optional_file_fields)
  end
end
