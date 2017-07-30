defmodule SourceAcademy.DiscussionGroup do
  @moduledoc false
  use SourceAcademy, :model

  alias SourceAcademy.Repo
  alias SourceAcademy.Student
  alias SourceAcademy.User

  schema "discussion_group" do
    belongs_to :student, Student
    belongs_to :user, User, foreign_key: :staff_id

    timestamps()
  end

  def build do
    changeset(%__MODULE__{}, %{})
  end

  def all do
    discussion_groups = Repo.all(__MODULE__)

    discussion_groups
    |> Repo.preload(:user)
    |> Repo.preload([student: :user])
  end

  def add_to(staff_id, student_id) do
    Repo.transaction fn ->
      student = Student.find_by_id(student_id)
      staff = User.find_by_id(staff_id)
      changeset = build()
        |> put_assoc(:student, student)
        |> put_assoc(:user, staff)
      {:ok, dg} = Repo.insert(changeset)
      dg
    end
  end

  def delete(id) do
    discussion_group = Repo.get(__MODULE__, id)
    Repo.delete(discussion_group)
  end

  def changeset(dg, params) do
    cast(dg, params, [])
  end
end
