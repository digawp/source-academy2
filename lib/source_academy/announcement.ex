defmodule SourceAcademy.Announcement do
  @moduledoc false
  use SourceAcademy, :model

  alias SourceAcademy.Repo
  alias SourceAcademy.User

  schema "announcements" do
    field :title, :string
    field :content, :string, default: "No Content"
    field :is_pinned, :boolean, default: false
    field :is_published, :boolean, default: true

    belongs_to :poster, User

    timestamps()
  end

  @required_fields ~w(title)a
  @optional_fields ~w(content is_pinned is_published)a

  def build(params) do
    changeset(%__MODULE__{}, params)
  end

  def create(params, poster) do
    announcement = build(params)

    announcement
    |> put_assoc(:poster, poster)
    |> Repo.insert
  end

  def delete(announcement) do
    announcement = Repo.get(__MODULE__, announcement.id)
    Repo.delete(announcement)
  end

  def find_by_id(announcement_id) do
    Repo.get(__MODULE__, announcement_id)
  end

  def update(announcement, params) do
    announcement = changeset(announcement, params)
    Repo.update(announcement)
  end

  def toggle_pin(announcement) do
    update(announcement, %{is_pinned: !announcement.is_pinned})
  end

  def toggle_publish(announcement) do
    update(announcement, %{is_published: !announcement.is_published})
  end

  def all do
    announcements = Repo.all(__MODULE__)

    announcements
    |> Repo.preload(:poster)
    |> Enum.sort_by(&(&1.inserted_at))
    |> Enum.reverse
  end

  def changeset(announcement, params \\ :empty) do
    announcement
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
  end
end
