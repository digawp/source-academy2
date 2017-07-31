defmodule SourceAcademy.User do
  @moduledoc false
  use SourceAcademy, :model

  alias SourceAcademy.Authorization
  alias SourceAcademy.Announcement
  alias SourceAcademy.Material
  alias SourceAcademy.Student
  alias SourceAcademy.XPHistory
  alias SourceAcademy.Repo

  schema "users" do
    field :first_name, :string
    field :last_name, :string
    field :bio, :string
    field :email, :string
    field :role, :string
    field :passwd_reset_id, :string
    field :passwd_reset_id_expiry, :utc_datetime

    has_many :authorizations, Authorization, on_delete: :delete_all
    has_many :announcements, Announcement
    has_many :materials, Material
    has_one  :student, Student, on_delete: :delete_all
    has_many :xp_history, XPHistory

    timestamps()
  end

  @required_fields ~w(first_name email)a
  @optional_fields ~w(last_name bio)a
  @user_roles ~w(admin staff student)s
  @email_format ~r/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/

  def build(params) do
    changeset(%__MODULE__{}, params)
  end

  def build_registration(params) do
    registration_changeset(%__MODULE__{
      student: %Student{},
      authorizations: [%Authorization{}
    ]}, params)
  end

  def create(params, role \\ "student") do
    user = registration_changeset(%__MODULE__{}, params)

    user
    |> cast(%{role: role}, ~w(role)a)
    |> Repo.insert
  end

  def all, do: Repo.all(__MODULE__)

  def all_staffs do
    Repo.all(from u in __MODULE__, where: u.role == "staff")
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

  def find_by_id(id) do
    Repo.get(__MODULE__, id)
  end

  def registration_changeset(user, params \\ :empty) do
    user
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> validate_email
    |> unique_constraint(:email)
  end

  def changeset(user, params \\ :empty) do
    user
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> validate_inclusion(:role, @user_roles)
    |> validate_email
  end

  defp validate_email(user) do
    validate_format(user, :email, @email_format)
  end

  def make_staff!(user) do
    user
    |> cast(%{role: "staff"}, ~w(role)a)
    |> Repo.update!
  end
end
