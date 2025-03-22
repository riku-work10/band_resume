class Api::V1::ResumeSectionsController < ApplicationController
  before_action :set_resume, only: [:index, :create, :update_position]
  before_action :set_resume_section, only: [:update, :destroy]
  before_action :authenticate_api_v1_user!

  # GET /api/v1/resumes/:resume_id/resume_sections
  def index
    resume_sections = set_resume.resume_sections
    render json: resume_sections
  end

  # POST /api/v1/resumes/:resume_id/resume_sections
  def create
    resume = set_resume
    max_position = resume.resume_sections.maximum(:position) || 0
    resume_section = resume.resume_sections.build(resume_section_params.merge(position: max_position + 1))

    if resume_section.save
      render json: resume_section, status: :created
    else
      render json: resume_section.errors, status: :unprocessable_entity
    end
  end

  # PUT /api/v1/resume_sections/:id
  def update
    resume_section = set_resume_section
    if resume_section.update(resume_section_params)
      render json: resume_section
    else
      render json: resume_section.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/resume_sections/:id
  def destroy
    resume_section = set_resume_section
    if resume_section.destroy
      render json: { message: 'Section deleted successfully' }, status: :ok
    else
      render json: { error: 'Failed to delete section' }, status: :unprocessable_entity
    end
  end

  # PUT /api/v1/resumes/:resume_id/resume_sections/update_position
  def update_position
    resume = set_resume
    sections = params[:sections]

    ResumeSection.transaction do
      sections.each do |section|
        resume.resume_sections.find(section[:id]).update!(position: section[:position])
      end
    end
    head :ok
  rescue ActiveRecord::RecordInvalid
    render json: { error: 'Invalid position update' }, status: :unprocessable_entity
  end

  private

  def set_resume
    Resume.find(params[:resume_id])
  end

  def set_resume_section
    ResumeSection.find(params[:id])
  end

  def resume_section_params
    params.require(:resume_section).permit(:title, :position)
  end
end

