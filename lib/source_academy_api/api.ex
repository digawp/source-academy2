defmodule SourceAcademy.Api do
  @moduledoc """
  A module that keeps using definitions for controllers,
  views and so on.

  This can be used in your application as:

      use SourceAcademy.Api, :controller
      use SourceAcademy.Api, :view

  The definitions below will be executed for every view,
  controller, etc, so keep them short and clean, focused
  on imports, uses and aliases.

  Do NOT define functions inside the quoted expressions
  below.
  """

  def controller do
    quote do
      use Phoenix.Controller, namespace: SourceAcademy.Web
      import Plug.Conn
      import SourceAcademy.Web.Gettext
    end
  end

  def view do
    quote do
      use Phoenix.View, namespace: SourceAcademy.Api,
                        root: "lib/source_academy/api/templates"

      import SourceAcademy.Web.ErrorHelpers
      import SourceAcademy.Web.Gettext
      import SourceAcademy.Web.ViewHelpers
    end
  end

  def channel do
    quote do
      use Phoenix.Channel
      import SourceAcademy.Web.Gettext
    end
  end

  @doc """
  When used, dispatch to the appropriate controller/view/etc.
  """
  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end
