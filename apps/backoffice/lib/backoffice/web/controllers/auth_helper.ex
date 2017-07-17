defmodule Backoffice.AuthHelper do
  defmacro redirect_if_logged_in(conn, do: expression) do
    quote do
      current_user = conn.assigns[:current_user]
      if current_user do
        redirect(conn, to: page_path(conn, :index))
      else
        unquote(expression)
      end
    end
  end
end
