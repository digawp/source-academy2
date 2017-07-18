defmodule SourceAcademy.SeedHelper do
  alias SourceAcademy.User
  alias SourceAcademy.Authorization
  alias SourceAcademy.Repo
  alias SourceAcademy.Student
  alias SourceAcademy.Achievement

  def add_user(params, role \\ "staff") do
    Repo.transaction(fn ->
      {:ok, user} = User.create(params, role)
      {:ok, _} = Authorization.create_identity(
        %{
          provider: "identity",
          uid: params.email,
          token: Comeonin.Bcrypt.hashpwsalt("password"),
          refresh_token: nil,
          expires_at: nil,
          password: "password",
          password_confirmation: "password"
        },
        user
      )
      {:ok, _} = Student.create(user, user.role == "staff")
      user
    end)
  end

  def add_achievement(params) do
    Achievement.create(params)
  end
end
