defmodule SourceAcademy.Auth.Identity do
  # TODO: These should be generalised using protocol
  # TODO: Handle change&reset password (these replace authorization)

  @moduledoc """
    This module contains the logic of authentication using Ueberauth
    with the Identity strategy
  """
  alias SourceAcademy.Authorization
  alias SourceAcademy.Repo
  alias SourceAcademy.User
  alias SourceAcademy.Util
  alias Ueberauth.Auth, as: UAuth

  def authenticate(%{assigns: %{ueberauth_auth: auth}} = conn) do
    case Authorization.find_by_uid_and_provider(uid_from_auth(auth), provider_from_auth(auth)) do
      # Existing User Found
      # Validate password, its hash should be
      # the authentication token
      {:ok, authorization} -> sign_in(conn, authorization)
      # Authorization not found, which means
      # User needs to be registered
      {:error, :not_found} -> register(conn)
      # Other Errors
      {:error, reason} -> {:error, reason}
    end
  end

  def register(%{assigns: %{ueberauth_auth: auth}} = conn) do
    Repo.transaction fn ->
      {:ok, user} = User.create(Map.from_struct(auth.info))
      {:ok, authorization} = create_authorization(user, auth)
      user
    end
  end

  def sign_in(%{assigns: %{ueberauth_auth: auth}} = conn, authorization) do
    case password_from_auth(auth) do
      pass when is_binary(pass) ->
        if Comeonin.Bcrypt.checkpw(pass, authorization.token) do
          User.find_by_authorization(authorization)
        else
          {:error, :password_does_not_match}
        end
      _ -> {:error, :empty_password}
    end
  end

  defp create_authorization(user, auth) do
    Authorization.create_identity(
      %{
        provider: to_string(auth.provider),
        uid: uid_from_auth(auth),
        token: token_from_auth(auth),
        refresh_token: auth.credentials.refresh_token,
        expires_at: auth.credentials.expires_at,
        password: password_from_auth(auth),
        password_confirmation: password_confirmation_from_auth(auth)
      },
      user
    )
  end

  # TODO Separate the "from_auth" functions in a helper module
  defp refresh_token_from_auth, do: auth.credentials.refresh_token

  defp expires_at_from_auth, do: auth.credentials.expires_at

  defp token_from_auth(%{provider: :identity} = auth) do
    case auth do
      %{credentials: %{other: %{password: pass}}} when not is_nil(pass) ->
        Comeonin.Bcrypt.hashpwsalt(pass)
      _ -> nil
    end
  end

  defp token_from_auth(auth), do: auth.credentials.token

  defp uid_from_auth(auth), do: auth.uid

  defp password_from_auth(%{provider: :identity} = auth),
    do: auth.credentials.other.password
  defp password_from_auth(_), do: nil

  defp password_confirmation_from_auth(%{provider: :identity} = auth) do
    auth.credentials.other.password_confirmation
  end
  defp password_confirmation_from_auth(_), do: nil

  defp provider_from_auth(auth), do: to_string(auth.provider)
end
