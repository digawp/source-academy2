defmodule SourceAcademy.SeedHelper do
  alias SourceAcademy.User
  alias SourceAcademy.Authorization
  alias SourceAcademy.Repo
  alias SourceAcademy.Student

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
      {:ok, _} = Student.create(user, user.role == "student")
      user
    end)
  end
end
