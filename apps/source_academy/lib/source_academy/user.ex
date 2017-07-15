defmodule SourceAcademy.User do
  @moduledoc """
    The User entity contains basic user data such as name and e-mail.
    A user can have many authorisations from different providers.
  """
  use Ecto.Schema
  import Ecto.Changeset

  alias SourceAcademy.Authorization
  alias SourceAcademy.Student
  alias SourceAcademy.Repo
  alias SourceAcademy.Util

  schema "users" do
    field :first_name, :string
    field :last_name, :string
    field :bio, :string
    field :email, :string
    field :role, :string
    field :passwd_reset_id, :string
    field :passwd_reset_id_expiry, :utc_datetime

    has_many :authorizations, Authorization, on_delete: :delete_all
    has_one :student, Student, on_delete: :delete_all

    timestamps()
  end

  @required_fields ~w(first_name email)a
  @optional_fields ~w(last_name bio)a
  @user_roles ~w(admin staff student)s

  def build(params) do
    changeset(%__MODULE__{}, params)
  end

  def create(params, role \\ "student") do
    registration_changeset(%__MODULE__{}, Util.scrub(params))
    |> cast(%{role: role}, ~w(role)a)
    |> Repo.insert
  end

  def authorizations(nil), do: []
  def authorizations(user) do
    Repo.all(Ecto.assoc(user, :authorizations))
  end

  def find_by_authorization(authorization) do
    case Repo.one(Ecto.assoc(authorization, :user)) do
      nil -> {:error, :user_not_found}
      user -> {:ok, user}
    end
  end

  def registration_changeset(user, params \\ :empty) do
    user
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> validate_email
  end

  def changeset(user, params \\ :empty) do
    user
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> validate_inclusion(:role, @user_roles)
    |> validate_email
  end

  defp validate_email(user) do
    validate_format(user, :email, ~r/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)
  end

  def make_staff!(user) do
    user
    |> cast(%{role: "staff"}, ~w(role)a)
    |> Repo.update!
  end
end
