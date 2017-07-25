defmodule SourceAcademyApi.AnnouncementController do
  use SourceAcademyApi, :controller

  alias SourceAcademy.Announcement

  def index(conn, _params) do
    announcements = Announcement.all()
    render(conn, "index.json", announcements: announcements)
  end
end
