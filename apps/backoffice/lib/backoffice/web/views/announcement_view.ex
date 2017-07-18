defmodule Backoffice.Web.AnnouncementView do
  use Backoffice.Web, :view

  def toggle_pin_label(announcement) do
    if announcement.is_pinned, do: "Unpin", else: "Pin"
  end

  def toggle_publish_label(announcement) do
    if announcement.is_published, do: "Unpublish", else: "Publish"
  end
end
