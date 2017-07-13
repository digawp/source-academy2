# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     SourceAcademy.Repo.insert!(%SourceAcademy.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias SourceAcademy.User

SourceAcademy.Repo.insert!(%User{
  first_name: "Administrator",
  email: "admin@sourceacademy.com",
  role: "admin"
})
