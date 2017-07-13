defmodule SourceAcademy.Util do
  # Scrub params by removing nil values and empty strings.
  def scrub(params) do
    result = Enum.filter(params, fn
      {_key, val} when is_binary(val) -> String.strip(val) != ""
      {_key, val} when is_nil(val) -> false
      _ -> true
    end)
    result |> Enum.into(%{})
  end
end
