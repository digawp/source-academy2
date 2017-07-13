defmodule SourceAcademy.Authorization do
  @moduledoc """
   The Authorization entity represents user authorisation means
   from different providers. It keeps track of the token and expiry, as
   well as hashed password for identity provider.
  """
  use Ecto.Schema
  import Ecto.Changeset
  alias SourceAcademy.User
  alias SourceAcademy.Repo
  alias SourceAcademy.Util

  @type t :: %__MODULE__{}

  schema "authorizations" do
    field :provider, :string
    field :uid, :string
    field :token, :string
    field :refresh_token, :string
    field :expires_at, :integer
    field :password, :string, virtual: true
    field :password_confirmation, :string, virtual: true

    belongs_to :user, User

    timestamps()
  end

  @required_fields ~w(provider uid user_id token)a
  @optional_fields ~w(refresh_token expires_at)a

  def create_identity(params, user) do
    authorization = Ecto.build_assoc(user, :authorizations)
    changeset = identity_registration_changeset(authorization, Util.scrub(params))
    Repo.insert(changeset)
  end

  def find_by_uid_and_provider(uid, provider) do
    case Repo.get_by(__MODULE__, uid: uid, provider: provider) do
      nil -> {:error, :not_found}
      authorization -> {:ok, authorization}
    end
  end

  def identity_registration_changeset(authorization, params) do
    authorization
    |> changeset(params)
    |> validate_length(:password, min: 8)
    |> validate_confirmation(:password)
  end

  def changeset(authorization, params \\ :empty) do
    authorization
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> foreign_key_constraint(:user_id)
    |> unique_constraint(:uid)
  end
end
