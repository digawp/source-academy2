defmodule SourceAcademy.Web.MaterialView do
  use SourceAcademy.Web, :view
  alias SourceAcademy.Material.File

  def display_url(material) do
    if material.url != nil do
      File.url({material.url, material}, signed: true)
    else
      "#"
    end
  end
end
