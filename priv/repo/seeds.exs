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

add_user(%{
  first_name: "Student",
  last_name: "One",
  email: "studentone@example.org"
}, "student")

add_user(%{
  first_name: "Student",
  last_name: "Two",
  email: "studenttwo@example.org"
}, "student")

add_achievement(%{
  title: "Master of the Force",
  description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  points: 1000,
  display_order: 999,
  image_src: "somewhere",
  category: "end_game",
  query: "SELECT * WHERE 1=1;"
})

add_achievement(%{
  title: "Initiate",
  description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  points: 1,
  display_order: 1,
  image_src: "somewhere",
  category: "start_game",
  query: "SELECT * WHERE 1=1;"
})

add_achievement(%{
  title: "Easily distracted",
  description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  points: 250,
  display_order: 500,
  image_src: "somewhere",
  category: "some_cat",
  query: "SELECT * WHERE 1=1;"
})
