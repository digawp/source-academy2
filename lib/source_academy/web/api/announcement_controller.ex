defmodule SourceAcademy.Api.AnnouncementController do
  use SourceAcademy.Web, :controller

  alias SourceAcademy.Announcement

  def index(conn, _params) do
    announcements = Announcement.all()
    render(conn, "index.json", announcements: announcements)
  end
end
