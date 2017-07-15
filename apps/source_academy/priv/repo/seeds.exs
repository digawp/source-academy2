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
import SourceAcademy.SeedHelper

add_user(%{
  first_name: "Admin",
  last_name: "Guy",
  email: "admin@example.org"
}, "admin")

add_user(%{
  first_name: "Staff",
  last_name: "One",
  email: "staffone@example.org"
})

add_user(%{
  first_name: "Staff",
  last_name: "Two",
  email: "stafftwo@example.org"
})
