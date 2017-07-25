defmodule SourceAcademyWeb.AnnouncementController do
  use SourceAcademyWeb, :controller

  alias SourceAcademy.Repo
  alias SourceAcademy.Announcement

  def index(conn, _params) do
    announcements = Announcement.all()
    render(conn, "index.html", announcements: announcements)
  end

  def new(conn, _params) do
    announcement_changeset = Announcement.build(%{})
    render(conn, "new.html", announcement_changeset: announcement_changeset)
  end

  def create(conn, %{"announcement" => announcement_params}) do
    poster = conn.assigns.current_user
    case Announcement.create(announcement_params, poster) do
      {:ok, announcement} -> redirect(conn, to: announcement_path(conn, :index))
      {:error, reason} ->
         conn
         |> put_flash(:error, reason)
         |> assign(:announcement_changeset, announcement_params)
         |> redirect(to: announcement_path(conn, :new))
    end
  end

  def update(conn, %{"id" => announcement_id, "announcement" => announcement_params}) do
    announcement = Announcement.find_by_id(announcement_id)
    {:ok, new} = Announcement.update(announcement, announcement_params)
    finish_editing(conn, new)
  end

  def edit(conn, %{"id" => announcement_id}) do
    announcement = Announcement.find_by_id(announcement_id)
    announcement_changeset = Announcement.changeset(announcement)

    render(conn, "edit.html",
      announcement: announcement,
      announcement_changeset: announcement_changeset
    )
  end

  def toggle_pin(conn, %{"announcement_id" => announcement_id}) do
    announcement = Announcement.find_by_id(announcement_id)
    Announcement.toggle_pin(announcement)
    finish_editing(conn, announcement)
  end

  def toggle_publish(conn, %{"announcement_id" => announcement_id}) do
    announcement = Announcement.find_by_id(announcement_id)
    Announcement.toggle_publish(announcement)
    finish_editing(conn, announcement)
  end

  defp finish_editing(conn, announcement) do
    conn
    |> put_flash(:info, announcement.title <> " updated.")
    |> redirect(to: announcement_path(conn, :index))
  end
end
