defmodule SourceAcademy.Web.AnnouncementView do
  use SourceAcademy.Web, :view

  def toggle_pin_label(announcement) do
    if announcement.is_pinned, do: "Unpin", else: "Pin"
  end

  def toggle_publish_label(announcement) do
    if announcement.is_published, do: "Unpublish", else: "Publish"
  end

  def render("index.json", %{announcements: announcements}) do
    render_many(announcements, __MODULE__, "announcement.json")
  end

  def render("announcement.json", %{announcement: announcement}) do
    %{
      id: announcement.id,
      title: announcement.title,
      content: announcement.content,
      inserted_at: announcement.inserted_at
    }
  end
end
