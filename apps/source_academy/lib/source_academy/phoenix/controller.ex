defmodule SourceAcademy.Phoenix.Controller do
  defmacro __using__(opts \\ []) do
    quote do
      use Guardian.Phoenix.Controller
    end
  end
end
