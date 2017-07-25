defmodule SourceAcademy.Authorization.Identity do
  @moduledoc """
    This module contains the logic of authentication using Ueberauth
    with the Identity strategy
  """
  import Ecto.Changeset

  alias SourceAcademy.Authorization
  alias SourceAcademy.Repo
  alias SourceAcademy.User
  alias SourceAcademy.Student
  alias SourceAcademy.Util
  alias Comeonin.Bcrypt
  alias Ueberauth.Auth, as: UAuth

  @required_login_fields ~w(uid password)a
  @required_registration_fields ~w(password password_confirmation)a

  def build_login(params), do: login_changeset(%Authorization{}, params)
  def build_registration(params), do: registration_changeset(%Authorization{}, params)

  def registration_changeset(auth, params) do
    auth
    |> cast(params, @required_registration_fields)
    |> validate_required(@required_registration_fields)
    |> validate_length(:password, min: 8, max: 90)
    |> validate_confirmation(:password)
    |> put_password_in_token(params)
  end

  def login_changeset(auth, params) do
    auth
    |> Authorization.changeset(params)
    |> validate_required(@required_login_fields)
  end

  def register(params) do
    Repo.transaction fn ->
      with {:ok, user} <- %User{}
        |> User.registration_changeset(params)
        |> cast_assoc(:authorizations,
             required: true, with: &registration_changeset/2)
        |> put_identity_data()
        |> Repo.insert,
        {:ok, _} <- Student.create(user, true),
      do: user
    end
  end

  def sign_in(%{"uid" => uid, "password"=> password}) do
    case Authorization.find_by_uid_and_provider(uid, "identity") do
      {:ok, auth} ->
        case check_password(password, auth.token) do
          :ok -> User.find_by_authorization(auth)
          {:error, reason} -> {:error, reason}
        end
      _ -> {:error, :email_not_found}
    end
  end

  defp check_password(password, hash) do
    case password do
      password when is_binary(password) ->
        if Bcrypt.checkpw(password, hash) do
          :ok
        else
          {:error, :password_does_not_match}
        end
      _ -> {:error, :empty_password}
    end
  end

  defp put_password_in_token(changeset, params) do
    if changeset.valid? do
      password = params["password"]
      token = Bcrypt.hashpwsalt(password)
      cast(changeset, %{token: token}, [:token])
    else
      changeset
    end
  end

  defp put_identity_data(changeset) do
    if changeset.valid? do
      extras = %{provider: "identity", uid: get_field(changeset, :email)}
      identity_auth = changeset
        |> get_field(:authorizations)
        |> Enum.map(&Map.merge(&1, extras))
      put_assoc(changeset, :authorizations, identity_auth)
    else
      changeset
    end
  end
end
