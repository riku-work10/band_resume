
class Api::V1::ResumeItemsController < ApplicationController
  before_action :set_resume_section, only: [:index, :create, :update_position]
  before_action :set_resume_item, only: [:update, :destroy]
  before_action :authenticate_api_v1_user!

  # GET /api/v1/resumes/:resume_id/resume_sections/:resume_section_id/resume_items
  def index
    resume_items = set_resume_section.resume_items
    render json: resume_items
  end

  # POST /api/v1/resumes/:resume_id/resume_sections/:resume_section_id/resume_items
  def create
    resume_section = set_resume_section
    max_position = resume_section.resume_items.maximum(:position) || 0
    resume_item = resume_section.resume_items.build(resume_item_params.merge(position: max_position + 1))

    if resume_item.save
      render json: resume_item, status: :created
    else
      render json: resume_item.errors, status: :unprocessable_entity
    end
  end

  # PUT /api/v1/resume_items/:id
  def update
    resume_item = set_resume_item
    if resume_item.update(resume_item_params)
      render json: resume_item
    else
      render json: resume_item.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/resume_items/:id
  def destroy
    resume_item = set_resume_item
    if resume_item.destroy
      render json: { message: 'Item deleted successfully' }, status: :ok
    else
      render json: { error: 'Failed to delete item' }, status: :unprocessable_entity
    end
  end

  # PUT /api/v1/resumes/:resume_id/resume_sections/:resume_section_id/resume_items/update_position
  def update_position
    resume_section = set_resume_section
    items = params[:items]

    ResumeItem.transaction do
      items.each do |item|
        resume_section.resume_items.find(item[:id]).update!(position: item[:position])
      end
    end
    head :ok
  rescue ActiveRecord::RecordInvalid
    render json: { error: 'Invalid position update' }, status: :unprocessable_entity
  end

  private

  def set_resume_section
    ResumeSection.find(params[:resume_section_id])
  end

  def set_resume_item
    ResumeItem.find(params[:id])
  end

  def resume_item_params
    params.require(:resume_item).permit(:content, :position)
  end
end

