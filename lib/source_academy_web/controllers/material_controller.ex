defmodule SourceAcademyWeb.MaterialController do
  use SourceAcademyWeb, :controller

  alias SourceAcademy.Material
  alias SourceAcademy.Material.Category

  def index(conn, _params) do
    categories = Category.all()
    materials = Material.all()
    render(conn, "index.html",
      materials: materials,
      categories: categories)
  end

  def new(conn, _params) do
    changeset = Material.build(%{})
    category_changeset = Category.build(%{})
    categories = Category.all()
    render(conn, "new.html",
      categories: categories,
      changeset: changeset,
      category_changeset: category_changeset)
  end

  def create(conn, %{"material" => material_params}) do
    uploader = conn.assigns.current_user
    category = Category.find_by_id(Map.get(material_params, "category_id"))
    Material.create(material_params, uploader, category)
    redirect(conn, to: material_path(conn, :index))
  end

  def delete_entry(conn, %{"id" => id}) do
    material = Material.find_by_id(id)
    Material.delete(material)
    redirect(conn, to: material_path(conn, :index))
  end

  def create_category(conn, %{"category" => category_params}) do
    case Category.create(category_params) do
      {:ok, _} -> redirect(conn, to: material_path(conn, :index))
      {:error, reason} ->
         conn
         |> put_flash(:error, reason)
         |> redirect(to: material_path(conn, :index))
    end
  end

  def delete_category(conn, %{"category_id" => category_id}) do
    category = Category.find_by_id(category_id)
    Category.delete(category)
    redirect(conn, to: material_path(conn, :index))
  end
end
