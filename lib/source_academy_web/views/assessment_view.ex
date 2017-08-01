defmodule SourceAcademyWeb.AssessmentView do
  use SourceAcademyWeb, :view

  def display_assessment_name(assessment) do
    prefix = case assessment.type do
      :mission -> "Mission"
      :sidequest -> "Sidequest"
      :contest -> "Contest"
      :path -> "Path"
    end
    prefix <> " " <> assessment.name
  end
end
