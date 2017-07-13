defmodule SourceAcademy.User do
  @moduledoc """
    The User entity contains basic user data such as name and e-mail.
    A user can have many authorisations from different providers.
  """
  use Ecto.Schema
  import Ecto.Changeset
  alias SourceAcademy.Repo

  @type t :: %__MODULE__{}

  schema "users" do
    field :first_name, :string
    field :last_name, :string
    field :email, :string
    field :role, :string
    field :passwd_reset_id, :string
    field :passwd_reset_id_expiry, :utc_datetime

    has_many :authorizations, SourceAcademy.Authorization

    timestamps()
  end

  @required_fields ~w(first_name email)a
  @optional_fields ~w(last_name)a
  @user_roles ~w(admin staff student)s

  def build(params) do
    changeset(%SourceAcademy.User{}, params)
  end

  def registration_changeset(user, params \\ :empty) do
    user
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> validate_format(:email, ~r/.*@.*/)
  end

  def changeset(user, params \\ :empty) do
    user
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> validate_inclusion(:role, @user_roles)
    |> validate_format(:email, ~r/.*@.*/)
  end

  def make_staff!(user) do
    user
    |> cast(%{role: "staff"}, ~w(role)a)
    |> Repo.update!
  end
end
