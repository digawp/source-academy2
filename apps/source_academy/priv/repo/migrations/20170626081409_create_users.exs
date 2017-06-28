defmodule SourceAcademy.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :first_name, :string
      add :last_name, :string
      add :email, :string
      add :is_admin, :boolean, default: false

      timestamps()
    end

    create index(:users, [:email], unique: true)
  end
end
