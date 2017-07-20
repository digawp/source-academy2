defmodule Api.AnnouncementView do
  use Api, :view

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
