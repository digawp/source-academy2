defmodule SourceAcademy.Assessment do
  @moduledoc false
  use SourceAcademy, :model
  use Arc.Ecto.Schema

  import Ecto.Query

  alias SourceAcademy.Repo
  alias SourceAcademy.Assessment.Attachment
  alias SourceAcademy.Assessment.TypeEnum
  alias Timex.Timezone

  schema "assessments" do
    field :name, :string
    field :title, :string
    field :description, :string
    field :briefing, :string
    field :type, TypeEnum

    field :is_published, :boolean, default: false

    field :cover_url, Attachment.Type
    field :script_url, Attachment.Type
    field :story_url, Attachment.Type

    field :open_at, Timex.Ecto.DateTime
    field :close_at, Timex.Ecto.DateTime

    timestamps()
  end

  @required_fields ~w(name title type open_at close_at)a
  @optional_fields ~w(description briefing is_published)a

  @optional_file_fields ~w(cover_url script_url story_url)a
  require Logger

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
    params = params
      |> convert_date("open_at")
      |> convert_date("close_at")
    assessment
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> validate_open_close_date
    |> cast_attachments(params, @optional_file_fields)
  end

  defp convert_date(params, field) do
    if params[field] do
      timezone = Timezone.get("Asia/Singapore", Timex.now)
      date = params[field]
        |> String.to_integer
        |> Timex.from_unix(:millisecond)
        |> Timezone.convert(timezone)
      Map.put(params, field, date)
    else
      params
    end
  end

  defp validate_open_close_date(changeset) do
    validate_change changeset, :open_at, fn :open_at, open_at ->
      if open_at >= get_field(changeset, :close_at) do
        [open_at: "Open date must be < close date"]
      else
        []
      end
    end
  end
end
