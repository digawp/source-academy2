defmodule SourceAcademy.SeedHelper do
  @moduledoc false
  alias SourceAcademy.Authorization.Identity
  alias SourceAcademy.Repo
  alias SourceAcademy.Student
  alias SourceAcademy.Achievement
  alias Comeonin.Bcrypt
  alias Ecto.Changeset

  import Ecto.Query

  def add_user(params, role \\ "staff") do
    Repo.transaction fn ->
      {:ok, user} = Identity.register(%{
        "first_name" => params.first_name,
        "last_name" => params.last_name,
        "email" => params.email,
        "authorizations" => %{
          "0" => %{
            "password" => "password",
            "password_confirmation" => "password"
          }
        }
      })

      # Set correct role
      {:ok, user} = user
        |> Changeset.change(role: role)
        |> Repo.update

      # Set student to not phantom if student
      if role == "student" do
        user = Repo.preload(user, :student)

        user.student
        |> Changeset.change(is_phantom: false)
        |> Repo.update!
      end
    end
  end

  def add_achievement(params) do
    Achievement.create(params)
  end
end
