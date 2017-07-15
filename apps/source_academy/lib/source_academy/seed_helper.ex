defmodule SourceAcademy.SeedHelper do
  alias SourceAcademy.User
  alias SourceAcademy.Authorization
  alias SourceAcademy.Repo

  def add_user(params, role \\ "staff") do
    Repo.transaction(fn ->
      {:ok, user} = User.create(params, role)
      Authorization.create_identity(
        %{
          provider: "provider",
          uid: params.email,
          token: Comeonin.Bcrypt.hashpwsalt("password"),
          refresh_token: nil,
          expires_at: nil,
          password: "password",
          password_confirmation: "password"
        },
        user
      )
    end)
  end
end
